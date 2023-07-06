import React from "react";
import { Button, ActionSheet, ActionSheetButton, Icon } from "react-onsenui";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import IBaseComponentStateModel from "../../models/CDP/baseStates/IBaseComponentState.model";
import ListComponentModel from "../../models/CDP/Lists/ListComponent.model";
import {handleKeyPress} from "../../services/accessibility.svc";
import AccountInfoModel from "../../models/AccountInfo.model";
import { tile } from "../../services/container.svc";

export interface ISearchFooterState extends IBaseComponentStateModel {
  actionSheetOpen: boolean;
  componentModel: ListComponentModel;
}

export interface ISearchFooterProps extends IBasePropsModel {
  accountInfo: AccountInfoModel;
  loading: boolean;
  CreditTotalAmount: number;
  DebitsTotalAmount: number;
  AvgAmount: number;
  NoResults: boolean;
}

class SearchFooter extends React.Component<ISearchFooterProps, ISearchFooterState> {


  constructor(props: any) {
    super(props);
    this.state = { componentModel: props.componentModel, loading: props.loading, inError: false, actionSheetOpen: false };
  }

  handleActionSheet = () => this.setState({ actionSheetOpen: true });

  handleCancel = () => this.setState({ actionSheetOpen: false });

  exportCSV = (a: any) => {
    this.download("csv");
  };
  exportExcel = () => {
    this.download("excel");
  };
  exportPdf = () => {
    this.download("pdf");
  };
  exportQFX = () => {
    this.download("qfx");
  };
  exportQBO = () => {
    this.download("qbo");
  };

  download = (type: string) => {
    let mimeType: string = "";
    let extension: string = "";
    switch (type) {
      case "csv":
        mimeType = "text/csv";
        extension = "csv";
        break;
      case "pdf":
        mimeType = "application/pdf";
        extension = "pdf";
        break;
      case "excel":
        mimeType = "application/vnd.ms-excel";
        extension = "xlsx";
        break;
      case "qfx":
        mimeType = "application/x-qfx";
        extension = "qfx";
        break;
      case "qbo":
        mimeType = "application/vdn.intu.qbo";
        extension = "qbo";
        break;
    }

    const accountInfo = this.props.accountInfo;
    // Use actualBalance, fallback on availableBalance
    const balance = accountInfo.actualBalance ? accountInfo.actualBalance : accountInfo.balance;
    const accountId = accountInfo.coreAccountId ? accountInfo.coreAccountId : accountInfo.accountId;

    const params = {
      exportType: type,
      balance: balance.replace(",", ""),
      accountType: accountInfo.accountType,
      routingNumber: accountInfo.routingNumber,
      accountId
    }

    // @ts-ignore
    container.connectors.sendFileRequest(tile.tileConfig.Config.connectorInfo.connectorName, tile.tileConfig.Config.connectorInfo.connectorVersion, "download", params, mimeType, "SearchResults." + extension, (x: any) => {
      console.log(x);
    });
  };

  dollarify = (price: any) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  actionSheet = () => {
    if (this.hasValidIntuitType()) {
      return  (
        <ActionSheet id="actionExport" key="ofxexportAction" isOpen={this.state.actionSheetOpen} isCancelable={false} title="Select a format to export">
            <ActionSheetButton onClick={this.exportCSV}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>csv</ActionSheetButton>
            <ActionSheetButton onClick={this.exportExcel}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>excel</ActionSheetButton>
            <ActionSheetButton onClick={this.exportPdf}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>pdf</ActionSheetButton>
            <ActionSheetButton onClick={this.exportQFX}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>qfx</ActionSheetButton>
            <ActionSheetButton onClick={this.exportQBO}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>qbo</ActionSheetButton>
            <ActionSheetButton onClick={this.handleCancel}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>Close</ActionSheetButton>
          </ActionSheet>
      )
    } else {
      return (
        <ActionSheet id="actionExport" key="exportAction" isOpen={this.state.actionSheetOpen} isCancelable={false} title="Select a format to export">
            <ActionSheetButton onClick={this.exportCSV}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>csv</ActionSheetButton>
            <ActionSheetButton onClick={this.exportExcel}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>excel</ActionSheetButton>
            <ActionSheetButton onClick={this.exportPdf}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>pdf</ActionSheetButton>
            <ActionSheetButton onClick={this.handleCancel}
              // @ts-ignore
              tabIndex={0}
              role="button"
              onKeyPress={handleKeyPress}>Close</ActionSheetButton>
          </ActionSheet>
      )
    }
  }

  hasValidIntuitType = () => {
    const type = this.props.accountInfo?.accountType?.toLowerCase();
    return type === "checking" || type === "savings" || type === "moneymrkt" || type === "creditline";
  }

  componentDidUpdate(prevProps: IBasePropsModel, prevState: ISearchFooterState, snapshot: any) {
 
    if (this.state.loading !== this.props.loading){
        this.setState({ loading: this.props.loading });
    }
  }


  render() {
     if (this.props.NoResults){
      return (<></>)
    }
    else {
      return (
        <div id="search-footer" className="row">
          <div className="column">
            <div>Credit Total:</div>
            <div className="dollar-total">{this.dollarify(this.props.CreditTotalAmount)}</div>
          </div>
          <div className="column divider"/>
          <div className="column">
            <div>Debits Total:</div>
            <div className="dollar-total">{this.dollarify(this.props.DebitsTotalAmount)}</div>
          </div>
          <div className="column divider"/>
          <div className="column">
            <div>Average:</div>
            <div className="dollar-total">{this.dollarify(this.props.AvgAmount)}</div>
          </div>

         <Button onClick={this.handleActionSheet}
            // @ts-ignore
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex={0}>
            <Icon icon="fa-file-download"/>
          </Button>
          {this.actionSheet()}
        </div>
      );
    }
  }
}

export default SearchFooter;
