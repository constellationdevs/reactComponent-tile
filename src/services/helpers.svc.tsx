import { container } from "./container.svc";
import _ from "lodash";
import { Navigator } from "react-onsenui";
import ContainerResponseModel from "../models/CdpContainer/ContainerResponse.model";
import DataSourceTypeEnum from "../enums/DataSourceType.enum";
import LandingPage from "../pages/LandingPage";
import OpenTileActionModel from "../models/CDP/MetaAction/OpenTileAction.model";
import MetaActionsEnum from "../models/CDP/MetaAction/MetaAction.enum";
import ConnectorActionModel from "../models/CDP/MetaAction/ConnectorAction.model";
import OpenPageActionModel from "../models/CDP/MetaAction/OpenPageAction.model";
import ErrorPage from "../pages/ErrorPage";
import RequestFileModel from "../models/CDP/MetaAction/RequestFile.model";
import ComponentModel from "../models/CDP/Component.model";

const pageList = {
  LandingPage,
};

// helper to get if this is native app can be hardcoded to return true for local testing
export function isNativeApp(): boolean {
  return container.helper.isNativeApp();
}

// get the tile config json for the tile
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetTileConfig(): Promise<any> {
  return new Promise((resolve, reject) => {
    container.tile.data.loadJsonFile("tileconfig.json", (res: ContainerResponseModel) => {
      const data = JSON.parse(JSON.stringify(res).replace(/&#x2F;/g, "/"));
      console.log(data);
      if (data.success) {
        resolve(data.data.filecontent);
      } else {
        reject();
      }
    });
  });
}

// get open data from the container if it's there
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetContainerOpenData(): Promise<any> {
  return new Promise((hasData) => {
    container.tile.data.getOpenData((response: ContainerResponseModel) => {
      console.info("openData", response);
      if (response.success && response.data && response.data.opendata) {
        hasData(response.data.opendata);
      } else {
        hasData(null);
      }
    });
  });
}

/* run the tile invocation process
  - get the tileConfig
  - check for open data
  - use openData or fall back to tileConfig
  - process the metaAction from openData or tileConfig
*/
export function TileInit(nav: Navigator): Promise<string> {
 
  return new Promise((resolve, reject) => {
 
    container.tile.data.loadStrings(() => 
     
      GetTileConfig().then(
        (config) => {
          console.log("tile init config");
          GetContainerOpenData().then((data) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let metaAction: any;
            if (data === null) {
              // fallback to tileConfig for datasource to get data
              console.log("no openData use tileConfig");
              metaAction = config.openData;
            } else {
              metaAction = data;
            }

            console.log(metaAction);
            if (metaAction !== undefined && metaAction !== null) {
              ProcessMetaAction(metaAction, nav, config);

              resolve("success");
            } else {
              reject("No meta Action");
            }
          });
        },
        () => {
          // not tile fig
          console.log("no tile Config");
          reject("No Tile Config");
        }
      )
    );
  });
}

/* process the cdp component
  - check for the data prop, us it if found
  - no data prop, check for dataSource
    - no dataSource error out
    - if dataSource call it to populate the data prop
    - if dataSource is a callback function resolve and let caller handle getting the data
  - success return the cdpComponent with populated data prop
*/
export function ProcessCDPComponent(model: ComponentModel): Promise<ComponentModel> {
  console.log("**** ProcessCDPComponent");
  console.log(model);
  return new Promise((resolve, reject) => {
    // check for data
    if (model.data === undefined || _.isEmpty(model.data)) {
      // no data check for data source
      if (model.dataSource === undefined || _.isEmpty(model.dataSource)) {
        // we are in trouble if we get here (no data and no dataSource)
        reject();
      } else {
      
        switch (model.dataSource.type) {
          case DataSourceTypeEnum.Connector:
            const params: object = model.dataSource.params ? model.dataSource.params : {};
            container.connectors.sendRequest(model.dataSource.connectorName, model.dataSource.connectorVersion, model.dataSource.connectorMethod, params, (response: ContainerResponseModel) => {
              console.log(response);
              if (response.success) {
                model.data = response.data;
                resolve(model);
              } else {
                reject();
              }
            });
            break;

          case DataSourceTypeEnum.JsFunction:
            // handle the js in the calling function

            resolve(model);
            break;

          default:
            reject();
            break;
        }
      }
    } else {
      // we had data so return it
      console.log("we have data");
      return resolve(model);
    }
  });
}

/* process cdp meta action
  CallConnector
    - if no callback function is passed, then assume the connector returned a metaAction and recall ProcessMetaAction
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProcessMetaAction(action: any, navigator: Navigator, tileConfig: any, methods?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newAction: any = JSON.parse(JSON.stringify(action));
    const open: OpenTileActionModel = action;
    switch (action.actionType) {
      case MetaActionsEnum.OpenTile:
        // #region OpenTile
        // considered done.  No need for a call back function here because we are leaving the tile
        container.tile.openTile(open.tileCode, open.tileVersion, () => console.log("openTile"), open.openData);
        resolve("");
        // #endregion
        break;
      case MetaActionsEnum.CallConnector:
        // #region Call Connector
        // considered done.  Callback is handled by what ever called it
        const conn: ConnectorActionModel = action;
        const params: object = conn.params ? conn.params : {};

        container.connectors.sendRequest(conn.connectorName, conn.connectorVersion, conn.connectorMethod, params, (response: ContainerResponseModel) => {
          if (conn.callBackFunc === undefined || conn.callBackFunc === "") {
            ProcessMetaAction(response, navigator, tileConfig).then((x) => {
              resolve(x);
            });
          } else {
            resolve(response);
          }
        });
        // #endregion
        break;
      case MetaActionsEnum.OpenPage:
        // #region OpenPage
        // considered done
        // Need a page tile passed in on meta
        const openPage: OpenPageActionModel = action;
        console.log(openPage);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const myComponent: any = pageList[openPage.component];

        if (myComponent !== undefined) {
          navigator
            .pushPage({
              component: myComponent,
              props: {
                tileConfig,
                componentModel: openPage.openData,
                methods,
              },
            })
            .then(() => {
              // @ts-ignore
              const clone = navigator.clone;
              container.tile.navigation.pushPanelWithTitle(clone, openPage.pageName, openPage.pageTitle);
              resolve("");
            });
        } else {
          GoToErrorPage(navigator, tileConfig);
        }

        // #endregion
        break;
      case MetaActionsEnum.JsFunction:
        // #region JS Function
        if (methods && methods[action.functionName]) {
          const jsParams = Object.values(action.params);
          // TODO figure out how to force it to add the params in order here
          methods[action.functionName](...jsParams);
          resolve("");
        } else if (action.functionName.includes("container")) {
          const fnName = getFunctionFromString(action.functionName);
          const fnParams = action.params;
          if (typeof fnName === "function") {
            // fnName.apply(null,...[fnParams])
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fnName(fnParams, (response: any) => {
              console.log(response);
              if (response.success) {
                //
              } else {
                reject();
              }
            });
          }
        } else {
          reject(`No such function name "${action.functionName}"`);
        }
        break;

      case MetaActionsEnum.FromLanding:
        newAction.actionType = 3;

        if (isNativeApp()) {
          ProcessMetaAction(newAction, navigator, tileConfig, methods);
        } else {
          delete newAction.pageTitle;
          container.tile.openTile(
            tileConfig.config.tileInfo.code,
            tileConfig.config.tileInfo.version,
            () => console.log("openTile"),
            newAction,
            "_blank",
            "large",
            () => {
              console.log("Close me Call back");
              // #region JS Function
              if (methods[action.functionName]) {
                // const jsParams = Object.values(action.params);
                methods[action.functionName]();
                // resolve();
              } else {
                reject(`No such function name "${action.functionName}"`);
              }
            }
          );
        }
        resolve("");
        break;

      case MetaActionsEnum.RequestFile:
        // #region Request File
        const fileConn: RequestFileModel = action;
        const fileParams: object = fileConn.params ? fileConn.params : {};

        container.connectors.sendFileRequest(
          fileConn.connectorName,
          fileConn.connectorVersion,
          fileConn.connectorMethod,
          fileParams,
          fileConn.mimeType,
          fileConn.filename,
          (response: ContainerResponseModel) => {
            resolve(response);
          },
          fileConn.generateText,
          fileConn.downloadText
        );

        break;

      case MetaActionsEnum.OpenTileModal:
        container.tile.openTile(open.tileCode, open.tileVersion, () => console.log("openTile"), open.openData, "_blank", "large");
        resolve("");
        break;

      // #endregion
      default:
        console.log(action);
        reject();
        break;
    }
  });
}

/* Push Error Page on the stack
    - the timeout function is used so the navigator can finish before being called again
  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GoToErrorPage(navigator: Navigator, tileConfig: any) {
  setTimeout(() => {
    navigator.pushPage({
      component: ErrorPage,
      props: {
        tileConfig,
        navigator,
      },
    });
  }, 1000);
}

/* Create a new guid */
export function newGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getTileString = (code: string) => {
  if (container.tile.data && container.tile.data.getString) {
    return container.tile.data.getString(code);
  }
  return "";
};

/*
  used to get a container method
  by reading the methods on the window and comparing it to the
  string that is passed in on the JS metaActions
  eg. "container.tile.goBack"
  */
const getFunctionFromString = (functionString: string) => {
  let scope = window;
  const scopeSplit = functionString.split(".");
  for (let i = 0; i < scopeSplit.length - 1; i++) {
    scope = scope[scopeSplit[i]];
    if (scope === undefined) {
      return;
    }
  }
  return scope[scopeSplit[scopeSplit.length - 1]];
};
