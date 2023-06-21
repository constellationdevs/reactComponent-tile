import React, { Component } from "react";
import { ListItem, Icon } from "react-onsenui"
import IBasePropsModel from "../../../../models/base/BaseProps.model";
import ListStandardModel from "../../../../models/CDP/Lists/ListStandard.model";

export interface IListItemTemplate1Props extends IBasePropsModel {
    row: ListStandardModel;
    idx: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleOpen: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods?: any;
  }

  export interface IListItemTemplate1State {
    row: ListStandardModel;
  }

  export default class GenericListItemTemplate1 extends Component<IListItemTemplate1Props, IListItemTemplate1State> {
    state = {
      row: this.props.row
    }
  
    render() {
      const itemKey: string = this.state.row.key;
      return (
        <ListItem
          key={itemKey}
          onClick={() => this.props.handleOpen(this.state.row.metaAction)}
          modifier={this.state.row.modifier}
        >
          <div className="left">
            {this.state.row.leftIcon && (
              <img className="list-item__thumbnail" src={this.state.row.leftIcon} />
            )}
            {this.state.row.leftIconClass && <Icon icon={this.state.row.leftIconClass} />}
          </div>
          <div className="center">
            <span className="list-item__title">{this.state.row.title}</span>
            <span className="cdp_key">{this.state.row.name}</span>
            <span className="cdp_label">{this.state.row.label}</span>
            {this.state.row.subTitle && <span className="list-item__subtitle">{this.state.row.subTitle}</span>}
            {this.state.row.body}
          </div>
          <div className="right">
            <span>{this.state.row.callout}</span>
            <span>
              <b>{this.state.row.calloutBold}</b>
            </span>
            <span><Icon icon={this.state.row.rightIconClass}></Icon></span>
            <span className="cdp_value">{this.state.row.value}</span>
          </div>
        </ListItem>
      );
    }
  }