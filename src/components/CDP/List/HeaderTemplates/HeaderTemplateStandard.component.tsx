import React, { Component } from "react";
import { ListHeader } from "react-onsenui";

export interface IHeaderTemplateStandardProps {
    key: string;
    id: string;
    className: string;
}

class HeaderTemplateStandard extends Component<IHeaderTemplateStandardProps, any> {
    render() {
        return (
            <ListHeader
                key={this.props.id}
                className={this.props.className}>
                {this.props.children}
            </ListHeader>
        )
    }
}

export default HeaderTemplateStandard;