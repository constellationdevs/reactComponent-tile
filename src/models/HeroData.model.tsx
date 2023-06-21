import { BtnComponentModel } from "./CDP/BtnComponent.model";
import { PrimaryActionsModel } from "./CDP/PrimaryActions.model"


export class HeroDataModel {
  [x: string]: any;
  componentID: string;
  btnSetting: BtnComponentModel;
  profileImageURL: string;
  heading: string;
  headerCallOut: string;
  primaryActions: PrimaryActionsModel;
}

export default HeroDataModel;
