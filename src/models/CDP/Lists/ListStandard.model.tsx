import ListItemModel from "./ListItem.model";

export class ListStandardModel extends ListItemModel {
  key: string;
  leftIcon: string;
  leftIconClass: string;
  rightIconClass: string
  label: string;
  body: string;
  name: string;
  value: string;
  modifier: string;
  title: string;
  subTitle: string;
  callout: string;
  calloutBold: string;
}

export default ListStandardModel;
