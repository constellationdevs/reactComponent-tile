export class PillModel {
  id: string;
  keyName: string;
  keyValue: string;
  pillText: string;
  active: boolean;
  parentID: string;

  constructor(name: string, value: string, display: string, active: boolean, filterID: string, parentFilterID: string) {
    this.keyName = name;
    this.keyValue = value;
    this.pillText = display;
    this.active = active;
    this.id = filterID;
    this.parentID = parentFilterID;
  }
}

export default PillModel;
