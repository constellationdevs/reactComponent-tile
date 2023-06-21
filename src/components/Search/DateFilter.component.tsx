import React, { Component } from "react";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import {Button, ListItem} from "react-onsenui";
import { getTileString, isNativeApp } from "../../services/helper.svc";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import { getMaxDate } from "../../services/date.svc";
import moment from "moment";
import { tile } from "../../services/container.svc";

export interface IDateFilterProps extends IBasePropsModel {
    row: any;
    idx: number;
    dateFilter: string;
    addFilter: any;
    date: string;
    borderClass: string;
}

export class DateFilter extends Component<IDateFilterProps,any> {
    public myInput: any;

    datepickerInput: any;
    

    constructor(props:IDateFilterProps) {
        super(props);
        this.state = {
            date: this.props.date,
            focus: ""
        }
        this.calendarClose = this.calendarClose.bind(this);
        this.datepickerFocus = this.datepickerFocus.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

        /* get the date value for filtering */
    processDateChange(date: any, dateFilter: string) {
        if (date !== null) {
          this.myInput.value = moment(date).format("MM/DD/YYYY");
          this.setState({date: this.myInput?.value})
          this.props.addFilter(this.myInput?.value, dateFilter);
          }
      }

      addFocus(id: string) {
        console.log("Focus: ", id);
        this.state.focus !== id && this.setState({focus: id});
    }

    handleTab(event: any) {
         if (event.key === "Tab" || event.code === "Tab") {
           if (event.shiftKey && !document.querySelector(".react-datepicker-popper:focus-within")) {
             this.setState({datepickerOpen: false});
           } else if (event.target.matches("[class^='react-datepicker']")) {
             this.myInput.focus();
             this.setState({datepickerOpen: false});
           } else {
             // @ts-ignore;
             !isNativeApp() && document.querySelector(".react-datepicker__day[tabindex='0']")?.focus();
           }
        }
       }

      calendarClose() {
        this.datepickerInput?.focus();
          }
        
      datepickerFocus(event: any) {
            this.datepickerInput = event.target;
            this.setState({datepickerOpen: true});
            event.target.readOnly = isNativeApp();
          }

    renderDateBtn(displayDate:string){
        const activeClass = this.state.date? "active" : ""
        const focusClass = (this.state.focus === `${this.props.row.inputID}` ? "focus" : "")
        return(
            <Button className={`customDateBtn filter ${focusClass} ${activeClass}`}>{displayDate}</Button>
        )
    }

    render() {
        const activeClass = this.state.date? "active" : ""
        const dateDisplay = this.state.date ? this.state.date : "MM/DD/YYYY"; 

        return(
        <ListItem className={this.props.borderClass} key={this.props.row.keyName + ` - ${this.props.row.idx}`}>
          <div className={"left " + (this.state.focus === `${this.props.row.inputID}` ? "focus":"")}>
            {this.props.row.keyName === "dateAfter" ? getTileString("100113") : getTileString("100112")}
          </div>
          <div className="right">
              <DatePicker
                value={this.state.date}
                customInput={isNativeApp()?this.renderDateBtn(dateDisplay): <input className={activeClass} type="text" />}
                dateFormat="MM/dd/yyyy"
                onChange={(date: any) => this.processDateChange(date, this.props.dateFilter)}
                calendarClassName={"cdp-calendar"}
                ref={(c:any) => this.myInput = c}
                adjustDateOnChange={true}
                className="search-input"
                placeholderText="MM/DD/YYYY"
                showYearDropdown={true}
                showMonthDropdown={true}
                scrollableYearDropdown={true}
                onKeyDown={(e:any) => this.handleTab(e)}
                maxDate={getMaxDate(tile.tileConfig)}
                dropdownMode={"select"}
                withPortal={isNativeApp()}
                onBlur={() => this.setState({focus: ""})}
                // @ts-ignore
                tabIndex={0}
                onCalendarClose={this.calendarClose}
                onFocus={(e:any) => {this.addFocus(`${this.props.row.inputID}`); this.datepickerFocus(e); e.target.readOnly = isNativeApp()}}
                popperPlacement="top"
                //@ts-ignore
                popperContainer={({ children }) => {
                  return ReactDOM.createPortal(children, document.body);
                }}
              /> 
          </div>
        </ListItem>
        )
    }
}

export default DateFilter;