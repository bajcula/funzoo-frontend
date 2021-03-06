import React from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "@mui/material";

class NewPost extends React.Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className="new-post-div">
                <form className="new-post-form purple" onSubmit={this.props.createNewPost} encType='multipart/form'>
                    <div className="form-row">
                        <label htmlFor="title">Title:</label>
                        <input onChange={this.props.handleNewPostChange} name="title"></input>
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">Description:</label>
                        <input onChange={this.props.handleNewPostChange} name="description"></input>
                    </div>
                    <div className="form-row">
                        <label htmlFor="img">Image:</label>
                        <input id="img-file" type="file" placeholder="upload-image" accept="image/png, image/jpeg, image/jpg" onChange={this.props.handleImageChange} required name="img"></input>
                    </div>
                    <div className="form-row-category">
                            <label htmlFor="pet_category">Category:</label>
                            {['dog', 'cat', 'other'].map((option) => (
                                <div key={`inline-radio-div-${option}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        onClick={this.props.handleRadioButtons}
                                        label={option}
                                        name='name'
                                        type={"radio"}
                                        id={`${option}`}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="form-row">
                        <label htmlFor="location">Location:</label>
                        <input onChange={this.props.handleNewPostChange} name="location"></input>
                    </div>
                    <Button id="close-btn" className="glow-on-hover" onClick={this.props.toggleNewPostForm}>CANCEL</Button>
                    <Button className="glow-on-hover" id='submit-new-btn' type="submit">SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default NewPost

