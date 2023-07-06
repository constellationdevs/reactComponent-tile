import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import SearchModel from "../models/CDP/search/Search.model";
import IBasePageStateModel from "../models/CDP/baseStates/IBasePageState.model";
import ListComponentModel from "../models/CDP/Lists/ListComponent.model";
import React, { Component } from "react";
import { getTileString, GoToErrorPage, ProcessCDPComponent } from "../services/helper.svc";
import PillModel from "../models/CDP/search/Pill.model";
import { Button, Icon, List, ListItem, Page, SearchInput } from "react-onsenui";
import ListComponent from "../components/CDP/List/List.component";
import SearchFilters from "../components/Search/SearchFilters.component";
import _ from "lodash";
import container from "../services/container.svc";
import ContainerResponse from "../models/CDP/ContainerResponse.model";
import SearchFilterButtonModel from "../models/CDP/search/SearchFilterButton.model";
import { SearchDataModel } from "../models/CDP/search/SearchData.model";
import FilterTypes from "../models/CDP/search/FilterTypes.enums";
import FilterListItemModel from "../models/CDP/search/FilterListItem.model";
import { handleKeyPress } from "../services/accessibility.svc";

export interface ISearchProps extends IBasePropsModel {
    componentModel: SearchModel;
}

export interface ISearchState extends IBasePageStateModel {
    componentModel: SearchModel;
    ListModel: ListComponentModel;
    showFilterSelector: boolean;
    allFilters: PillModel[];
    loading: boolean;
    freeText: string;
    showFilters: boolean;
    filterObject: any;
    searchText: string;
}

class SearchPage extends Component<ISearchProps, ISearchState> {
    public filterButtons: SearchFilterButtonModel[] = [];
    private pageClass = "desktop";
    private placeholderSearch: any = { placeholder: getTileString("100111") };

    constructor(props: ISearchProps) {
        super(props);
        const filterObject = {
            dateBefore: "",
            dateAfter: "",
            category: [],
            switchFilter: [],
            amountGreaterThan: "",
            amountLessThan: "",
            radioFilter: ""
        }

        this.state = {
            componentModel: this.props.componentModel,
            ListModel: new ListComponentModel(),
            openToast: false,
            toastMsg: "",
            showFilterSelector: false,
            allFilters: [],
            filterObject,
            loading: false,
            freeText: "",
            showFilters: false,
            searchText: ""
        };

        this.clearSearchText = this.clearSearchText.bind(this);
        this.handleFreeTextChange = this.handleFreeTextChange.bind(this);
    }

    componentDidMount() {
        this.pageInit();
    }

    closeModal = () => {
       this.setState({showFilters: false});
    }

    clearFilters = () => {
        const filterObject = {
            dateBefore: "",
            dateAfter: "",
            switchFilter: [],
            amountGreaterThan: "",
            amountLessThan: "",
            radioFilter: ""
        }
        
        this.setState({filterObject});
        this.getFilterPills(filterObject);
        this.closeModal();
    }

    handleFreeTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ freeText: e.currentTarget.value }, () => {
            if(e.currentTarget.value === "") {
                this.search();
            }
        });
    };

    clearSearchText() {
        console.log("text cleared")
        this.setState({ freeText: "" }, () => {
          this.search();
        });
      }

    getFilterPills(filterObject: any) {
        const newFilterPills: PillModel[] = [];
        const filterKeys = Object.keys(filterObject);
        filterKeys.forEach((key, idx) => {
            switch(key) {
                case "dateBefore":
                    if (filterObject[key] !== "") {
                        newFilterPills.push({
                            id: "dateBefore",
                            keyName: "dateBefore",
                            keyValue: filterObject[key],
                            pillText: "Before: " + filterObject[key],
                            active: true,
                            parentID: "dateBefore"
                        });
                    }
                    break;

                case "dateAfter":
                    if (filterObject[key] !== "") {
                        newFilterPills.push({
                            id: "dateAfter",
                            keyName: "dateAfter",
                            keyValue: filterObject[key],
                            pillText: "After: " + filterObject[key],
                            active: true,
                            parentID: "dateAfter"
                        });
                    }
                    break;

                case "radioFilter":
                    if (filterObject[key] !== "") {
                        newFilterPills.push({
                        id: "radioFilter",
                        keyName: "radioFilter",
                        keyValue: filterObject[key],
                        pillText: filterObject[key] === "true" ? getTileString("100134") : getTileString("100135"),
                        active: true,
                        parentID: "radioFilter"
                        });
                    }
                    break;

                case "category":
                    if (filterObject[key]?.length) {
                        newFilterPills.push({
                        id: "category",
                        keyName: "category",
                        keyValue: filterObject[key],
                        pillText: filterObject[key],
                        active: true,
                        parentID: "category"
                        });
                    }
                    break;

                case "switchFilter":
                    if (filterObject[key] !== undefined && filterObject[key].length !== 0) {
                        filterObject[key].forEach((item: any) => {
                            newFilterPills.push({
                                id: "switchFilter",
                                keyName: "switchFilter",
                                keyValue: item.value,
                                pillText: "Switch: " + item.display,
                                active: true,
                                // @ts-ignore
                                parentID: this.filterButtons.find(
                                    (p: SearchFilterButtonModel) => p.keyName === key
                                ).id
                            });
                        });
                    }
                    break;

                case "amountGreaterThan":
                    if (filterObject[key] !== "") {
                        newFilterPills.push({
                            id: "amountGreaterThan",
                            keyName: "amountGreaterThan",
                            keyValue: filterObject[key],
                            pillText: "> $" + filterObject[key],
                            active: true,
                            parentID: "amountGreaterThan"
                        });
                    }
                    break;

                case "amountLessThan":
                    if (filterObject[key] !== "") {
                        newFilterPills.push({
                            id: "amountLessThan",
                            keyName: "amountLessThan",
                            keyValue: filterObject[key],
                            pillText: "< $" + filterObject[key],
                            active: true,
                            parentID: "amountLessThan"
                        });
                    }
                    break;
            }
        });

        this.setState({allFilters: newFilterPills},
            () => this.processFilter(newFilterPills));
    }

    renderPills() {
        const pills = this.state.allFilters.map((pill: PillModel, idx: number) => {
            let pillClass = "btnPill";
            if (pill.active) {
                pillClass += " active";
            }

            return (
                <>
                    <Button className={pillClass} 
                    // @ts-ignore
                    onKeyPress={handleKeyPress} onClick={() => this.removePill(pill)}>
                        {pill.pillText}
                        <span className="fa-stack">
                            <Icon
                                // @ts-ignore;
                                role="button"
                                className="remove-pill background fa-stack-1x"
                                icon="fa-circle"/>
                            <Icon
                                // @ts-ignore;
                                tabindex={0}
                                role="button"
                                onKeyPress={handleKeyPress}
                                className="remove-pill fa-stack-1x"
                                icon="fa-times-circle"/>
                        </span>
                    </Button>
                </>
            );
        });

        setTimeout(() => {
            // lower the search list to accommodate the pill container
            const searchList = document.getElementById("search-results");
            const searchHero = document.getElementById("SearchHeroContainer");

            if (searchList && searchHero) {
                searchList.style.top = searchHero.offsetHeight.toString() + "px";
            }
        }, 0);

        return pills.length > 0 ? <div id="pillContainer">{pills}</div> : <></>;
    }

    removePill(item: PillModel) {
        const filters: PillModel[] = this.state.allFilters;
        let newFilters: PillModel[];

        // eslint-disable-next-line prefer-const
        newFilters = filters.filter((x: PillModel) => {
            if (x.parentID !== item.parentID) {
                return x;
            } else {
                return x.keyValue !== item.keyValue;
            }
        });

        // find the related filter btn
        const filterButton = this.filterButtons.find(
            (x) => x.keyName === item.keyName
        );

        if (filterButton) {
            // delete from filterObject
            if (filterButton.keyName === "switchFilter") {
                const removeIndex = this.state.filterObject[filterButton.keyName].map((filter: any) => filter.value).indexOf(item.keyValue);
                (removeIndex >= 0) && this.state.filterObject[filterButton.keyName].splice(removeIndex, 1);
            } else {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.filterObject[filterButton.keyName] = "";
            }

            // delete from filterButtons
            delete filterButton.value;
            if (filterButton.filterType === FilterTypes.List) {
                const listItem:
                    | FilterListItemModel
                    | undefined = filterButton.filterTemplateItems.find(
                    (x: FilterListItemModel) => x.id === item.id
                );
                if (listItem) {
                    listItem.selected = false;
                }
            }
        }

        this.setState({ allFilters: newFilters },
            () => this.processFilter(newFilters));
    }

    updateSelectedFilterButtons(selectedFilters: PillModel[]) {
        this.filterButtons.forEach((btn: SearchFilterButtonModel, idx: number) => {
            if (selectedFilters.length === 0) {
                btn.selected = false;
            } else {
                const find = selectedFilters.find(
                    (x: PillModel) => x.parentID === btn.id
                );
                if (find) {
                    btn.selected = true;
                } else {
                    btn.selected = false;
                }
            }

            btn.refresh = true;
        });
    }

    processFilter(selectedFilters: PillModel[]) {
        this.updateSelectedFilterButtons(selectedFilters);

        if (selectedFilters.length > 0) {
            this.pageClass += " activeFilter";
        } else {
            this.pageClass = this.pageClass.replace("activeFilter", "");
        }

        this.setState({ loading: true });
        const params: any = {
            searchText: this.state.searchText
        };

        const multiParams: string[] = [];

        this.state.allFilters.forEach((filter: PillModel, idx: number) => {
            // check if this a multi value param
            const find = this.filterButtons.find(
                (p: SearchFilterButtonModel) => p.id === filter.parentID && p.multi
            );

            if (find) {
                multiParams.push(filter.parentID);
            } else {
                params[filter.keyName] = filter.keyValue;
            }
        });

        // do we have multi params to add
        if (multiParams.length > 0) {
            const parents = _.uniq(multiParams);

            parents.forEach((parent: string) => {
                const filter = this.filterButtons.find(
                    (p: SearchFilterButtonModel) => p.id === parent
                );

                const filterValues = this.state.allFilters
                    .filter((v: PillModel) => v.parentID === parent)
                    .map((pill: PillModel) => {
                        return pill.keyValue;
                    });

                params[filter!.keyName] = filterValues;
            });
        }

        const dataSource = this.state.ListModel.dataSource;
        dataSource.params = Object.assign(dataSource.params, { "filterParams": JSON.stringify(params) });
        if (dataSource !== undefined || !_.isEmpty(dataSource)) {
            container.tile.ui.showSpinner(getTileString(100108));
            container.connectors.sendRequest(
                dataSource.connectorName,
                dataSource.connectorVersion,
                dataSource.connectorMethod,
                dataSource.params,
                (response: ContainerResponse) => {
                    if (response.success) {
                        const listData: ListComponentModel = this.state.ListModel;
                        listData.data.results = response.data.results;
                        this.setState({ loading: false, ListModel: listData });
                        container.tile.ui.hideSpinner();
                    } else {
                        this.setState({ loading: false });
                    }
                }
            );
        }
    }

    applyFilters = (filterObject: any) => {
        this.getFilterPills(filterObject);
        this.setState({ filterObject });
    };

    search() {
        this.setState({ searchText: this.state.freeText }, () => {
          this.processFilter(this.state.allFilters);
        });
      }

    render() {
        return (
            <Page key="SearchPage"
                  id="SearchPage"
                  className={this.pageClass + " cdp_page_container"}>
                <div className={"cdp_page_container " + (this.state.showFilters ? "filter-open" : "")}>
                    <div id="SearchHeroContainer">
                        <List key={"searchHero"}
                              id="search-container"
                              className="search-container"
                              dataSource={[1]}
                              renderRow={() => (
                                  <ListItem className="search-toolbar">
                                      <div className="center">
                                          <SearchInput
                                              id="txtSearch"
                                              key="txtSearch"
                                              onChange={this.handleFreeTextChange}
                                              {...this.placeholderSearch}
                                              value={this.state.freeText}
                                          />
                                          {this.state.freeText !== "" && <span
                                              className="remove-search-text fa-stack"
                                          >
                                            <Icon
                                                className="remove-search-text-icon background fa-stack-1x"
                                                icon="fa-circle"
                                                // @ts-ignore
                                                onKeyPress={this.clearSearchText}
                                                onClick={this.clearSearchText}
                                            />
                                            <Icon
                                                className="remove-search-text-icon fa-stack-1x"
                                                icon="fa-times-circle"
                                                // @ts-ignore
                                                onKeyPress={this.clearSearchText}
                                                onClick={this.clearSearchText}
                                                tabIndex={0}
                                            />
                                          </span>}
                                      </div>
                                      <div className="right">
                                          <Button className="search-button" 
                                            // @ts-ignore
                                            onKeyPress={handleKeyPress}
                                            disabled={this.state.freeText !== "" ? false : true}
                                            tabIndex={0}
                                            onClick={() => this.search()}>{getTileString("100114")}
                                            </Button>
                                          <Button className={`filter-button${this.state.allFilters.length ? " active" : ""}`}
                                            // @ts-ignore
                                            tabIndex={0} 
                                            onClick={() => this.setState({showFilters: !this.state.showFilters})}>
                                            <Icon icon="md-filter-list"></Icon>
                                          </Button>
                                      </div>
                                  </ListItem>
                              )}
                        />
                        {this.renderPills()}
                    </div>
                        {this.state.showFilters ?
                         <div id="filters" className="filter-container">
                            <SearchFilters
                             filterObject={this.state.filterObject}
                             filters={this.filterButtons}
                             clearFilters={this.clearFilters}
                             applyFilters={this.applyFilters}
                             closeModal={this.closeModal}
                             navigator={this.props.navigator}
                            ></SearchFilters>
                         </div>
                         : ""}
                         <div className={this.state.showFilters ? "filter-mask" : ""}></div>
                    <div className="cdp_list_container" id={"search-results"}>
                        <ListComponent
                            componentModel={this.state.ListModel}
                            navigator={this.props.navigator}
                            pageID="SearchPage"
                            heroID="SearchHeroContainer"
                        />
                    </div>
                </div>
            </Page>
        );
    }

    private pageInit() {
        ProcessCDPComponent(this.state.componentModel).then(
            model => {
                if (!model.data.list) {
                    if (model.data.results !== undefined &&
                        model.data.filters !== undefined) {
                        // create the ListModel needed for the shared list component
                        const listModel: ListComponentModel = new ListComponentModel();
                        listModel.data.results = model.data.results;

                        listModel.dataSource = this.state.componentModel.dataSource;
                        this.setState({ ListModel: listModel });

                        if(model.data.filters){
                        const dataModel: SearchDataModel = new SearchDataModel();

                        // create the searchFilterButtonModel
                        dataModel.filters = model.data.filters.map(
                        (x: SearchFilterButtonModel) => {
                            return new SearchFilterButtonModel(x);
                        }
            );
                                    this.filterButtons = dataModel.filters;
                        }


                    } else {
                        // something went wrong, show error page
                        console.log("something is wrong");
                        GoToErrorPage(this.props.navigator);
                    }
                } else {
                    this.setState({ ListModel: model.data.list });
                }
            },
            () => {
                console.log("********************request failed***************");
                // something went wrong show error page
                GoToErrorPage(this.props.navigator);
            }
        );
    }
}

export default SearchPage;
