import IBaseStateModel from "./IBaseState.model";

export interface IBaseComponentStateModel extends IBaseStateModel {
  loading: boolean;
  inError: boolean;
}

export default IBaseComponentStateModel;
