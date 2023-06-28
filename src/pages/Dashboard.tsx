import React, { Component, createRef } from "react";
import IBasePageStateModel from "../models/CDP/baseStates/IBasePageState.model";
import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import { Page, Toast } from "react-onsenui";
import { isNativeApp, ProcessCDPComponent, GoToErrorPage, getTileString } from "../services/helper.svc";
import container, { tile } from "../services/container.svc";
import ListComponent from "../components/CDP/List/List.component";
import LandingPageModel from "../models/CDP/LandingPage.model";
import HeroGraph from "../components/Hero/HeroGraph.component";
import BottomBar from "../components/BottomBar/BottomBar.component";
import ListComponentModel from "../models/CDP/Lists/ListComponent.model";
import HeroModel from "../models/Hero.model";
import BottomBarModel from "../models/BottomBar.model";

export interface IDashboardProps extends IBasePropsModel {
  componentModel: LandingPageModel;
}

export interface IDashboardState extends IBasePageStateModel {
  HeroModel: HeroModel;
  ListModel: ListComponentModel;
  BottomBarModel: BottomBarModel;
  toastColor: string;
}

class Dashboard extends Component<IDashboardProps, IDashboardState> {
  pageClass = "desktop";
  lastScrollTop = 0;
  heroHeight = 0;
  pageContainer: any = createRef();
  listContainer: any = createRef();

  state = {
    componentModel: this.props.componentModel,
    HeroModel: new HeroModel(),
    ListModel: new ListComponentModel(),
    BottomBarModel: new BottomBarModel(),
    openToast: false,
    toastMsg: "",
    toastColor: "danger"
  };

  render() {
    return (
      <Page key="dashboard" id="dashboard" className={this.pageClass}>
        <Toast isOpen={this.state.openToast} className={this.state.toastColor}>
          <div className="toastMsg">{this.state.toastMsg}</div>
          <button onClick={this.dismissToast}>{getTileString("100106")}</button>
        </Toast>
        <div className="cdp_page_container" onScroll={this.pageScroll} ref={this.pageContainer}>
          <HeroGraph
            componentModel={this.state.HeroModel}
            navigator={this.props.navigator}
          />
          <div className="cdp_list_container">
            <ListComponent
              ref={this.listContainer}
              componentModel={this.state.ListModel}
              navigator={this.props.navigator}
              pageID="dashboard"
              heroID="DashboardHeroContainer"
            />
          </div>
          <BottomBar
            componentModel={this.state.BottomBarModel}
            navigator={this.props.navigator}
          />
        </div>
      </Page>
    );
  }

  componentDidMount() {
    if (isNativeApp()) {
      this.pageClass = "native";
    }

    this.pageInit();
    this.callLocalConnector();
  }

  showToast = (msg: string, color: string) => {
    this.setState({ openToast: true, toastMsg: msg, toastColor: color });
  }

  dismissToast = () => this.setState({ openToast: false });

  pageScroll = (event: any) => {
    // @ts-ignore
    const pageContainer = document.querySelector("#dashboard .cdp_page_container");
    let currentScrollTop = 0

    if (pageContainer) {
      currentScrollTop = pageContainer.scrollTop || 0;
    }

    if (currentScrollTop !== 0) {
      if (this.lastScrollTop < currentScrollTop && !this.pageContainer.current.classList.contains("shrink")) {
        // shrink
        this.pageContainer.current.classList.add("shrink");
      }
    } else {
      this.pageContainer.current.classList.remove("shrink");
    }

    this.lastScrollTop = currentScrollTop;

    if (this.listContainer.current && this.listContainer.current.stickies && this.heroHeight) {
      tile.stickyHeaderScroll("dashboard", this.heroHeight, this.listContainer.current.stickies);
    }
  };
  pageInit = () => {
    ProcessCDPComponent(this.state.componentModel).then(
      model => {
        const dashboardModel: LandingPageModel = model;
        if (
          dashboardModel.data.Hero !== undefined &&
          dashboardModel.data.List !== undefined
        ) {
          const hero = document.querySelector(".cdp_hero");
          if (hero) {
            // @ts-ignore
            this.heroHeight = hero.offsetHeight;
          }
          console.log("good to go");
          this.setState({
            HeroModel: model.data.Hero,
            ListModel: model.data.List,
            BottomBarModel: model.data.BottomBar
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

  callLocalConnector = () => {
    container.connectors.sendRequest("BasicConnectorTemplate", "1.0", "businessLogicMethod", {}, (resp:any)=> {
      console.log("right here" + resp);
    } );
  }
}

export default Dashboard;
