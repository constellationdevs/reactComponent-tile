import React, { Component } from "react";
import SearchFilterButton from "../../models/CDP/search/SearchFilterButton.model";
import FilterTypes from "../../models/CDP/search/FilterTypes.enums";
import FilterBtnNumber from "./FilterButtons/BtnNumber.component";
import FilterBtnCalendar from "./FilterButtons/BtnCalendar.component";
import FilterBtnList from "./FilterButtons/BtnList.compnent";

export interface ISearchBarProps {
  filterClick: any;
  filters: SearchFilterButton[];
}

export interface ISearchBarState {
  loading: boolean;
}

class SearchBar extends Component<ISearchBarProps, ISearchBarState> {
  btnFilters: SearchFilterButton[] = [];

  state = {
    loading: true
  };

  render() {
    const filterBtns = this.btnFilters.map((item: SearchFilterButton, idx: number) => {
      const itemKey = "btnFilter" + idx;
      switch (item.filterType) {
        case FilterTypes.List:
          return <FilterBtnList btn={item} filterClick={this.clickMe} key={itemKey}></FilterBtnList>;
        case FilterTypes.Number:
          return <FilterBtnNumber btn={item} filterClick={this.clickMe} key={itemKey}></FilterBtnNumber>;
        case FilterTypes.Date:
          return <FilterBtnCalendar btn={item} filterClick={this.clickMe} key={itemKey}></FilterBtnCalendar>;
        default:
          return <></>;
      }
    });

    return <div id="filterBarContainer">{filterBtns}</div>;
  }

  componentDidUpdate() {
    console.log("bar did update******");
    console.log(this.props.filters);
    if (this.state.loading) {
      this.btnFilters = this.props.filters;
      this.setState({ loading: false });
    }
  }

  clickMe = (item: any) => {
    console.log("clickMe click");
    this.props.filterClick(item);
  }
}

export default SearchBar;
