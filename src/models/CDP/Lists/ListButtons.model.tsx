import ListItemModel from "./ListItem.model";
import BtnComponentModel from "../BtnComponent.model";

export class ListStandardModel extends ListItemModel {
  key: string;
  secondaryActions: BtnComponentModel[];
  primaryActions: BtnComponentModel[];
}

export default ListStandardModel;
