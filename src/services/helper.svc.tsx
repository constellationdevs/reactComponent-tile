// import MetaActionModel from "../models/MetaAction/MetaAction.model";
import _ from "lodash";
import ErrorPage from "../pages/CDP/ErrorPage";
import MetaActionsEnum from "../models/CDP/MetaAction/MetaAction.enum";
import OpenPageActionModel from "../models/CDP/MetaAction/OpenPageAction.model";

import CommCenter from "../pages/CommCenter";
import SearchPage from "../pages/SearchPage";
import Dashboard from "../pages/Dashboard";
import ListSamples from "../pages/ListSamples";

import ConnectorActionModel from "../models/CDP/MetaAction/ConnectorAction.model";
import OpenTileActionModel from "../models/CDP/MetaAction/OpenTileAction.model";
import RequestFileModel from "../models/CDP/MetaAction/RequestFile.model";

import IContainerResponse, { ContainerResponse } from "../models/CDP/ContainerResponse.model";

import { container, tile } from "./container.svc";
import DataSourceModel from "../models/CDP/DataSource.model";
import DataSourceTypeEnum from "../models/CDP/DataSourceType.enum";
import { Navigator } from "react-onsenui";
import he from "he";

/* check if we are testing / running locally
 */
export function isLocalHost(): boolean {
  return location.hostname === "localhost";
}

/* return isNativeApp from the container
 - created as a helper function here so it can be overridden during testing
*/
export function isNativeApp(): boolean {
  return container.helper.isNativeApp();
  //  return true;
}

/* Allowable entry points for the tile
  - add react components to this list as needed
 */
const pageList = {
  Dashboard,
  CommCenter,
  SearchPage,
  ListSamples
};

/* get the tile config json for the tile
 */
