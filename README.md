# Ng-Utils-Contract
There was once a situation that a title in each feature can be setted by 4 different ways. Each Feature has its own priority which will also change accrording to which platform the user enter.  

Therefore, the duty of the utilly is to tidying up the project.
Priority them and case by case

- Dashboard Setting by PM -> API
- Default Setting by Backend -> API
- direct writting in template by client
- i18n




## structure

Below is the simplified version of the application structure.
```
.
└── root
    └── services (graphQL API)
    │ 
    └── utils 
        └── contract.enum.ts  -- type is field name of GraphQL API
        └── contract.util.ts  -- entry
        │
        └── title (Core Logic)
            └──def.ts - define special case
            └──mapper.ts - executor
    
```  

</br >


## How to Use

``` ts
contractTitle(type: CONTRACT_TYPE): string {
  return ContractUtil.instance.getTitle(type);
}
```
</br >

## Core util logic
> def.ts
```ts
  type configUsage = Pick<typeof CONTRACT_TYPE, 'DailyPay1' | 'DailyPay2' | 'DailyPay3' | 'OrderReward' | 'LossReward'>;

  //優先度最低，預設文字，如不給任何最低預設值，可以在這設定跳過唷（理論上不會發生）
  type i18nUsage = Omit<typeof CONTRACT_TYPE, keyof configUsage>;

  /* 這邊為後端傳來的Config，有歷史歲月，基本上這邊不會再動了唷 */
  export const configMap: {[key in keyof configUsage]: string} = {
    DailyPay1: dailypay_display_name,
    .....
  };

  /* 優先度最低的 Client端多國語言，將根據i18nUsage設定對應資訊。
    每次新增制度enum, 請在這邊填入對應i18n的key；
    如果你真的真的不想給預設值（！？），就將例外的制度填寫到Omit中唷  */
  export const i18nMap: {[key in keyof i18nUsage]: string} = {
    BetReward: proxyRewards,
    ....
  };


```

> map.ts
``` ts
// gernerate query fields from enum fields
export function mappingTitles() {
  const titles = new Map<CONTRACT_TYPE, string>();
  const keys = Object.keys(CONTRACT_TYPE);

  // set tittle according to priority
  keys.forEach(key => {
    const type: CONTRACT_TYPE = CONTRACT_TYPE[key as keyof typeof CONTRACT_TYPE];
    const title = firstPriority(type) || secondPriorityByPlatform(type)  || thirdPriorityByConfig(key) || lastPriorityByI18n(key);
    titles.set(type, title);
  });
  return titles;
}
```

</br>


## get files from enum to query that send to server
> team.service.ts
``` ts
async getAllContractTitles() {
    const spaceForField = ' ';
    const field: string = Object.keys(CONTRACT_TYPE).reduce((schema, key) => {
      return schema += (CONTRACT_TYPE[key] + spaceForField);
    }, '') ;
    const q = `query getAllContractTitles {
      User {
        user_bonus_system {
          my_contract_display{
            ${field}
          }
        }
      }
    }`;
    const resp: Query = await this.networkSer.graphQL.query(q);
    
  }

```
