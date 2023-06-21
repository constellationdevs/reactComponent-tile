import React, { Component } from "react";
import _ from "lodash";
import IBaseComponentStateModel from "../../../models/base/BaseComponentState.model";
import IBasePropsModel from "../../../models/base/BaseProps.model";
import ListComponentModel from "../../../models/CDP/Lists/ListComponent.model";
import { ProcessCDPComponent, ProcessMetaAction } from "../../../services/helpers.svc";
import ListItemModel from "../../../models/CDP/Lists/ListItem.model";
import GenericListItemTemplate1 from "./ItemTemplates/Generic.template1.component";
import HeaderTemplateStandard from "./HeaderTemplates/HeaderTemplateStandard.component";
import { Icon, ListItem, Navigator } from "react-onsenui";
import HeaderTemplateIcon from "./HeaderTemplates/HeaderTemplateIcon.component";
import ListModel from "../../../models/CDP/Lists/List.model";

export interface IListState extends IBaseComponentStateModel {
  componentModel: ListComponentModel;
}

export interface IListProps extends IBasePropsModel {
  componentModel: ListComponentModel;
  pageID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods?: any;
  overflow?: string;
}

export default class ListComponent extends Component<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      componentModel: this.props.componentModel,
      loading: true,
      inError: false,
    };
  }

  /* Initialize the component
   *  Process the componentModel
   */
  componentInit = () => {
    console.log("list component init");
    console.log(this.props.componentModel);
    ProcessCDPComponent(this.props.componentModel).then(
      (data: ListComponentModel) => {
        console.info("Post process list component", data);
        this.setState({ loading: false, componentModel: data });
      },
      () => {
        console.error("** List ERROR**");
        this.setState({ inError: true });
      }
    );
  }

  componentDidUpdate(prevProps: IListProps) {
    if (prevProps.componentModel !== this.props.componentModel) {
      this.setState({ loading: true, inError: false })
    }

    if (this.state.loading && !this.state.inError) {
      this.componentInit();
    }
 
    // @ts-ignore
    this.stickies = tile.stickyHeaderInit(this.props.pageID);
  }

  renderHeader = (item: ListModel, idx: number) => {
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
                <span className={`stickySpan ${idx === 0 ? "first" : ""}`} onClick={() => this.handleOpen(this.state.componentModel.data.search.metaAction)}>
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any, // could be any type of row model
    idx: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tileConfig: any,
    navigator: Navigator
  ) => {
    const itemKey = "template " + idx + row.key;
    switch (row.templateID) {
      case 1:
        return (
           
          <GenericListItemTemplate1
            row={row}
            idx={idx}
            key={itemKey}
            tileConfig={tileConfig}
            navigator={navigator}
            handleOpen={this.handleOpen}
            methods={this.props.methods}
          ></GenericListItemTemplate1>
        );
      default:
        return <div></div>;
    }
  }

  renderGenericPlaceholderRow = (row: ListItemModel, idx: number) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOpen = (metaAction: any) => {
    if (metaAction && !_.isEmpty(metaAction) && metaAction.actionType === 3) {
      // Add any methods to be passed as 4th param ex: {methodName: this.props.methods?.methodName}
      ProcessMetaAction(metaAction, this.props.navigator, this.props.tileConfig, this.props.methods);
    }
  }
}
