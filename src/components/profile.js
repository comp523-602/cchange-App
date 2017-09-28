import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import $ from 'jquery';



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            name: "",
            charityName: "",
            charityDescr: "",
        };

        this.handleCharityName = this.handleCharityName.bind(this);
        this.handleCharityDescription = this.handleCharityDescription.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //3 handle functions that are only available to charity accounts
    handleCharityName(e) {
        this.setState({charityName: e.target.value});
    }

    handleCharityDescription(e) {
        this.setState({charityDescr: e.target.value});
    }

    //AJAX POST request ran after submit button click
    //to update charity information on the server
    handleChange(e) {
        e.preventDefault();
        console.log(this.state.token);

        $.ajax({
            type: "POST",
            url: "//api.cchange.ga/charity.edit",
            contentType: 'application/json',
            headers: { "Authorization":  this.state.token },
            data: JSON.stringify({
              'name': this.state.charityName,
              'description': this.state.charityDescr,
            }),
            success: function (data, status) {
              console.log(data);
            }
        });
    }

    render() {
        //cookies are created from the AJAX response
        //in the login/create account pages

        var isCharity = false;
        var info = document.cookie;
        info = info.split(";");
        this.state.token = info[0].substring(6,);
        this.state.name = info[1].substring(7,);

        //if charity information is returned from AJAX response
        if(info[2] != null) {
            isCharity = true;
            this.state.charityName = info[2].substring(7,);
            this.state.charityDescr = info[3].substring(7,);
        }

        if(isCharity) {
            return(
                <div className="user">
                    <p>Welcome back {this.state.name}!</p>
                    <p>Your charity is {this.state.charityName}</p>
                    <p>{this.state.charityDescr}</p>
                    <p>Edit your charity's description below</p>
                    <form onSubmit={this.handleChange}>
                        <input type="text" id="changeNameID" placeholder="Edit your charity's name"
                             onChange={this.handleCharityName}/>
                        <input type="text" id="changeDescID" placeholder="Edit your charity's description"
                             onChange={this.handleCharityDescription}/>
                        <input type="submit" value="Update info"/>
                    </form>
                </div>
            );
        }

        else {
            return(
                <div className="user">
                    <p>Welcome back {this.state.name}!</p>
                    <p>You have a regular account</p>
                </div>
            );
        }

    }
}
