import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import App from '../App';
import {getLoginState} from '../Login/GetLoginState';
import Login from './Login';
import Logout from './Logout';

export default class Layout extends React.Component {
    static displayName = Layout.name;

    //componentDidMount(){
        //this.setState ({
        //    userLoggedIn: getLoginState()
        //})
    //}

    render () {
        const RenderFunc = () => {
            if(!getLoginState()){
                return (
                    <div>
                        <h1>Login here!</h1>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                        <Route path="/Login" component={Login}></Route>
                    </div>
                )
            } else {
                return (
                    <div>
                        <ul>
                            <li><Link to="/Game">Dual-n-Back</Link></li>
                            <li><Link to="/Logout">Logout</Link></li>
                        </ul>
                        <Route path="/Game" component={App}></Route>
                        <Route path="/Logout" component={Logout}></Route>
                    </div>
                )
            }
        }

        return (
            <div>
                {RenderFunc()}
            </div>
        )
    }
}