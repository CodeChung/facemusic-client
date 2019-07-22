import React from 'react';

class Artist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button_visible: false
        }
    }
    saveArtist(name, id, img) {
        const artist = {
            name,
            id,
            img,
            // change this when implementing logins
            user_id: 1,
        }
        console.log(artist)
    }
    render() {
        const {name, id, picture} = this.props
        const img = picture.length > 0 ? picture[0].url : 'https://www.placecage.com/280/280'
        return (
            <div className='search-artist'
                onMouseEnter={() => this.setState({button_visible: true})}
                onMouseLeave={() => this.setState({button_visible: false})}
                onClick={() => this.saveArtist(name, id, img)}
                >
                <div className='search-img'>
                    <img src={img} alt='artist' width={200} height={200}/>
                    {this.state.button_visible && <button>Add Vibe</button>}
                </div>
                
                <h4>{name}</h4>
            </div>
        )
    }
}

export default Artist;