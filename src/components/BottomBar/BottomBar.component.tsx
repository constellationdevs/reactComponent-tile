/*
  base component for the hero section
  Handles all initialization of the component and Processing of the CDP Component Model
*/

import React, { Component } from "react";
import { BottomToolbar, Icon } from "react-onsenui";
import IBaseComponentState from "../../models/CDP/baseStates/IBaseComponentState.model";
import BottomBarModel from "../../models/BottomBar.model";
import {
  ProcessCDPComponent,
  ProcessMetaAction
} from "../../services/helper.svc";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";

export interface IBottomBarState extends IBaseComponentState {
  componentModel: BottomBarModel;
  loading: boolean;
  inError: boolean;
}

class BottomBar extends Component<IBasePropsModel, IBaseComponentState> {
    state = {
      componentModel: new BottomBarModel(),
      loading: true,
      inError: false
    }

  componentDidUpdate() {
    if (this.state.loading && !this.state.inError) {
      this.componentInit();
    }
  }

  // component structure
  render() {
    console.log(this.state.componentModel);
    if (this.state.loading) {
      return this.loaderPlaceholder();
    } else {
      return (
        <BottomToolbar>
          <div className="center">{this.state.componentModel.data.callOut}</div>
          <div className="right">
            <span
              onClick={() =>
                this.handleOpen(this.state.componentModel.data.metaAction)
              }
            >
              <Icon icon={this.state.componentModel.data.iconClass} />
            </span>
          </div>
        </BottomToolbar>
      );
    }
  }

  handleOpen = (metaAction: any) => {
    ProcessMetaAction(metaAction, this.props.navigator);
  }

  // component loader
  loaderPlaceholder = () => {
    return <div></div>;
  }

  // process the CDP component model
  componentInit = () => {
    ProcessCDPComponent(this.props.componentModel).then(
      data => {
        this.setState({ componentModel: data, loading: false });
      },
      () => {
        console.log("**Hero ERROR**");
        this.setState({ inError: true });
      }
    );
  }
}

export default BottomBar;
