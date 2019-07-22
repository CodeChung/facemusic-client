import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Photolist from './PhotoList/PhotoList';

class WebCam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: {0: 'camera icon HERE'},
            current: 0,
            count: 0,
        }
    }
    onTakePhoto(dataUri) {
        const photos = this.state.photos
        const count = this.state.count + 1
        photos[count] = dataUri
        this.setState({photos, count})
    }
    onClickPicture(imgKey) {
        this.setState({current: Number(imgKey)})
    }
    //if current is 0, render camera; else return image with matching current id
    renderPhotoDisplay() {
        const currentDisplay = this.state.current
        const photo = this.state.photos[currentDisplay]
        console.log(photo)
        return !currentDisplay ?
            <Camera
                onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                idealResolution={{width: 640, height: 480}}/>
            :
            <img
                width={768} 
                // height={480}
                src={photo}
                alt='current'/>

    }
    render() {
        return (
            <div className="Camera">
                {this.renderPhotoDisplay()}
                <Photolist 
                    photos={this.state.photos}
                    handleClick={(imgKey) => this.onClickPicture(imgKey)}/>
            </div>
        )
    }
}

export default WebCam