import React from "react";
import Form from 'react-bootstrap/Form'

class NewPost extends React.Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div>
                <form onSubmit={this.props.createNewPost} encType='multipart/form'>
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
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default NewPost

