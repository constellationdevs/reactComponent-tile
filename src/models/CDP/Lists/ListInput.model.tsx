import SelectOptionModel from "../SelectOption.model";
import ListItemModel from "./ListItem.model"

export class ListInputModel extends ListItemModel {
  key: string;
  type: string;
  inputID: string;
  label: string;
  placeholder: string;
  options: SelectOptionModel[];
}

export default ListInputModel;
