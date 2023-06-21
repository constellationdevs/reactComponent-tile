import React, { Component } from "react";
import { ListItem, Button, SearchInput, Icon } from "react-onsenui";
import ListSearchModel from "../../../../models/CDP/Lists/ListSearch.model";
import IBasePropsModel from "../../../../models/CDP/baseProps/IBaseProps.model";
import { handleKeyPress } from "../../../../services/accessibility.svc";
import { getTileString } from "../../../../services/helper.svc";

export interface IListItemTemplate2Props extends IBasePropsModel {
  row: ListSearchModel;
  idx: number;
  handleOpen: any;
  methods?: any;
}

export interface IListItemTemplate2State {
  row: ListSearchModel;
}

class ListItemTemplate2 extends Component<IListItemTemplate2Props, IListItemTemplate2State> {
  state = {
    row: this.props.row
  }

  placeholderSearch: any = { placeholder: this.state.row.placeholder };

  render() {
    const itemKey: string = this.state.row.key;
    return (
      <ListItem key={itemKey} className="search-toolbar">
        <div className="center">
          <SearchInput
            // @ts-ignore
            role="searchbox"
            {...this.placeholderSearch}
          />
          <span className="remove-search-text">
            <Icon
              // @ts-ignore
              role="button"
              onKeyPress={handleKeyPress}
              tabIndex={0}
              className="remove-search-text-icon"
              icon={this.state.row.clearIconClass}
            />
          </span>
        </div>
        <div className="right">
          <Button
            // @ts-ignore
            role="button"
            onKeyPress={handleKeyPress}
            tabIndex={0}
            id="CancelSearch">
            {getTileString("100107")}
          </Button>
        </div>
      </ListItem>
    );
  }
}

export default ListItemTemplate2;
