import React, { Component } from "react";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import { List, ListItem, Radio } from "react-onsenui";
import { handleKeyPress } from "../../services/accessibility.svc";

export interface IRadioFilterProps extends IBasePropsModel {
    row: any;
    // accountFilter: string;
    addFilter: any;
    filter: string;
}

export class RadioFilter extends Component<IRadioFilterProps,any> {
    public myInput: any;

    constructor(props:IRadioFilterProps) {
        super(props);
        this.state = {
            filter: props.filter === undefined ? "" : props.filter,
        }
    }

    listItemChange(value: string, radioFilter: string) {
        this.setState({filter: value});
        this.props.addFilter(value, radioFilter);
    }


    render() {
      return(
        <List>
          <ListItem
            onClick={()=>{this.listItemChange("", "radioFilter")}}
            // @ts-ignore;
            tabIndex={0}
            onKeyPress={handleKeyPress}
            aria-controls={this.props.row.keyName + "__none"}
            className="radio-filter"
            key={this.props.row.keyName + "__none"}>
            <div className="left">
              Default
            </div>
            <div className="right">
              <Radio
                inputId={this.props.row.keyName + "__none"}
                checked={this.state.filter === ""}
                modifier="material"/>
            </div>
          </ListItem>
          <ListItem
            onClick={()=>{this.listItemChange("true", "radioFilter")}}
            // @ts-ignore;
            tabIndex={0}
            onKeyPress={handleKeyPress}
            aria-controls={this.props.row.keyName + "__true"}
            className="radio-filter"
            key={this.props.row.keyName + "__true"}>
            <div className="left">
              Option 1
            </div>
            <div className="right">
              <Radio
                inputId={this.props.row.keyName + "__true"}
                checked={this.state.filter === "true"}
                modifier="material"/>
            </div>
          </ListItem>
          <ListItem
            onClick={()=>{this.listItemChange("false", "radioFilter")}}
            // @ts-ignore;
            tabIndex={0}
            onKeyPress={handleKeyPress}
            aria-controls={this.props.row.keyName + "__false"}
            className="radio-filter"
            key={this.props.row.keyName + "__false"}>
            <div className="left">
              Option 2
            </div>
            <div className="right">
              <Radio
                inputId={this.props.row.keyName + "__false"}
                checked={this.state.filter === "false"}
                modifier="material"/>
            </div>
          </ListItem>
        </List>
      )
    }
}

export default RadioFilter;
