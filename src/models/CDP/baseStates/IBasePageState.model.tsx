import IBaseStateModel from "./IBaseState.model";

export interface IBasePageStateModel extends IBaseStateModel {
    openToast: boolean;
    toastMsg: string;
}

export default IBasePageStateModel;
