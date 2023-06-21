import ComponentModel from "../Component.model";
import ListDataModel from "./ListData.model";

export class  ListComponentModel extends ComponentModel {
  data: ListDataModel;
  constructor(){
    super();
    this.data = new ListDataModel();
  }
}

export default ListComponentModel;
