import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Profile from './profile';
import $ from 'jquery';

export default class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      name: "",
      campaignName: "",
      camapignDesc: "",
      charityName: "",
      charityDescr: "",
      isCharity: false
    };

    this.handleCampaignName = this.handleCampaignName.bind(this);
    this.handleCampaignDescription = this.handleCampaignDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
      const info = document.cookie;
      const parse_info = info.split(";");
      console.log(parse_info);
      this.setState({
          token : parse_info[0].substring(6,),
          name: parse_info[1].substring(7,)
      });

      if(parse_info[2] != null) {
          this.setState({
              isCharity: true,
              charityName: parse_info[2].substring(7,),
              charityDescr: parse_info[3].substring(7,)
          });
      }
    }

  handleCampaignName(e) {
    this.setState({campaignName: e.target.value});
  }

  handleCampaignDescription(e) {
    this.setState({campaignDesc: e.target.value});
  }

  handleChange (e) {
    e.preventDefault();
    console.log(this.state.campaignDesc);
    $.ajax({
      type: "POST",
      url: "//api.cchange.ga/campaign.create",
      contentType: 'application/json',
      headers: { "Authorization": this.state.token },
      data: JSON.stringify({
        'name': this.state.campaignName,
        'description': this.state.campaignDesc,
      }),
      success: function(data, status) {
        console.log(data);
        ReactDOM.render(<Profile/>, document.getElementById("root"));
      },
      error: function(data, status) {
        alert(data.responseJSON.message);
      }
    });
  }

  render() {
    if(this.state.isCharity) {
      return(
        <div className="createCampaign">
          <h1>Create a Charity Campaign</h1>
          <form onSubmit={this.handleChange}>
            <input type="text" id="changeNameID" placeholder="Edit your campaign name"
              onChange={this.handleCampaignName}/>
            <input type="text" id="changeDescID" placeholder="Edit your campaign description"
              onChange={this.handleCampaignDescription}/>
            <input type="submit" value="Create Campaign"/>
            <br/>
          </form>
        </div>
      );
    } else {
      return(
        <p>Hey, looks like you've navigated somewhere meant for charities. Navigate back
          <a href="cchange.ga">here</a> to continue.</p>
      );
    }
  }
}
