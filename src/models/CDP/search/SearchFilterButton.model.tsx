import FilterListItemModel from "./FilterListItem.model";
import { newGuid } from "../../../services/helper.svc";

export class SearchFilterButtonModel {
  keyName: string;
  iconUrl: string; // optional uploaded icon, use first
  iconOverride: string; // optional icon class use second (if neither use default in filterType)
  filterType: number; // FilterTypes Enum
  filterTemplateItems: FilterListItemModel[]; // only passed in if filterType is list
  labelText: string; // label text
  selectedPrependText: string; // text for pill
  selected: boolean;
  multi: boolean; // all multiple values
  refresh: boolean;
  id: string;
  value: string | undefined;

  constructor(item: any) {
    this.keyName = item.keyName;
    this.iconUrl = item.iconUrl;
    this.iconOverride = item.iconOverride;
    this.filterType = item.filterType;
    if (item.filterTemplateItems) {
      this.filterTemplateItems = item.filterTemplateItems.map((x: FilterListItemModel) => {
        return new FilterListItemModel(x);
      });
    }

    // item.filterTemplateItems;

    this.labelText = item.labelText;
    this.selectedPrependText = item.selectedPrependText;
    this.multi = item.multi;
    this.refresh = item.refresh;
    this.id = newGuid();
  }
}

export default SearchFilterButtonModel;
