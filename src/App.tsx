import React, { Component, createRef, RefObject, createElement } from "react";
import { Navigator } from "react-onsenui";
import { TileInit, GoToErrorPage } from "./services/helper.svc";


class App extends Component<any, any> {
  // create a reference to the onsen Navigator
  navEl: RefObject<Navigator> = createRef();

  /* only render the onsen navigator
    Let the tileInit decide what to do
   */
  render() {
    const renderPage = (route: any, appNavigator: Navigator) => {
      console.log("renderpage");
      // @ts-ignore
      if (!appNavigator.clone) {
        appNavigator = this.initTileAndNavigatorForPlatform(appNavigator);
      }

      const props = route.props || {};
      props.navigator = appNavigator;

      return createElement(route.component, props);
    };

    return <Navigator id="AppNavigator" key="AppNavigator" renderPage={renderPage} ref={this.navEl} />;
  }

  componentDidMount() {
    // The navigator is rendered now Init the Tile by getting the TileConfig and any openData
    // if this fails go to error page
    const nav = this.navEl.current;
    if (nav) {
      TileInit(nav).then(
        data => {
          console.log("Tile Init Success");
        },
        msg => {
          // failed
          console.log(msg);
          GoToErrorPage(nav);
        }
      );
    }
  }



  /* set up the react onsen nav to play nice with the container nav
   */
  initTileAndNavigatorForPlatform(appNavigator: Navigator): any {
    // This is exists to prevent promises from not resolving with the container

    // @ts-ignore
    appNavigator.clone = appNavigator._navi;

    // @ts-ignore
    appNavigator.clone.pushPage = () => {
      console.log("clone pushing page...");
      console.log(appNavigator);
    };

    // @ts-ignore
    tile.popPanel = () => {
      appNavigator.popPage().then((ok: any) => {
        console.log("clone navigator pop");
      });
    };

    return appNavigator;
  }
}

export default App;
