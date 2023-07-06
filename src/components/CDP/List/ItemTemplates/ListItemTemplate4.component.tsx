import React, { Component } from "react";
import { ListItem, Input, Select } from "react-onsenui";
import IBasePropsModel from "../../../../models/CDP/baseProps/IBaseProps.model";
import SelectOptionModel from "../../../../models/CDP/SelectOption.model";
import ListInputModel from "../../../../models/CDP/Lists/ListInput.model";

export interface IListItemTemplate4Props extends IBasePropsModel {
  row: ListInputModel;
  idx: number;
  handleOpen: any;
  methods?: any;
}

export interface IListItemTemplate4State {
  row: ListInputModel;
}

class ListItemTemplate4 extends Component<IListItemTemplate4Props, IListItemTemplate4State> {
  state = {
    row: this.props.row
  }

  render() {
    const itemKey: string = this.state.row.key;
    return (
      <ListItem key={itemKey}>
        <div className="left">
          <label htmlFor={this.state.row.inputID}>{this.state.row.label}</label>
        </div>
        <div className="right">
          {this.state.row.type !== "select" ? (
            <Input
              // @ts-ignore
              role="textbox"
              input-id={this.state.row.inputID}
              type={this.state.row.type}
              placeholder={this.state.row.placeholder}
            />
          ) : (
              <Select
                // @ts-ignore
                role="listbox"
                input-id={this.state.row.inputID}>
                  {this.state.row.options.map((item: SelectOptionModel, idx: number) => (
                    <option value={item.value} key={`option${idx}`}>
                      {item.label}
                    </option>
                  ))}
              </Select>
            )}
        </div>
      </ListItem>
    );
  }
}

export default ListItemTemplate4;
