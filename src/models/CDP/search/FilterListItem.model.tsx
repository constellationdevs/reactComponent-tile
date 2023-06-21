import { newGuid } from "../../../services/helper.svc";

export class FilterListItemModel {

    icon: string;
    display: string;
    value: string;
    color: string;
    selected: boolean;
    id: string;

    constructor(item:any){        
        this.icon = item.icon;
        this.display = item.display;
        this.value = item.value;
        this.selected = item.selected !== undefined ? item.selected : false;
        this.id = newGuid();
    }
}

export default FilterListItemModel;