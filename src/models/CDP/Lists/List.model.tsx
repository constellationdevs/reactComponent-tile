import ListItemModel from "./ListItem.model";

export class ListModel {
  headerTitle: string;
  items: ListItemModel[];
  headerIconClass: string | undefined;
}

export default ListModel;
