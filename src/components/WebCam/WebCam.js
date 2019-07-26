import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Photolist from './PhotoList/PhotoList';
import Results from './Results/Results'
import './WebCam.css'
import ServerApiService from '../../services/server-api-service';

class WebCam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: {0: 'https://image.flaticon.com/icons/svg/32/32339.svg'},
            current: 0,
            count: 0,
            error: '',
            emotion: {}
        }
    }
    onTakePhoto(dataUri) {
        const photos = this.state.photos
        const count = this.state.count + 1
        photos[count] = dataUri
        this.setState({photos, count})
    }
    //sets current key to the clicked photo and renders the image on main display
    onClickPhoto(imgKey) {
        this.setState({current: Number(imgKey)})
    }
    deletePhoto() {
        const photos = this.state.photos
        const current = this.state.current
        delete photos[current]
        this.setState({
            current: 0,
            photos
        })

    }
    analyzePhoto() {
        const current = this.state.current
        const photoData = this.state.photos[current]
        const body = JSON.stringify({img: photoData})
    
        ServerApiService.convertPhotoToEmotion(body)
            .then(res => {
                if (res.error) {
                    this.setState({error: res.error})
                } else {
                    this.setState({emotion: res['faceAttributes']['emotion']})
                }
            })
    }
    //if current is 0, render camera; else display clicked image
    renderPhotoDisplay() {
        const currentDisplay = this.state.current
        const photo = this.state.photos[currentDisplay]
        return !currentDisplay ?
            <Camera
                onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                idealResolution={{width: 640, height: 480}}/>
            :
            <div className='current-img'>
                <img
                    width={768}
                    src={photo}
                    alt='current'/>
                <button className='analyze-img' onClick={() => this.analyzePhoto()}>Analyze</button>
                <button className='delete-img' onClick={() => this.deletePhoto()}>Delete</button>
            </div>
    }
    renderEmotionResults() {
        if (Object.entries(this.state.emotion).length) {
            return <Results emotion={this.state.emotion}/>
        }
    }
    render() {
        return (
            <div className="camera">
                {this.renderPhotoDisplay()}
                <Photolist 
                    width={768}
                    photos={this.state.photos}
                    handleClick={(imgKey) => this.onClickPhoto(imgKey)}/>
                {this.renderEmotionResults()}
            </div>
        )
    }
}

export default WebCam