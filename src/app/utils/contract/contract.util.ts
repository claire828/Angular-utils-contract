
import {CONTRACT_TYPE as CONTRACT_TYPE} from './contract.enum';
import { mappingTitles } from './title/mapper';

export class ContractUtil {

  private static _instance: ContractUtil;
  private titles: Map<CONTRACT_TYPE, string>;
  constructor() {
  }

  getTitle(type: CONTRACT_TYPE): string {
    if (!this.titles) {
      this.titles = mappingTitles();
    }
    return this.titles.get(type);
  }


  static get instance() {
    return this._instance || ( this._instance = new this());
  }

}
