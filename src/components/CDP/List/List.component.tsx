/*
  base component for the messages section
  Handles all initialization of the component and Processing of the CDP Component Model
*/

import React, { Component } from "react";
import _ from "lodash";
import ListComponentModel from "../../../models/CDP/Lists/ListComponent.model";
import { ProcessCDPComponent, ProcessMetaAction } from "../../../services/helper.svc";
import IBaseComponentStateModel from "../../../models/CDP/baseStates/IBaseComponentState.model";
import IBasePropsModel from "../../../models/CDP/baseProps/IBaseProps.model";
import { List, ListHeader, ListItem, Icon, Navigator } from "react-onsenui";
import ListModel from "../../../models/CDP/Lists/List.model";
import ListItemModel from "../../../models/CDP/Lists/ListItem.model";
import ListItemTemplate1 from "./ItemTemplates/ListItemTemplate1.component";
import ListItemTemplate2 from "./ItemTemplates/ListItemTemplate2.component";
import ListItemTemplate3 from "./ItemTemplates/ListItemTemplate3.component";
import ListItemTemplate4 from "./ItemTemplates/ListItemTemplate4.component";
import HeaderTemplateStandard from "./HeaderTemplates/HeaderTemplateStandard.component";
import HeaderTemplateIcon from "./HeaderTemplates/HeaderTemplateIcon.component";


export interface IListState extends IBaseComponentStateModel {
  componentModel: ListComponentModel;
}
export interface IListProps extends IBasePropsModel {
  componentModel: ListComponentModel;
  pageID: string;
  heroID?: string;
  methods?: any;
  overflow?: string;
}

class ListComponent extends Component<IListProps, IListState> {
  testListModel: ListComponentModel;
  config: any;

  state = {
    componentModel: this.props.componentModel,
    loading: true,
    inError: false
  };

  render() {
    if (this.state.inError) {
      return <div></div>;
    } else {
      let rowLoading: JSX.Element;
      let noItems: JSX.Element;
      let listContainer: any;

      if (this.state.loading) {
        rowLoading = (
          <List
            dataSource={[1, 2, 3, 4]}
            renderRow={this.renderGenericPlaceholderRow}
            renderHeader={() => <ListHeader></ListHeader>}
          />
        );
      } else {
        if (this.state.componentModel.data.results.length === 0) {
          noItems = (
            <div className="noListData">You have no items to display.</div>
          );
        } else {
          listContainer = this.state.componentModel.data.results.map(
            (item: ListModel, idx: number) => {
              const listKey = "list" + item.headerTitle + this.props.pageID;
              return (
                <List
                  className={this.props.overflow ? "overflow-visible" : undefined}
                  key={listKey}
                  dataSource={item.items}
                  renderHeader={() => this.renderHeader(item, idx)}
                  renderRow={(row: ListItemModel, rowidx: number) =>
                    this.renderRow(
                      row,
                      rowidx,
                      this.props.navigator
                    )
                  }
                />
              );
            }
          );
        }
      }
      const buildPage = () =>
        <>
          {rowLoading}
          {noItems}
          {listContainer}
        </>

      const page = buildPage();

      return page;
    }
  }

  renderHeader = (item: any, idx: number) => {
    const headerKey: string = "headerKey" + item.headerTitle + idx;
    const searchIcon: string = this.state.componentModel.data.search
      ? this.state.componentModel.data.search.buttonIcon
      : "";

    if (item.headerTitle !== undefined && item.headerTitle !== null) {

      switch (item.headerTemplateID) {
        case 2:
          return <HeaderTemplateIcon key={headerKey} id={headerKey} className="sticky" item={item} methods={this.props.methods} />

        default:
          return (
            <HeaderTemplateStandard key={headerKey} id={headerKey} className="sticky">
              {item.headerTitle}
              {searchIcon && (
                <span className={`stickySpan ${idx === 0 ? "first" : ""}`} onClick={() => this.handleOpen(this.state.componentModel.data.search!.metaAction)}>
                  <Icon className="search-icon" icon={searchIcon} />
                </span>
              )}
            </HeaderTemplateStandard>
          )
      }
    } else {
      return <></>
    }
  }

  renderRow = (
    row: any,
    idx: number,
    navigator: Navigator
  ) => {
    const itemKey = "template " + idx + row.key;
    switch (row.templateID) {
      case 1:
        return (
          <ListItemTemplate1
            row={row}
            idx={idx}
            key={itemKey}
            componentModel=""
            navigator={navigator}
            handleOpen={this.handleOpen}
            methods={this.props.methods}
          />
        );
      case 2:
        return (
          <ListItemTemplate2
            row={row}
            idx={idx}
            key={itemKey}
            componentModel=""
            navigator={navigator}
            handleOpen={this.handleOpen}
            methods={this.props.methods}
          />
        );
      case 3:
        return (
          <ListItemTemplate3
            row={row}
            idx={idx}
            key={itemKey}
            componentModel=""
            navigator={navigator}
            handleOpen={this.handleOpen}
            methods={this.props.methods}
          />
        );

      case 4:
        return (
          <ListItemTemplate4
            row={row}
            idx={idx}
            key={itemKey}
            componentModel=""
            navigator={navigator}
            handleOpen={this.handleOpen}
            methods={this.props.methods}
          />
        );

      default:
        return <div></div>;
    }
  }

  renderGenericPlaceholderRow = (row: any, idx: number) => {
    return (
      <ListItem key={idx}>
        <div className="left">
          <div className=" list-item__thumbnail round-img-small loading"></div>
        </div>
        <div className="center">
          <span className="list-item__title loading"></span>
          <span className="list-item__subtitle loading"></span>
        </div>
        <div className="right">
          <span className="callout loading"></span>
        </div>
      </ListItem>
    );
  }

  componentDidUpdate(prevProps: IBasePropsModel, prevState: IListState) {
    if (prevProps.componentModel !== this.props.componentModel) {
      this.setState({ loading: true, inError: false })
    }

    if (this.state.loading && !this.state.inError) {
      this.componentInit();
    }

    if (!this.state.loading) {
      // tile.stickyHeaderInit(this.props.pageID, this.props.heroID);
    }

    // @ts-ignore
    this.stickies = tile.stickyHeaderInit(this.props.pageID);
  }

  handleOpen = (metaAction: any) => {
    if (metaAction && !_.isEmpty(metaAction) && metaAction.actionType === 3) {
      // Add any methods to be passed as 4th param ex: {methodName: this.props.methods?.methodName}
      ProcessMetaAction(metaAction, this.props.navigator, this.props.methods);
    }
  }

  /* Initialize the component
   *  Process the componentModel
   */
  componentInit = () => {
    console.log("list component init");
    console.log(this.props.componentModel);
    ProcessCDPComponent(this.props.componentModel).then(
      data => {
        console.log("Post process list component");
        console.log(data);
        this.setState({ loading: false, componentModel: data });
      },
      () => {
        console.log("** List ERROR**");
        this.setState({ inError: true });
        // GoToErrorPage(this.props.navigator);
      }
    );
  }
}

export default ListComponent;
