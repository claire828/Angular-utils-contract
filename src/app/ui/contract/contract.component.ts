

@Component({
  selector: 'gg-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {

  }
  

  get contractType() { return CONTRACT_TYPE };

  contractTitle(type: CONTRACT_TYPE): string {
    return ContractUtil.instance.getTitle(type);
  }

 
}
