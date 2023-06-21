import React, { Component } from "react";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import { List, ListItem, Select } from "react-onsenui";
import FilterListItemModel from "../../models/CDP/search/FilterListItem.model";
import { getTileString } from "../../services/helper.svc";

export interface ICategoryFilterProps extends IBasePropsModel {
    dataSource: any;
    categoryFilter: string;
    addFilter: any;
    category?: FilterListItemModel[]
}

export class CategoryFilter extends Component<ICategoryFilterProps,any> {
    public myInput: any;

    constructor(props:ICategoryFilterProps) {
        super(props);
        this.state = {
            category: this.props.category
        }
    }

    listItemChange(evt: any, categoryFilter: string) {
        const category = [evt.target.value];
        this.setState({category});
        this.props.addFilter(category, categoryFilter);
    }


    render() {
        const options = this.props.dataSource.map((category: any)=> (
            <option id={category.id} key={category.id} value={category.value}>
                {category.display}
            </option>
        ));

        return (
            <List>
                <ListItem>
                    <div className="left">
                        {getTileString("100133")}
                    </div>
                    <div className="right">
                        <Select
                            value={this.state.category?.length ? this.state.category[0] : ""}
                            onChange={(evt) => {this.listItemChange(evt, this.props.categoryFilter)}}
                            // @ts-ignore;
                            dir="rtl">
                            <option id="noFilter" key="noFilter" value="">&mdash;</option>
                            {options}
                        </Select>
                    </div>
                </ListItem>
            </List>
        )

    }
}

export default CategoryFilter;
