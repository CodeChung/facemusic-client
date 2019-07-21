import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Photolist from './PhotoList/PhotoList';

class WebCam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
        }
    }
    onTakePhoto(dataUri) {
        const photos = this.state.photos
        photos.push(dataUri)
        this.setState({photos})
    }
    render() {
        return (
            <div className="Camera">
                <Camera
                    onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                    idealResolution={{width: 640, height: 480}}
                />
                <Photolist photos={this.state.photos}/>
            </div>
        )
    }
}

export default WebCam