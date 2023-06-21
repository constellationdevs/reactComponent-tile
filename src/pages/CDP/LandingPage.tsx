import React, { Component } from "react";
import { Page } from "react-onsenui";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import IBaseStateModel from "../../models/CDP/baseStates/IBaseState.model";
import ComponentModel from "../../models/CDP/Component.model";
import { isNativeApp, ProcessCDPComponent } from "../../services/helper.svc";

export default class LandingPage extends Component<IBasePropsModel, IBaseStateModel> {
  pageClass = "desktop";
  pageContainer: React.RefObject<HTMLDivElement>;

  constructor(props: IBasePropsModel) {
    super(props);
    this.state = {
      componentModel: {},
    };

    this.pageContainer = React.createRef();

    if (isNativeApp()) {
      this.pageClass = "native";
    }
  }

  componentDidMount() {
    this.pageInit();
  }

  pageInit = () => {
    ProcessCDPComponent(this.state.componentModel).then(
      (model: ComponentModel) => {
        // do page work
        console.log("Page Init", model);
      },
      () => {
        console.error("Something with wrong");
      }
    );
  };

  render() {
    return (
      <Page key="landingPage" id="landingPage">
        <div className="cdp_page_container" ref={this.pageContainer}>
          <div className="cdp_hero">add a hero component to this container</div>
          <div id="secondaryContainer">
            <div className="cdp_list_container">add a list component to this container</div>
          </div>
        </div>
      </Page>
    );
  }
}
