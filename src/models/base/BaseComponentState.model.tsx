import IBaseStateModel from "./BaseState.model";

export default interface IBaseComponentStateModel extends IBaseStateModel{
    loading: boolean;
    inError: boolean;
}