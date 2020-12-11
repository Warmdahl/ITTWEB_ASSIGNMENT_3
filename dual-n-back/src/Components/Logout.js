import * as React from 'react';

export default class Logout extends React.Component {

    componentDidMount() {
        localStorage.clear();
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <h1>You are logged out</h1>
            </div>
        )
    }
}