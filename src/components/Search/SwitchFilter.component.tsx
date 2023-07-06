import React, { Component } from "react";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import { List, ListItem, Switch } from "react-onsenui";
import FilterListItemModel from "../../models/CDP/search/FilterListItem.model";
import { handleKeyPress } from "../../services/accessibility.svc";

export interface ISwitchFilterProps extends IBasePropsModel {
    dataSource: any;
    addFilter: any;
    filters: FilterListItemModel[]
}

export class SwitchFilter extends Component<ISwitchFilterProps,any> {
    public myInput: any;

    constructor(props:ISwitchFilterProps) {
        super(props);
        this.state = {
            filters: this.props.filters,
            focus: ""
        }
    }

     listItemChange(evt: any, row: FilterListItemModel, idx: number | undefined) {
            const filters = this.state.filters ? this.state.filters : [];
            if(evt.value){
                filters.push(row)
            } else {
                filters.splice(filters.findIndex((item: any) => item.id === row.id), 1)
            }
            this.setState({filters})
            this.props.addFilter(filters, "switchFilter");
    }

    addFocus(id: string) {
      console.log("Focus: ", id);
      this.state.focus !== id && this.setState({focus: id});
  }
        

    render() {

        return(
            <List
            dataSource={this.props.dataSource}
            renderRow={(row: FilterListItemModel, idx) => (
              <ListItem key={row.display + ` - ${idx}`}>
                <div className={"left " + (this.state.focus === `${row.display}` ? "focus":"")}>
                {row.display}
                </div>
                <div className="right">
                  <Switch
                    id={`${idx}`}
                    // @ts-ignore
                    onKeyPress={handleKeyPress}
                    onBlur={() => this.setState({focus: ""})}
                    onFocus={() => {this.addFocus(`${row.display}`)}}
                    onChange={(evt) => this.listItemChange(evt, row, idx)}
                    checked={this.state.filters ? this.state.filters.find((filter: FilterListItemModel) => filter.id === row.id) : false}
                  />
                </div>
              </ListItem>
            )}
          />
        )
    }
}

export default SwitchFilter;