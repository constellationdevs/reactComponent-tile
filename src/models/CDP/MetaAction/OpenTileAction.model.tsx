import MetaActionModel from "./MetaAction.model";

export class OpenTileActionModel extends MetaActionModel {
    tileCode: string;
    tileVersion: string;
    callbackFunc: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openData: any;
}

export default OpenTileActionModel;