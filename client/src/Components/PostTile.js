import React, {useState, useEffect} from 'react'
import { createClient } from 'pexels';

function PostTile(props) {
    const client = createClient('563492ad6f91700001000001b9a332f548444ba4b34f7a37e76b75ba');
    const [image, setImage] = useState();
    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        try {
            const data = await client.photos.show({ id: props.postImage })
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