export function GetTileConfig(): Promise<any> {
  return new Promise((resolve, reject) => {
    container.tile.data.loadJsonFile("tileconfig.json", (res: ContainerResponse) => {
      const data = JSON.parse(JSON.stringify(res).replace(/&#x2F;/g, "/"));
      console.log(data);
      if (data.success) {
        tile.tileConfig = data.data.filecontent;
        resolve(data.data.filecontent);
      } else {
        reject();
      }
    });
  });
}

/* get open data from the container if it's there
 */
export function GetContainerOpenData(): Promise<any> {
  return new Promise(hasData => {
    container.tile.data.getOpenData((response: ContainerResponse) => {
      if (response.success && response.data && response.data.opendata) {
        hasData(response.data.opendata);
        // hasData(null);
      } else {
        hasData(null);
      }
    });
  });
}

/*
  used to get a container method
  by reading the methods on the window and comparing it to the
  string that is passed in on the JS metaActions
  eg. "container.tile.goBack"
  */

const getFunctionFromString = (functionString: string) => {
  let scope = window;
  const scopeSplit = functionString.split('.');
  for (let i = 0; i < scopeSplit.length - 1; i++) {
    scope = scope[scopeSplit[i]];
    if (scope === undefined) { return }
  }
  return scope[scopeSplit[scopeSplit.length - 1]];
};

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
        config => {
          GetContainerOpenData().then(data => {
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
      ));
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
export function ProcessCDPComponent(model: any): Promise<any> {
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
        const source: DataSourceModel = model.dataSource;

        switch (source.type) {
          case DataSourceTypeEnum.Connector:
            const params: object = model.dataSource.params
              ? model.dataSource.params
              : {};
            container.connectors.sendRequest(
              source.connectorName,
              source.connectorVersion,
              source.connectorMethod,
              params,
              (response: any) => {
                console.log(response);
                if (response.success) {
                  model.data = JSON.parse(he.decode(JSON.stringify(response.data)));
                  resolve(model);
                } else {
                  reject();
                }
              }
            );
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
export function ProcessMetaAction(
  action: any,
  navigator: Navigator,
  methods?: any
): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const newAction: any = JSON.parse(JSON.stringify(action));
    const open: OpenTileActionModel = action;
    switch (action.actionType) {
      case MetaActionsEnum.OpenTile:
        // #region OpenTile
        // considered done.  No need for a call back function here because we are leaving the tile
        container.tile.openTile(
          open.tileCode,
          open.tileVersion,
          () => console.log("openTile"),
          open.openData
        );
        resolve();
        // #endregion
        break;
      case MetaActionsEnum.CallConnector:
        // #region Call Connector
        // considered done.  Callback is handled by what ever called it
        const conn: ConnectorActionModel = action;
        const params: object = conn.params ? conn.params : {};

        container.connectors.sendRequest(
          conn.connectorName,
          conn.connectorVersion,
          conn.connectorMethod,
          params,
          (response: any) => {
            if (conn.callBackFunc === undefined || conn.callBackFunc === "") {
              ProcessMetaAction(response, navigator).then(x => {
                resolve(x);
              });
            } else {
              resolve(response);
            }
          }
        );
        // #endregion
        break;
      case MetaActionsEnum.OpenPage:
        // #region OpenPage
        // considered done
        // Need a page tile passed in on meta
        const openPage: OpenPageActionModel = action;
        console.log(openPage);
        const myComponent: any = pageList[openPage.component];

        if (myComponent !== undefined) {
          navigator
            .pushPage({
              component: myComponent,
              props: {
                componentModel: openPage.openData,
                methods
              }
            })
            .then(() => {
              // @ts-ignore
              const clone = navigator.clone;
              container.tile.navigation.pushPanelWithTitle(
                clone,
                openPage.pageName,
                openPage.pageTitle
              );
              resolve();
            });
        } else {
          GoToErrorPage(navigator);
        }

        // #endregion
        break;

      case MetaActionsEnum.JsFunction:
        // #region JS Function
        if (methods && methods[action.functionName]) {
          const jsParams = Object.values(action.params);
          // TODO figure out how to force it to add the params in order here
          methods[action.functionName](...jsParams);
          resolve();
        }
        else if (action.functionName.includes("container")) {
          const fnName = getFunctionFromString(action.functionName);
          const fnParams = action.params;
          if (typeof fnName === "function") {
            // fnName.apply(null,...[fnParams])
            fnName(fnParams, (response: any) => {
              console.log(response);
              if (response.success) {
                //
              } else {
                reject();
              }
            }
            );
          }
        }
        else {

          reject(`No such function name "${action.functionName}"`);
        }
        break;

      case MetaActionsEnum.FromLanding:
        newAction.actionType = 3;

        if (isNativeApp()) {
          ProcessMetaAction(newAction, navigator, methods);
        }
        else {
          delete newAction.pageTitle;
          container.tile.openTile(
            tile.tileConfig.config.tileInfo.code, 
            tile.tileConfig.config.tileInfo.version, 
            () => console.log("openTile"), newAction, "_blank", "large", () => {

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
        resolve();
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
          (response: any) => {
            resolve(response);
          },
          fileConn.generateText,
          fileConn.downloadText
        );

        break;

      case MetaActionsEnum.OpenTileModal:
        container.tile.openTile(open.tileCode, open.tileVersion, () => console.log("openTile"), open.openData, "_blank", "large");
        resolve();
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
export function GoToErrorPage(navigator: any) {
  console.log("error page");
  setTimeout(() => {
    navigator
      .pushPage({
        component: ErrorPage,
        props: {
          navigator
        }
      })
      .then(() => {
        container.tile.navigation.pushPanelWithTitle(
          navigator.clone,
          "ErrorPage",
          "Error Page"
        );
      });
  }, 1000);
}

/* Create a new guid */
export function newGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getTileString = (code: any) => {
  if (container.tile.data && container.tile.data.getString) {
    return container.tile.data.getString(code);
  }
  return '';
};
