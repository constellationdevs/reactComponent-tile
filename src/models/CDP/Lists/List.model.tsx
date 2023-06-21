import ListItemModel from "./ListItem.model";

export class ListModel {
  headerTemplateID: number;
  headerTitle: string;
  items: ListItemModel[];
  headerIconClass: string | undefined;
}

export default ListModel;
