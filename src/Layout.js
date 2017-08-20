import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';

import './Layout.css';

import {TopMenu} from './TopMenu';

class Layout extends Component {
    render() {
        if (this.props.data.loading) {
            return (
                <div className="loading"><p>Loading...</p></div>
            );
        } else {
            return (
                <div>
                    <TopMenu
                        info={this.props.data.info}
                        loggedInResident={this.props.data.loggedInResident}
                        loggedInStateChanged={this.props.data.refetch}
                    />
                </div>
            );
        }
    }
}

const infoQuery = gql`
{
    info {
        name
    }
    loggedInResident {
        name
    }
}
`;

export default graphql(infoQuery)(Layout);