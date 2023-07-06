import React, { Component } from "react";
import { ListItem } from "react-onsenui";
import CurrencyInput from 'react-currency-input-field';
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import { handleKeyPress } from "../../services/accessibility.svc";

export interface IAmountFilterProps extends IBasePropsModel {
    row: any;
    idx: number;
    addFilter: any;
    amount: string;
    borderClass: string;
}

export class AmountFilter extends Component<IAmountFilterProps,any> {
    public myInput: any;

    constructor(props:IAmountFilterProps) {
        super(props);
        this.state = {
            amount: this.props.amount,
            focus: ""
        }
    }

    handleAmountChange(value: string, amountFilter: string) {
        this.setState({amount: value})
        if (value) this.props.addFilter(value, amountFilter);
    }

    addFocus(id: string) {
        console.log("Focus: ", id);
        this.state.focus !== id && this.setState({focus: id});
    }
        

    render() {
        const focusClass = this.state.focus === `${this.props.row.inputID}` ? "focus":"";
        const activeClass = this.state.amount?"active":"";

        return(
        <ListItem className={this.props.borderClass} key={this.props.row.keyName + ` - ${this.props.row.idx}`}>
          <div className={"left " + focusClass}>
            {this.props.row.labelText}
          </div>
          <div className={`right` }>
              <CurrencyInput
                className={`text-input currency-input ${activeClass} ${focusClass}`}
                placeholder={"$0.00"}
                prefix="$"
                value={this.state.amount}
                allowNegativeValue={false}
                decimalScale={2}
                disableAbbreviations={true}
                step={.01}
                onBlur={() => this.setState({focus: ""})}
                onFocus={(e) => {this.addFocus(`${this.props.row.inputID}`)}}
                // @ts-ignore
                onKeyPress={handleKeyPress}
                onValueChange={(value: string) => this.handleAmountChange(value, this.props.row.keyName)} />
          </div>
        </ListItem>
        )
    }
}

export default AmountFilter;