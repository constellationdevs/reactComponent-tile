import React, { createRef, RefObject, createElement } from "react";
import { Navigator } from "react-onsenui";
import { TileInit, GoToErrorPage, GetTileConfig } from "./services/helpers.svc";

class App extends React.Component<any, any> {

 // create a reference to the onsen Navigator
 private navEl: RefObject<Navigator> = createRef();
 
 constructor(props: any) {
  super(props);

  this.state = {
    tileConfig: {}
  }

  this.navEl = createRef();


  GetTileConfig().then(data => {
    console.log("app get tile config");
    this.setState({ tileConfig: data });
  });
}

 /* only render the onsen navigator
   Let the tileInit decide what to do
  */
   public render() {
    const renderPage = (route: any, appNavigator: Navigator) => {
      console.log("renderpage");
      console.log(this.state.tileConfig);
      // @ts-ignore
      if (!appNavigator.clone) {
        appNavigator = this.initTileAndNavigatorForPlatform(appNavigator);
      }

      const props = route.props || {};
      props.navigator = appNavigator;

      props.tileConfig = this.state.tileConfig;

      return createElement(route.component, props);
    };

    // @ts-ignore
    return (<Navigator
      onPrePush={(e: any) => {e.currentPage?.setAttribute("inert", "")}}
      onPostPop={(e: any) => {e.enterPage?.removeAttribute("inert")}}
      id="AppNavigator" key="AppNavigator" renderPage={renderPage} ref={this.navEl} />);
  }

 componentDidMount() {

   // The navigator is rendered now Init the Tile by getting the TileConfig and any openData
   // if this fails go to error page
   const nav = this.navEl.current;
  
   if (nav) {
     TileInit(nav).then(
       () => {
         console.log("Tile Init Success");
       },
       msg => {
         // failed
         console.log(msg);
         GoToErrorPage(nav, null);
       }
     );
   }
 }



 /* set up the react onsen nav to play nice with the container nav
  */
 initTileAndNavigatorForPlatform(appNavigator: Navigator): Navigator {
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
     appNavigator.popPage().then(() => {
       console.log("clone navigator pop");
     });
   };

   return appNavigator;
 }
}

export default App;