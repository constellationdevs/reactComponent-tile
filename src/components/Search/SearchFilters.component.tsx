import React from "react";
import SearchFilterButton from "../../models/CDP/search/SearchFilterButton.model";
import { Button, List, ListHeader, ListItem, Navigator } from "react-onsenui";
import { getTileString, isNativeApp } from '../../services/helper.svc'
import DateFilter from "./DateFilter.component";
import AmountFilter from "./AmountFilter.component";
import SwitchFilter from './SwitchFilter.component';
import _ from "lodash";
import { handleKeyPress } from "../../services/accessibility.svc";
import RadioFilter from "./RadioFilter.component";
import CategoryFilter from "./CategoryFilter.component";
import FilterListItemModel from "../../models/CDP/search/FilterListItem.model";

export interface ISearchFilterProps {
  clearFilters: any;
  closeModal: any;
  applyFilters: any;
  filters: SearchFilterButton[];
  navigator: Navigator;
  filterObject: any;
}

export interface ISearchFilterState {
  loading: boolean;
  applyDisabled: boolean;
  filters: [];
  allFilters: [];
  switchFilter: [];
  amountGreaterThan: string;
  amountLessThan: string;
  dateBefore: string;
  dateAfter: string;
  radioFilter: string;
  category?: FilterListItemModel[];
  showDatePicker: boolean;
}

class SearchFilters extends React.Component<ISearchFilterProps, ISearchFilterState> {
  btnFilters: SearchFilterButton[] = [];
  filtersSortedByType: [];

  constructor(props: ISearchFilterProps) {
    super(props);
    const filter = _.cloneDeep(this.props.filterObject);

    this.state = {
      loading: true,
      applyDisabled: true,
      filters: [],
      allFilters: [],
      switchFilter: filter.switchFilter,
      amountGreaterThan: filter.amountGreaterThan,
      amountLessThan: filter.amountLessThan,
      dateBefore: filter.dateBefore,
      dateAfter: filter.dateAfter,
      radioFilter: filter.radioFilter === undefined ? "" : filter.radioFilter,
      category: filter.category,
      showDatePicker: false
    };

    this.clickMe = this.clickMe.bind(this);
    // this.btnFilters = this.props.filters;
  }

  sortFiltersByType = (filters: SearchFilterButton[]) => {
    const sortedFilters = [];
    const dateFilters = filters.filter((item: SearchFilterButton) => item.filterType === 3);
    const radioFilter = filters.filter((item: SearchFilterButton) => item.filterType === 4);;
    const amountFilters = filters.filter((item: SearchFilterButton) => item.filterType === 2);
    const categoryFilters = filters.filter((item: SearchFilterButton) => item.filterType === 5);
    const switchFilter = filters.filter((item: SearchFilterButton) => item.keyName === "switchFilter");
    sortedFilters.push(switchFilter);
    sortedFilters.push(amountFilters);
    sortedFilters.push(dateFilters);
    sortedFilters.push(radioFilter);
    sortedFilters.push(categoryFilters);
    return sortedFilters;
  }

  showDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker})
  }

  addFilter = (filter: any, filterType: string) => {
      if (filter !== null) {
        if(filterType === "dateBefore"){
          this.setState({dateBefore: filter, applyDisabled: false})
        } else if (filterType === "dateAfter"){
          this.setState({dateAfter: filter, applyDisabled: false})
        } else if (filterType === "radioFilter") {
          this.setState({radioFilter: filter, applyDisabled: false})
        } else if (filterType === "amountGreaterThan"){
          this.setState({amountGreaterThan: filter, applyDisabled: false})
        } else if (filterType === "amountLessThan"){
          this.setState({amountLessThan: filter, applyDisabled: false})
        } else if (filterType === "switchFilter"){
          this.setState({switchFilter: filter, applyDisabled: false})
        } else {
          if(filter?.[0]) {
            this.setState({category: filter, applyDisabled: false})
          } else {
            this.setState({category: [], applyDisabled: false})
          }
        }
      }
    }

    createFilterObject = () => {
      const returnedFilters = {
        switchFilter: this.state.switchFilter,
        dateBefore: this.state.dateBefore,
        dateAfter: this.state.dateAfter,
        radioFilter: this.state.radioFilter,
        amountGreaterThan: this.state.amountGreaterThan,
        amountLessThan: this.state.amountLessThan,
        category: this.state.category
    }
    return returnedFilters
  }

  applyFilter = ()=>{
    this.setState({applyDisabled: true},()=>{
      this.props.applyFilters(this.createFilterObject());
      this.props.closeModal()
    })
  };
  
  renderHeader = (keyName: string) => {
    let title = "";
    if(keyName === "switchFilter"){
      title = getTileString("100130")
    } else if(keyName.includes("date")){
      title = getTileString("100128")
    } else if (keyName.includes("radioFilter")) {
      title = getTileString("100118")
    } else if (keyName.includes("category")) {
      title = getTileString("100131")
    } else if (keyName.includes("amount")) {
      title = getTileString("100129")
    } else {
      title = getTileString("100127")
    }
    return(<ListHeader>{title}</ListHeader>)
  }

  renderRow = (row: any, index: number, borderClass: string, navigator: Navigator) => {
    
    switch (row.filterType) {
      case 1:
        return <SwitchFilter
          dataSource={row.filterTemplateItems}
          componentModel=""
          navigator={navigator}
          addFilter={this.addFilter}
          filters={this.state.switchFilter}
         />
      case 2:
        return <AmountFilter
          addFilter={this.addFilter}
          borderClass={borderClass}
          row={row}
          idx={index}
          amount={row.keyName === "amountGreaterThan" ? this.state.amountGreaterThan : this.state.amountLessThan}
          componentModel=""
          navigator={navigator}
          />
      case 3:
        return(
        <DateFilter row={row} 
          borderClass={borderClass}
          addFilter={this.addFilter}
          dateFilter={row.keyName === "dateBefore" ? "dateBefore" : "dateAfter"}
          componentModel=""
          navigator={navigator}
          idx={index}
          date={row.keyName === "dateBefore" ? this.state.dateBefore : this.state.dateAfter}
        />
      )
      case 4:
        return (
          <RadioFilter
            row={row}
            addFilter={this.addFilter}
            componentModel=""
            navigator={navigator}
            filter={this.state.radioFilter}
          />
        );

      case 5:
        return <CategoryFilter
          dataSource={row.filterTemplateItems}
          componentModel=""
          navigator={navigator}
          addFilter={this.addFilter}
          category={this.state.category}
          categoryFilter={row.keyName}
        />;
      default:
        return <ListItem></ListItem>;
    }
  };

  render() {
    const searchHero = document.getElementById("SearchHeroContainer");
    const filterContainerStyle = {top: "60px", height: 60};

    if(searchHero && !isNativeApp()){
      filterContainerStyle.top = searchHero.offsetHeight.toString() + "px",
      filterContainerStyle.height = document.body.clientHeight - searchHero.offsetHeight
    } else if (searchHero && isNativeApp()){
      filterContainerStyle.top = "0px"
      filterContainerStyle.height = document.body.clientHeight -1
    }

    return(

    <div id="filter-container" style={filterContainerStyle} 
      className={ isNativeApp() ? "filter-container-native" : "filter-container-desktop" }>
      <div className="header-container">
        <Button className="filter-header-button" 
        // @ts-ignore
        tabIndex={0}
        onKeyPress={handleKeyPress} onClick={() => this.props.closeModal()}>{getTileString("100107")}</Button>
        <span className="filter-header">{getTileString("100115")}</span>
        <Button 
        // @ts-ignore
        tabIndex={0}
        onKeyPress={handleKeyPress} className="filter-header-button" onClick={() => this.props.clearFilters()}>{getTileString("100116")}</Button>
      </div>
      <div className={"filter-body-container"}>
        {this.sortFiltersByType(this.props.filters).map((filter:SearchFilterButton[], index: number) => {
          return(
            <div key={`filter-type` + index}>
            <span className="filter-list-header"></span>
            <List id="filters" dataSource={filter} renderHeader={() => this.renderHeader(filter[0].keyName)} 
              renderRow={(row: SearchFilterButton, rowidx: number) => 
              this.renderRow(row, rowidx, !filter[0].keyName.includes("switch") && row === filter[0] ? "list-divider" : "", this.props.navigator)} />
            </div>
          )
        }
          )
        }
      </div>
      <div className="button-container">
        <Button className="apply-filter-button" 
          // @ts-ignore
          onKeyPress={handleKeyPress}
          tabIndex={0}
          disabled={this.state.applyDisabled}
          onClick={this.applyFilter}>{getTileString("100117")}
          </Button>
      </div>
    </div>
    )
  }

  componentDidUpdate() {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  clickMe(item: any) {
    // this.props.filterClick(item);
  }
}

export default SearchFilters;
