import React, { Component } from 'react';
import { Page, Icon } from 'react-onsenui';
import IBasePropsModel from '../models/base/BaseProps.model';
import IBaseStateModel from '../models/base/BaseState.model';

export default class ErrorPage extends Component<IBasePropsModel, IBaseStateModel> {
  
  constructor(props: IBasePropsModel){
    super(props);
    this.state = {
      componentModel: {}
    };
  }
  


  render() {
    
    return (
      <Page key="ErrorPage" id="ErrorPage">
        <div id="errorPageContainer" onClick={this.refresh}>
          <div id="errorMsg">
            <span>Oops! Something went wrong.</span>
            <br />
            <br />
            <span>Tap to refresh</span>
            <br />
            <br />
            <Icon icon={{ default: "fa-refresh" }}> </Icon>
          </div>
        </div>
      </Page>
    );
  }

  refresh = () => {
   
    window.location.reload();
  }
}
