import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import PropTypes from 'prop-types';

const CLOUDINARY_UPLOAD_PRESET = 'kajpdwj4';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/cchange/image/upload';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            name: "",
            charityName: "",
            charityDescr: "",
            isCharity: false,
            uploadedURL: "",
            uploadedFileCloudinaryUrl: null,
        };

        this.handleCharityName = this.handleCharityName.bind(this);        
        this.handleCharityDescription = this.handleCharityDescription.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * After the component is mounted, parse cookie strings and set the state
     */
    componentDidMount() {
        const info = document.cookie;
        const parse_info = info.split(";");
        this.setState({
            token : parse_info[0].substring(6,),
            name: parse_info[1].substring(7,)
        });

        //if charity information is returned from AJAX response
        if(parse_info[2] != null) { 
            this.setState({
                isCharity: true,
                charityName: parse_info[2].substring(7,),
                charityDescr: parse_info[3].substring(7,)
            });
        }
    }

    //3 handle functions that are only available to charity accounts
    /**
     * Update the state of 'charityName'
     * @param {*} e
     * @public 
     */
    handleCharityName(e) {
        this.setState({charityName: e.target.value});
    }

    /**
     * Update the state of 'charityDescr'
     * @param {*} e
     * @public 
     */
    handleCharityDescription(e) {
        this.setState({charityDescr: e.target.value});
    }

    /**
     * Waits for an image to be selected and updates the state of 'uploadedFile'
     * Once chosen, call handleImageUpload to upload the file
     * @param {*} files 
     * @public
     */
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        
        this.handleImageUpload(files[0]);
    }

    /**
     * Makes the post request to to the cloudinary server
     * Success: print upload information to console
     * Error: print error message to console
     * @param {*} file
     * @public 
     */
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
             .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
             .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
                $.ajax({
                    type: "POST",
                    url: "//api.cchange.ga/charity.logo",
                    contentType: 'application/json',
                    headers: { "Authorization":  this.state.token },
                    data: JSON.stringify({
                      'logo': this.state.uploadedFileCloudinaryUrl,
                    }),
                    success: function (data, status) {
                        console.log(data);
                    },
                    error: function(data, status) {
                        console.log(data.responseJSON.message);
                    }
                });
            }
        });
    }
    
    //AJAX POST request ran after submit button click
    //to update charity information on the server
    /**
     * On submit, make a POST request to the API to 
     * change the charity name and/or description
     * @param {*} e
     * @public 
     */
    handleChange (e) {
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
              //add jQuery to remove strings in text box after submit
            }
        });
    }

    render() {
        if(this.state.isCharity) {
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
                        <br/>
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*"
                            >
                            <div>Drop or select your files here</div>
                        </Dropzone>
                    </form>
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <img src={this.state.uploadedFileCloudinaryUrl} />
                                <p>{this.state.uploadedFileCloudinaryUrl}</p>
                            </div>}
                    </div>
                </div>
            );
        }

        else {
            return(
                <div className="user">
                    <p>Welcome {this.state.name}!</p>
                    <p>You have a regular account</p>
                    <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*"
                            >
                            <div>Drop or select your files here</div>
                    </Dropzone>
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <img src={this.state.uploadedFileCloudinaryUrl} />
                                <p>{this.state.uploadedFileCloudinaryUrl}</p>
                            </div>}
                    </div>
                </div>
            );         
        }

    }
}