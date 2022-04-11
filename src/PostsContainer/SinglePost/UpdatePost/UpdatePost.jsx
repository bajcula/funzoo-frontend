import Form from 'react-bootstrap/Form'

const UpdatePost = (props) => {
    console.log(props)
    return (
        <div>
            <form onSubmit={(e)=>{e.preventDefault(); props.updatePost(props.updatedPost.id)}}>
                <div className="form-row">
                    <label htmlFor="title">Title:</label>
                    <input onChange={props.handleUpdatePostChange} name="title" value={props.updatedPost.title}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="description">Description:</label>
                    <input onChange={props.handleUpdatePostChange} name="description" value={props.updatedPost.description}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="img">Image:</label>
                    <input onChange={props.handleUpdatePostChange} name="img"></input>
                </div>
                <div className="form-row-category">
                        <label htmlFor="pet_category">Category:</label>
                        {['dog', 'cat', 'other'].map((option) => (
                            <div key={`inline-radio-div-${option}`} className="mb-3">
                                <Form.Check
                                    // {...props.updatedPost.pet_category === option && checked?
                                    // checked
                                    // :
                                    // <></>
                                    // }
                                    
                                    inline
                                    onClick={props.handleRadioButtons}
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
                    <input onChange={props.handleUpdatePostChange} name="location" value={props.updatedPost.location}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="user">User</label>
                    <input onChange={props.handleUpdatePostChange} name="user" value={props.updatedPost.user}></input>
                </div>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default UpdatePost