import DataSourceModel from "./DataSource.model";

export class ComponentModel {
  componentID: string;
  data: any;
  templateID: string;
  dataSource: DataSourceModel;
}

export default ComponentModel;
