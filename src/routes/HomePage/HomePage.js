import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Results from '../../components/Results/Results'
import './HomePage.css'
import ServerApiService from '../../services/server-api-service';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            error: '',
            analyzedPhoto: '',
            emotion: {},
        }
    }
    onTakePhoto(dataUri) {
        this.setState({photo: dataUri})
    }
    //sets current key to the clicked photo and renders the image on main display
    onClickPhoto(imgKey) {
        this.setState({current: Number(imgKey)})
    }
    deletePhoto() {
        this.setState({
            photo: '',
            error: '',
        })

    }
    analyzePhoto() {
        const photoData = this.state.photo
        const body = JSON.stringify({img: photoData})
    
        ServerApiService.convertPhotoToEmotion(body)
            .then(res => {
                if (res.error) {
                    this.setState({error: res.error.message})
                } else {
                    this.setState({
                        error: '',
                        emotion: res.faceAttributes.emotion,
                        analyzedPhoto: res.url
                    })
                }
            })
    }
    //either display webcam or the photo that was taken
    renderPhotoDisplay() {
        const photo = this.state.photo
        return !photo ?
            <Camera
                onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                />
            :
            <div className='current-img'>
                <div className='hidden'/>
                <img
                    width={768}
                    src={photo}
                    alt='current'/>
                <button className='analyze-img' onClick={() => this.analyzePhoto()}>Analyze</button>
                <button className='delete-img' onClick={() => this.deletePhoto()}>Delete</button>
            </div>
    }
    renderView() {
        return Object.keys(this.state.emotion).length > 0 ?
            <Results 
                emotion={this.state.emotion} 
                photo={this.state.analyzedPhoto}/>
            :
            <div className="camera">
                {this.renderPhotoDisplay()}
            </div>
    }
    render() {
        return (
            <section className='camera-page'>
                {this.renderView()}
            </section>
            
        )
    }
}

export default HomePage