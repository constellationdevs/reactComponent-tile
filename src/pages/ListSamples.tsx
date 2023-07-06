import React, { Component } from "react";
import IBasePageStateModel from "../models/CDP/baseStates/IBasePageState.model";
import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import { Page, Toast } from "react-onsenui";
import { ProcessCDPComponent, GoToErrorPage, getTileString } from "../services/helper.svc";
import ListComponent from "../components/CDP/List/List.component";
import LandingPageModel from "../models/CDP/LandingPage.model";
import ListComponentModel from "../models/CDP/Lists/ListComponent.model";

export interface IListSamplesProps extends IBasePropsModel {
  componentModel: LandingPageModel;
}

export interface IListSamplesState extends IBasePageStateModel {
  ListModel: ListComponentModel;
  toastColor: string;
}

class ListSamples extends Component<IListSamplesProps, IListSamplesState> {

  state = {
    componentModel: this.props.componentModel,
    ListModel: new ListComponentModel(),
    openToast: false,
    toastMsg: "",
    toastColor: "danger"
  };

  render() {
    return (
      <Page key="listSamples" id="listSamples">
        <Toast isOpen={this.state.openToast} className={this.state.toastColor}>
          <div className="toastMsg">{this.state.toastMsg}</div>
          <button onClick={this.dismissToast}>{getTileString("100106")}</button>
        </Toast>
        <div className="cdp_page_container">
          <div className="cdp_list_container">
            <ListComponent
              componentModel={this.state.ListModel}
              navigator={this.props.navigator}
              pageID="listSamples"
            />
          </div>
        </div>
      </Page>
    );
  }

  componentDidMount() {
    this.pageInit();
  }

  showToast = (msg: string, color: string) => {
    this.setState({ openToast: true, toastMsg: msg, toastColor: color });
  }

  dismissToast = () => this.setState({ openToast: false });

  pageInit = () => {
    ProcessCDPComponent(this.state.componentModel).then(
      model => {
        const listSamplesModel: LandingPageModel = model;
        if (listSamplesModel.data.List !== undefined) {
          console.log("good to go");
          this.setState({ ListModel: model.data.List });
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

export default ListSamples;
