import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charityName: "",
            charityDescr: "",
        };

        this.handleCharityName = this.handleCharityName.bind(this);        
        this.handleCharityDescription = this.handleCharityDescription.bind(this);
    }

    handleCharityName(e) {
        this.setState({charityName: e.target.value});
    }

    handleCharityDescription(e) {
        this.setState({charityDescr: e.target.value});
    }

    handleChange(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "//api.cchange.ga/charity.edit",
            contentType: 'application/json',
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
        var isCharity = false;
        var info = document.cookie;
        info = info.split(";");
        var token = info[0].substring(7,);
        var name = info[1].substring(7,);
        if(info[2] != null) {
            isCharity = true;
            var cname = info[2].substring(7,);
            var cdesc = info[3].substring(7,);
        }

        if(isCharity) {
            return(
                <div className="user">
                    <p>Welcome back {name}!</p>
                    <p>Your charity is {cname}</p>
                    <p>{cdesc}</p>
                    <p>Edit your charity's description below</p>
                    <form onSubmit={this.handleChange}>
                        <input type="text" id="changeNameID" placeholder="Edit your charity's name" 
                            value={this.state.charityName} onChange={this.handleCharityName}/>
                        <input type="text" id="changeDescID" placeholder="Edit your charity's description" 
                            value={this.state.charityDescr} onChange={this.handleCharityDescription}/>
                        <input type="submit" value="Update info"/>
                    </form>
                </div>
            );
        }

        else {
            return(
                <div className="user">
                    <p>Welcome back {name}!</p>
                    <p>You have a regular account</p>
                </div>
            );         
        }

    }
}