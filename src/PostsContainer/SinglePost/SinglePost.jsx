const SinglePost = (props) => {
    return (
        <div id='single-post'>
            <h3>{props.post.title}</h3>
            <img height={200} src={props.post.img}></img>
            <h6>{props.post.description}</h6>
            <p>Category: {props.post.pet_category}</p>
            <p>Location: {props.post.location}</p>
            <p>Created by: {props.post.user}</p>
            <p>Cretated at: {props.post.created_at}</p>
        </div>
    )
}

export default SinglePost