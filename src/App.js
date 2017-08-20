import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

import Layout from "./Layout";

const networkInterface = createNetworkInterface({
    uri: 'http://tenant1.cohousing.nu:3000/graphql',
});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token');
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
    }
}]);
const apolloClient = new ApolloClient({
    networkInterface,
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <MuiThemeProvider>
                    <Layout/>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;
