import MetaActionModel from './MetaAction/MetaAction.model';

export class BtnComponentModel {

    componentID: string;
    iconClass: string;
    label: string;
    notifications: number;
    metaAction: MetaActionModel;
}

export default BtnComponentModel;