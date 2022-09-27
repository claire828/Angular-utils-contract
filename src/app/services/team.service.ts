
import { CONTRACT_TYPE } from 'src/app/utils/contract/contract.enum';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private networkSer: NetworkService,
  ) {
    this.getAllContractTitles();
  }


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
}
  