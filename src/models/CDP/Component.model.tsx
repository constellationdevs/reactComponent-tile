import DataSourceModel from "./DataSource.model";

export default class ComponentModel {
  public componentID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public templateID: number;
  public dataSource: DataSourceModel;
  
}

