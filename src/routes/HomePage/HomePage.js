import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Results from '../../components/Results/Results'
import './HomePage.css'
import ServerApiService from '../../services/server-api-service';
import { MoonLoader } from 'react-spinners';
import Entry from '../../components/Entry/Entry';
import AppContext from '../../AppContext';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            error: '',
            analyzedPhoto: '',
            emotion: {},
            entry: {},
            artistSeeds: [],
            trackSeeds: [],
            artists: [],
            tracks: [],
            loaded: false
        }
    }
    componentDidMount() {
        ServerApiService.getSavedSeeds()
          .then(res => {
            const { tracks, artists } = res
            this.setState({ tracks, artists, loaded: true })
          })
    }
    onTakePhoto(dataUri) {
        this.setState({photo: dataUri})
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
                    const emotionData = res.faceAttributes.emotion
                    const neutralVal = emotionData.neutral
                    const emotion = {}
                    for (const [key, val] of Object.entries(emotionData)) {
                        if (key !== 'neutral') {
                            emotion[key] = val / (1 - neutralVal)
                        }
                    }
                    this.setState({
                        error: '',
                        emotion,
                        analyzedPhoto: res.url
                    })
                }
            })
    }
    //either display webcam or the photo that was taken
    renderPhotoDisplay() {
        const { artists, tracks } = this.state
        const photo = this.state.photo
        if (artists.length === 0 && tracks.length === 0) {
            return <div className='warning'><h3>Please add seeds in Preferences tab before starting</h3></div>
        } else {
            return !photo ?
            <div className='photo-booth'>
                <Camera
                onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                />
            </div>
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
    }
    renderView(context) {
        if (Object.keys({}) > 0) {
            return <Entry />
        } else {
            return Object.keys(this.state.emotion).length > 0 ?
            <Results 
                emotion={this.state.emotion} 
                photo={this.state.analyzedPhoto}
                />
            :
            <div className="camera">
                <h2>Today's Mood</h2>
                {this.renderPhotoDisplay()}
            </div>
        }
    }
    render() {
        const context = this.context
        if (!this.state.loaded) {
            return (
                <section className='spinner'>
                    <MoonLoader />
                </section>
            )
        }
        return (
            <section className='camera-page'>
                {this.renderView(context)}
            </section>
            
        )
    }
}

HomePage.contextType = AppContext

export default HomePage