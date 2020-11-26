import React from 'react';
import api from '../util/api';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    signup = () => {
        const { email, password, name } = this.state;
        console.log(email);
        console.log(password);
        console.log(name);

        const payload = { email: email, password: password, name: name}
        console.log(payload);
        api.signupUser(payload).then(res => {
            console.log('signed up!');
        })

    }


    render() {
        return (
            <div>
                <h3> type in email </h3> 
                <input type="text" placeholder="enter email" value={this.state.email} name="email" onChange={this.handleChange}></input>
                <h3> type in password </h3> 
                <input type="text" placeholder="enter password" value={this.state.password} name="password" onChange={this.handleChange}></input>
                <h3> type in name </h3> 
                <input type="text" placeholder="enter name" value={this.state.name} name="name" onChange={this.handleChange}></input>
                <button onClick={this.signup}> signup </button>
            </div>
        );
    }
}

export default Signup;
