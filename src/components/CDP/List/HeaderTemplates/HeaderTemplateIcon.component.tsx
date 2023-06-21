import React, { Component } from "react";
import { ListHeader, Icon } from "react-onsenui";
import ListModel from '../../../../models/CDP/Lists/List.model';

export interface IHeaderTemplateIconProps {
    key: string;
    id: string;
    className: string;
    item: ListModel;
    methods?: any;
}

class HeaderTemplateIcon extends Component<IHeaderTemplateIconProps, any> {
    render() {
        return (
            <ListHeader
                key={this.props.id}
                className={this.props.className}>
                {this.props.item.headerTitle}
                <span
                    onClick={() => this.props.methods.toggleTempListItem(this.props.item.headerTitle, true)}
                >
                    <Icon className="header-icon" icon={this.props.item.headerIconClass} />
                </span>
            </ListHeader>
        )
    }
}

export default HeaderTemplateIcon;