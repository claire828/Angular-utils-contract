
import { ConfigService } from '@gg/core';
import { Config } from '@gg/core/types/schema';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { AppInjector } from '../../app-injector';
import { CONTRACT_TYPE } from '../contract.enum';


//#region 基礎內部資訊：不需要被動到
const configService: ConfigService = AppInjector.get(ConfigService);
const configFromBackend: Config = {...configService.dynamicConfiguration};
const translationService: TranslationsService = AppInjector.get(TranslationsService);
export const platformName: string = configService.getPlatformName();
//#endregion


//#region 基礎內部資訊，deconstruct共同來源的標題資訊，避免重複性來源過高的閱讀性

const {
    dailypay_display_name,
    dailyreward_display_name,
    dailybonus_display_name,
    order_reward_display_name,
    loss_reward_display_name
  } = configFromBackend;


const {
    thirdPartDailypay,
    rewards,
    proxyRewards,
    dividend,
    dailyDividend,
    noPrizeWage,
    privateReturn,
    privateReturn2,
    deficitReward,
    systemDividend,
    thirdPartReward,
    dailyDynamicReward,
    deficitDailyDividend,
    LotteryDailypay,
    slidingDividend,
    rechargeReward,
    luckyHash
  } = translationService.contract;

//#endregion


type configUsage = Pick<typeof CONTRACT_TYPE, 'DailyPay1' | 'DailyPay2' | 'DailyPay3' | 'OrderReward' | 'LossReward'>;
type i18nUsage = Omit<typeof CONTRACT_TYPE, keyof configUsage>;

/* 這邊為後端傳來的Config，有歷史歲月，基本上這邊不會再動了唷 */
export const configMap: {[key in keyof configUsage]: string} = {
  DailyPay1: dailypay_display_name,
  DailyPay2: dailyreward_display_name,
  DailyPay3: dailybonus_display_name,
  OrderReward: order_reward_display_name,
  LossReward: loss_reward_display_name,
};


/* 優先度最低的 Client端多國語言，將根據i18nUsage設定對應資訊。
  「重要」：每次新增制度enum, 請在這邊填入對應i18n的key；
   如果你真的真的不想給預設值，就將例外的制度填寫到Omit中唷  */
export const i18nMap: {[key in keyof i18nUsage]: string} = {
  BetReward: proxyRewards,
  DeficitDailyDividend: deficitDailyDividend,
  DeficitReward: deficitReward,
  HalfDailyPay: dailyDynamicReward,
  NoPrizeWage: noPrizeWage,
  SystemDividend: systemDividend,
  ThirdPartDaily: thirdPartDailypay,
  ThirdPartRebate: thirdPartReward, // 娛樂
  Dividend1: dividend,
  Dividend2: dividend,
  DividendReward: dividend,
  DividendDaily: dailyDividend,
  LevelDividendDaily1: dailyDividend,
  PrivateReturnDaily1: privateReturn,
  PrivateReturnDaily2: privateReturn2,
  Lottery_dailypay: LotteryDailypay,
  SlidingDividend: slidingDividend,
  rechargeReward: rechargeReward,
  LuckyHash:luckyHash
};



