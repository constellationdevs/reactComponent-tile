import React, { Component } from "react";
import IBasePageStateModel from "../models/CDP/baseStates/IBasePageState.model";
import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import { Page, Toast } from "react-onsenui";
import { isNativeApp, ProcessCDPComponent, GoToErrorPage, getTileString } from "../services/helper.svc";
import ListComponent from "../components/CDP/List/List.component";
import LandingPageModel from "../models/CDP/LandingPage.model";
import HeroProfile from "../components/Hero/HeroProfile.component";
import ListComponentModel from "../models/CDP/Lists/ListComponent.model";
import HeroModel from "../models/Hero.model";

export interface ICommCenterProps extends IBasePropsModel {
  componentModel: LandingPageModel;
}

export interface ICommCenterState extends IBasePageStateModel {
  HeroModel: HeroModel;
  ListModel: ListComponentModel;
  toastColor: string;
}

class CommCenter extends Component<ICommCenterProps, ICommCenterState> {
  pageClass = "desktop";

  state = {
    componentModel: this.props.componentModel,
    HeroModel: new HeroModel(),
    ListModel: new ListComponentModel(),
    openToast: false,
    toastMsg: "",
    toastColor: "danger"
  };

  render() {
    return (
      <Page key="commCenter" id="commCenter" className={this.pageClass}>
        <Toast isOpen={this.state.openToast} className={this.state.toastColor}>
          <div className="toastMsg">{this.state.toastMsg}</div>
          <button onClick={this.dismissToast}>{getTileString("100106")}</button>
        </Toast>
        <div className="cdp_page_container">
          <HeroProfile
            componentModel={this.state.HeroModel}
            navigator={this.props.navigator}
          />
          <div className="cdp_list_container">
            <ListComponent
              componentModel={this.state.ListModel}
              navigator={this.props.navigator}
              pageID="commCenter"
              heroID="CommHeroContainer"
            />
          </div>
        </div>
      </Page>
    );
  }

  componentDidMount() {
    if (isNativeApp()) {
      console.log("native");
      this.pageClass = "native";
    }

    this.pageInit();
  }

  showToast = (msg: string, color: string) => {
    this.setState({ openToast: true, toastMsg: msg, toastColor: color });
  }

  dismissToast = () => this.setState({ openToast: false });

  pageInit = () => {
    ProcessCDPComponent(this.state.componentModel).then(
      model => {
        const commCenterModel: LandingPageModel = model;
        if (
          commCenterModel.data.Hero !== undefined &&
          commCenterModel.data.List !== undefined
        ) {
          console.log("good to go");
          this.setState({
            HeroModel: model.data.Hero,
            ListModel: model.data.List
          });
        } else {
          // something went wrong, show error page
          console.log("something is wrong");
          GoToErrorPage(this.props.navigator);
        }
      },
      () => {
        console.log("********************request failed***************");
        // something went wrong show error page
        GoToErrorPage(this.props.navigator);
      }
    );
  }
}

export default CommCenter;
