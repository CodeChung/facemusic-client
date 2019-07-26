import React from 'react';

class Photolist extends React.Component {
    // might want to move this up later
    render() {
        //Map over object of data uris (key == index; value == img uri)
        const photos = Object.entries(this.props.photos).map((imgData) => {
            const index = imgData[0]
            const uri = imgData[1]
            return <img 
                key={index} 
                src={uri} 
                alt={`pic-${index}`} 
                width={80} 
                height={60}
                onClick={()=> {
                    this.props.handleClick(index)}}/>
        })
        return (
            <div className="photo-carousel">
                {photos}
            </div>
        )
    }
}

export default Photolist;