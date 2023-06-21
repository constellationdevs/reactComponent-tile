export default class DataSourceModel {

    type: number;
    connectorName: string;
    connectorMethod: string;
    connectorVersion: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any;
    jsFunction: string;

}