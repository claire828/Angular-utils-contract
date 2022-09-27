import { CONTRACT_TYPE } from '../contract.enum';
import { i18nMap, configMap, platformName } from './def';
import { MyContractDisplay } from '@gg/core/types/schema';
import { AppInjector } from '../../app-injector';
import { TeamService } from 'src/app/shared/services/team.service';
import { TranslateService } from '@ngx-translate/core';


//#region 對應優先權處理制度標題的區塊，不會被動到，除了「第2優先權的制度： 原為久遠歷史而有根據平台強硬寫死情況，未來將慢慢被第1優先權替代」

  // i18n
const translateService: TranslateService = AppInjector.get(TranslateService);
let contract: MyContractDisplay;

function translateByI18n(key: string): string {
    // using instant as the service has been loaded in the beginning.
    return translateService.instant(key) as string;
  }


  /* 1) fixed priory that set by pm */
function firstPriority(type: CONTRACT_TYPE): string {
  if (!contract) {
    contract = {...AppInjector.get(TeamService).contractTitles};
  }
  return contract[type];
}

  /* 3) fixed priory that set by backend. */
function thirdPriorityByConfig(key: string): string {
  const type = key as keyof typeof configMap;
  return configMap[type];
}

  /* 2) exceptions for special cases.
to be precise, these exceptions should not be appended anymore, instead, asking pm to do so (by manipulating setting of First Priority)  */
function secondPriorityByPlatform(type: CONTRACT_TYPE): string {
  switch (platformName) {
    case 'pki':
      if (type === CONTRACT_TYPE.DailyPay1) { return '盈利工资'; }
      if (type === CONTRACT_TYPE.Dividend2) { return '日分红'; }
      break;

    case 'pkd':
      if (type === CONTRACT_TYPE.Dividend2) { return '日亏损分红（团队）'; }
      if (type === CONTRACT_TYPE.SystemDividend) { return '日亏损分红'; }
      break;

    case 'pkj':
      if (type === CONTRACT_TYPE.DeficitReward) { return '实时挂单工资'; }
      break;
  }
  return '';
}

  /* 4) default */
function lastPriorityByI18n(key: string): string {
  const translateKey = i18nMap[key];
  const translatedResult = translateByI18n(translateKey);
  return translatedResult;
}

//#endregion


//#region 主執行核心，不會動到唷。
export function mappingTitles() {
  const titles = new Map<CONTRACT_TYPE, string>();
  const keys = Object.keys(CONTRACT_TYPE);
  keys.forEach(key => {
    const type: CONTRACT_TYPE = CONTRACT_TYPE[key as keyof typeof CONTRACT_TYPE];
    const title = firstPriority(type) || secondPriorityByPlatform(type)  || thirdPriorityByConfig(key) || lastPriorityByI18n(key);
    titles.set(type, title);
  });
  return titles;
}
//#endregion

