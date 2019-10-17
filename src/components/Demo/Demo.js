import React from 'react';
import { Redirect } from 'react-router-dom';
import Donut from '../../components/Donut/Donut';
import './Demo.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ServerApiService from '../../services/server-api-service';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';

const emotionsData = {
    anger: "0",
    contempt: "0.000",
    disgust: "0.000",
    fear: "0",
    happiness: "0.0",
    neutral: 1,
    sadness: "0.0",
    surprise: "0",
}

class Demo extends React.Component { 
    state = {
        html: `Take a picture on the left, then analyze.
        <br/>
        <br/>
        You can write here, by the way. `,
        entry: {},
        redirect: false,
        photo: '',
        loading: false,
        emotion: emotionsData,
        analyzedPhoto: '',
        url: 'https://open.spotify.com/embed/track/6QAOd9yhzUrer1shQvPANO',
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
        this.setState({ loading: true })
        const photoData = this.state.photo
        const body = JSON.stringify({img: photoData})
        ServerApiService.convertPhotoToEmotion(body)
            .then(res => {
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
                    analyzedPhoto: res.url,
                })
                ServerApiService.getDemoRecommendations(emotion)
                    .then(result => {
                        const url = result[0].url ? result[0].url.replace('track', 'embed/track') : 'https://open.spotify.com/embed/track/2BY5fNHmpjV797ByjLX4I7'
                        this.setState({
                            tracks: result,
                            error: '',
                            emotion,
                            analyzedPhoto: res.url,
                            loading: false,
                            url,
                        })
                    })
                })
            .catch(res => {
                this.setState({ error: res.error, loading: false })
            })
    }
    render() {
        let { emotion, redirect, loading, photo, url } = this.state
        url = !loading ? url : 'https://open.spotify.com/embed/track/1hsNqMXibIbjGQEgOzWwKW'
        const camera = photo.length ? (
            <div className='demo-photo'>
                <img
                width={768}
                src={photo}
                alt='current'/>
                <button className='analyze-img' onClick={() => this.analyzePhoto()}>Analyze</button>
                <button className='delete-img' onClick={() => this.deletePhoto()}>Delete</button>
            </div>
        ) : (
            <div className='demo-camera'>
                <Camera 
                    onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                />
            </div>
        )
        if (redirect) {
            return <Redirect to='/' />
        }
        return (
            <section className='demo-page'>
                <div className='entry'>
                    <div className='entry-face'>
                        <h2>
                            {moment(new Date()).format('MMM DD, YYYY')}
                        </h2>
                        {camera}
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"><span className='tooltiptext-left'>It analyzes the emotions featured on your face and returns music that reflects how you feel.</span></iframe>
                    </div>
                    <div className='entry-graph'>
                        <div className='donut'>
                            <h3>Emotional Analysis</h3>
                            <Donut emotions={emotion}/>
                        </div>
                        <div className='entry-notes'>
                            <h3>Notes:</h3>
                            <ContentEditable
                                innerRef={this.contentEditable}
                                html={this.state.html}
                                disabled={false}      
                                onChange={this.handleChange} 
                                tagName='article' 
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Demo;