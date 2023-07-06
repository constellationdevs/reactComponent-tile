import React, { Component, createRef } from "react";
import Chart from "chart.js";
import { config } from "../../utils/chartConfig";
import { Button, Icon } from "react-onsenui";
import HeroModel from "../../models/Hero.model";
import _ from "lodash";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import BaseState from "../../models/CDP/baseStates/IBaseState.model";
import { BtnComponentModel } from "../../models/CDP/BtnComponent.model";
import { ProcessMetaAction, ProcessCDPComponent } from "../../services/helper.svc";
import { handleKeyPress } from "../../services/accessibility.svc";

export interface IHeroState extends BaseState {
  componentModel: HeroModel;
  loading: boolean;
  inError: boolean;
}

class HeroGraph extends Component<IBasePropsModel, IHeroState> {
  heroModel: HeroModel;
  chartRef: any = createRef();

  state = {
    componentModel: this.props.componentModel,
    loading: true,
    inError: false
  };

  componentDidUpdate() {
    if (this.state.loading && !this.state.inError) {
      this.componentInit().then(() => {
        const myChartRef = this.chartRef.current.getContext("2d");
        // @ts-ignore
        new Chart(myChartRef, config);
      });
    }
  }

  handleOpen = (metaAction: any) => {
    ProcessMetaAction(metaAction, this.props.navigator);
  }

  // component loader
  loaderPlaceholder = () => {
    return (
      <div className="cdp_hero loading" id="CommHeroContainer">
        <header>
          <div>
            <div className="left">
              <div className="cdp_header">Loading...</div>
              <div className="cdp_callout">Loading...</div>
            </div>
            <div className="right settingsContainer">
              <div className="cdpIconButton round-img-small"></div>
            </div>
          </div>
        </header>
        <section className="body">
          <div className="round-img"></div>
        </section>
        <footer className="primaryActions">
          <Button></Button>
        </footer>
      </div>
    );
  }

  // component structure
  render() {
    console.log("hero render");
    console.log(this.heroModel);
    if (this.state.loading) {
      return this.loaderPlaceholder();
    } else {
      console.log(this.heroModel.data.primaryActions);
      return (
        <div className="cdp_hero" id="DashboardHeroContainer">
          <header>
            <div>
              <div className="left">
                <div className="cdp_header">{this.heroModel.data.heading}</div>
                <div className="cdp_callout">
                  {this.heroModel.data.headerCallOut}
                </div>
              </div>
              <div className="right settingsContainer">
                <div className="cdpIconButton">
                  <span
                    // @ts-ignore
                    role="button"
                    onKeyPress={handleKeyPress}
                    tabIndex={0}
                    onClick={() =>
                      this.handleOpen(
                        this.heroModel.data.btnSetting.metaAction
                      )
                    }
                  >
                    <Icon
                      icon={{
                        default: this.heroModel.data.btnSetting.iconClass
                      }}
                      key={this.heroModel.data.btnSetting.componentID}
                      id={this.heroModel.data.btnSetting.componentID}
                    />
                  </span>
                </div>
              </div>
            </div>
          </header>
          <section className="body">
            <div>
              <Icon icon={this.heroModel.data.iconClass} />
              <span> {this.heroModel.data.bodyCallOut}</span>
            </div>
            <div>
              <canvas
                id="canvas"
                ref={this.chartRef}
                style={{
                  display: "block",
                  height: "250px",
                  width: "100%",
                  maxHeight: "30%"
                }}
                className="chartjs-render-monitor"
              ></canvas>
            </div>
          </section>
          <footer className="primaryActions">
            {this.heroModel.data.primaryActions.data.map(
              (item: BtnComponentModel, idx: number) => {
                return (
                  <Button
                    // @ts-ignore
                    role="button"
                    onKeyPress={handleKeyPress}
                    tabIndex={0}
                    key={idx}
                    className="primaryBtn"
                    modifier="large"
                    onClick={() => this.handleOpen(item.metaAction)}
                  >
                    {item.label}
                  </Button>
                );
              }
            )}
          </footer>
        </div>
      );
    }
  }

  // process the CDP component model
  componentInit = () => {
    const promise = new Promise<void>((resolve, reject) => {
      ProcessCDPComponent(this.props.componentModel).then(
        data => {
          this.heroModel = data;
          this.setState({ loading: false });
          resolve();
        },
        () => {
          console.log("**Hero ERROR**");
          this.setState({ inError: true });
          reject();
        }
      );
    });
    return promise;
  }
}

export default HeroGraph;
