import React from 'react';

class Photolist extends React.Component {
    // might want to move this up later
    onClick(imgUri) {
        const imgBody = {imgUri}
        fetch("localhost:8000/api/photos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: imgBody
        })
    }
    render() {
        const photos = this.props.photos.map((img, index) => {
            return <img key={index} src={img} alt={`pic-${index}`} width={80} onClick={(img)=> this.onClick(img)}/>
        })
        return (
            <div className="photo-carousel">
                {photos}
            </div>
        )
    }
}

export default Photolist;