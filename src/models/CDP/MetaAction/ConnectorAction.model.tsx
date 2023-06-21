/* eslint-disable @typescript-eslint/no-explicit-any */
import MetaActionModel from "./MetaAction.model";

export class ConnectorActionModel extends MetaActionModel {
  connectorName: string;
  connectorMethod: string;
  connectorVersion: string;
  params: any;
  callBackFunc: any;

  ConnectorActionModel(){
  
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.callBackFunc = ()=>{}
}
}

export default ConnectorActionModel;