import React from 'react'
import AppContext from '../../../AppContext'
import ServerApiService from '../../../services/server-api-service'

class SavedVibes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artists: [],
            tracks: [],
        }
    }
    //should i move this to app's state and pass through context
    componentDidMount() {
        const { artists, tracks } = this.context
        this.setState({artists, tracks})
    }
    render() {
        console.log(this.context)
        return (
            <section className='saved-vibes'>
                <div className='artists'>
                    <h2>Artists</h2>
                    {this.state.artists}
                </div>
                <div className='tracks'>
                    <h2>Tracks</h2>
                    {this.state.tracks}
                </div>
            </section>
        )
    }
}

export default SavedVibes
SavedVibes.contextType = AppContext