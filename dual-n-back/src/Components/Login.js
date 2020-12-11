import * as React from 'react';
import { getLoginState } from '../Login/GetLoginState';


//Inspiration taken from I4PRJ_V2_Gruppe3 (F2020)
//https://github.com/Warmdahl/I4PRJ_V2/blob/master/RCCS/RCCS/ClientApp/src/components/LogIn.js
export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            Loading: true,
            username: null,
            password: null,
            Error: false,
            token: null,
            //UserLoggedIn: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({[name]: val});
    }

    async handleLogin(event) {

        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        }
        let userStringified = JSON.stringify(user);

        const that = this;
        //insert User login API post here pls!
        fetch('http://localhost:8080/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userStringified
        }).then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    console.log("jwt: " + data);
                    localStorage.setItem("jwt", data);
                    //that.setState({
                    //    UserLoggedIn: true // not used in this scenario
                    //});
                    window.location.reload(false)

                })
            } else {
                alert("Error in username or password, HTTP error: " + response.status);
                that.setState({
                    Error: true
                });
            }
        })
        return user;
    }

    render() {
        const RenderFunc = () => {
            if(getLoginState()) {
                return <h1>You are logged in</h1>
            } else {
                return (
                    <form onSubmit={this.handleLogin}>
                        <label>
                            Username:
                            <input type="text" name='username' value={this.state.username || ""}
                                onChange={this.handleChange}/>
                        </label>
                        <label>
                            Password: 
                            <input type="password" name='password' value={this.state.password || ""}
                                onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Login"/>
                    </form>
                );
            }
            //if(UserLoggedIn != false){
            //    <Route path="/"></Route>
            //}
        }

        return (
            <div>
                {RenderFunc()}
            </div>
        );
    }
}