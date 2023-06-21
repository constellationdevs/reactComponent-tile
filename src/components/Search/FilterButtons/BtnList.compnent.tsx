import React, { Component } from "react";
import { Button, Icon } from "react-onsenui";
import { handleKeyPress } from "../../../services/accessibility.svc";

import IFilterBtnPropsModel from "../../../models/CDP/search/IFilterBtnProps.model";
import SearchFilterButtonModel from "../../../models/CDP/search/SearchFilterButton.model";

export interface IFilterButtonState {
  btn: SearchFilterButtonModel;
}

class FilterBtnList extends Component<IFilterBtnPropsModel, IFilterButtonState> {
  activeClass: string = "";

  state = {
    btn: this.props.btn
  };

  render() {
    const icon = () => {
      if (this.state.btn.iconUrl !== undefined && this.state.btn.iconUrl !== "") {
        return <img src={this.props.btn.iconUrl} />;
      } else if (this.state.btn.iconOverride !== undefined && this.state.btn.iconOverride !== "") {
        return <Icon icon={this.state.btn.iconOverride} />;
      } else {
        return <Icon icon="fa-list" />;
      }
    };
    const iconBuild = icon();
    return (
      <Button
        // @ts-ignore
        role="button"
        onKeyPress={handleKeyPress}
        tabIndex={0}
        key={this.state.btn.keyName}
        onClick={this.btnClick}
        className={this.activeClass}>
        {iconBuild}
      </Button>
    );
  }

  componentDidUpdate() {
    if (this.props.btn.selected) {
      this.activeClass = "selected";
    } else {
      this.activeClass = "";
    }
  }

  btnClick = () => {
    this.props.filterClick(this.props.btn);
  };
}

export default FilterBtnList;
