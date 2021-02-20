import React, {useState, useEffect} from 'react'
import { publicService } from './../util/public.service';

function PostTile(props) {
    const [image, setImage] = useState();
    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        try {
            const { data } = await publicService.post('/pexelimages/', {pexelID: props.postImage});
            setImage(data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="card mt-2">
            <div className="card-header" id="cardHeader">
            <h2>{props.postTitle}</h2>
            </div>
            <div className="card-body">
            {image && <img src={image.src.medium} className="d-block w-100" />}
            </div>
        </div>
    )
}

export default PostTile