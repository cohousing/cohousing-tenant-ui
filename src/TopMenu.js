import React, {Component} from "react";
import {AppBar, Dialog, FlatButton, TextField} from "material-ui";
import axios from 'axios';

class LogInComponent extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleLogin = () => {
        axios.post('http://tenant1.cohousing.nu:3000/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            this.props.loggedInStateChanged();
            this.handleClose();
        });
    };

    handleUsername = (event) => {
        this.setState({username: event.target.value})
    };

    handlePassword = (event) => {
        this.setState({password: event.target.value})
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Log in"
                primary={true}
                onClick={this.handleLogin}
            />,
        ];

        return (
            <div>
                <FlatButton style={this.props.style} label="Log in" onClick={this.handleOpen}/>
                <Dialog
                    title="Login with username and password"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        floatingLabelText="Username"
                        fullWidth={true}
                        onChange={this.handleUsername}
                    />
                    <br/>
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                        onChange={this.handlePassword}
                    />
                </Dialog>
            </div>
        )
    }
}

class RightButtonBar extends Component {
    static muiName = 'FlatButton';

    render() {
        let {loggedInResident} = this.props;

        if (loggedInResident) {
            return (
                <div>
                    <FlatButton style={this.props.style} label={loggedInResident.name}/>
                </div>
            );
        } else {
            return (
                <LogInComponent {...this.props} />
            );
        }
    }
}

export class TopMenu extends Component {
    render() {
        return (
            <AppBar
                title={this.props.info.name}
                iconElementRight={<RightButtonBar
                    loggedInResident={this.props.loggedInResident}
                    loggedInStateChanged={this.props.loggedInStateChanged}
                />}
            />
        );
    }
}
