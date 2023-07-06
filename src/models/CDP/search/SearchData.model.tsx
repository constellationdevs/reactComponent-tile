import { ListComponentModel } from "../Lists/ListComponent.model";
import SearchFilterButton from "./SearchFilterButton.model"

export class SearchDataModel {
  list: ListComponentModel;
  filters: SearchFilterButton[];
}

export default SearchDataModel;
