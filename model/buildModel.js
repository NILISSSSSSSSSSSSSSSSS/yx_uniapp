import {DefaultModel} from "./DefaultModel";


export class buildModel extends DefaultModel{
  constructor() {
    super();
  }

  getKey() {
    return "buildModel"
  }
  
  getIsLocal() {
    return false;
  }
}
