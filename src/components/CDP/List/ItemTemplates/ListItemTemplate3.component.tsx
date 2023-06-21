import React, { Component } from "react";
import { ListItem, Icon, Button } from "react-onsenui";
import ListButtonsModel from "../../../../models/CDP/Lists/ListButtons.model";
import IBasePropsModel from "../../../../models/CDP/baseProps/IBaseProps.model";
import BtnComponentModel from "../../../../models/CDP/BtnComponent.model";
import { handleKeyPress } from "../../../../services/accessibility.svc";

export interface IListItemTemplate3Props extends IBasePropsModel {
  row: ListButtonsModel;
  idx: number;
  handleOpen: any;
  methods?: any;
}

export interface IListItemTemplate3State {
  row: ListButtonsModel;
}

class ListItemTemplate3 extends Component<IListItemTemplate3Props, IListItemTemplate3State> {
  state = {
    row: this.props.row
  }

  renderSecondaryActions() {
    return (
      <div className="cdp_secondary_action_container">
        {this.props.row.secondaryActions.map(
          (item: BtnComponentModel, idx: number) => (
            <a
              // @ts-ignore
              role="link"
              onKeyPress={handleKeyPress}
              href="#"
              className="cdp_secondary_action"
              key={`secondaryAction${idx}`}
              onClick={() => this.props.handleOpen(item.metaAction)}
            >
              {item.notifications && (
                <span className="notification">{item.notifications}</span>
              )}
              <Icon icon={item.iconClass} />
              <label>{item.label}</label>
            </a>
          )
        )}
      </div>
    );
  }

  renderPrimaryActions() {
    return this.props.row.primaryActions.map(
      (item: BtnComponentModel, idx: number) => (
        <Button
        // @ts-ignore
          role="button"
          onKeyPress={handleKeyPress}
          tabIndex={0}
          key={`primaryAction${idx}`}
          onClick={() => this.props.handleOpen(item.metaAction)}
        >
          {item.label}
        </Button>
      )
    );
  }

  render() {
    const itemKey: string = this.state.row.key;
    return (
      <ListItem key={itemKey}>
        {this.state.row.secondaryActions && this.renderSecondaryActions()}
        {this.state.row.primaryActions && this.renderPrimaryActions()}
      </ListItem>
    );
  }
}

export default ListItemTemplate3;
