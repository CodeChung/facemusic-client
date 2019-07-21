import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button_visible: false
        }
    }
    render() {
        const {name, id, picture, artist, album} = this.props
        const img = picture.length > 0 ? picture[0].url : 'https://www.placecage.com/300/300'
        return (
            <div className='search-track'
                onMouseEnter={() => this.setState({button_visible: true})}
                onMouseLeave={() => this.setState({button_visible: false})}>
                <div className='search-img'>
                    <img src={img} alt='track' width={200} height={200}/>
                    {this.state.button_visible && <button>Add Vibe</button>}
                </div>
                
                <h4>{name}</h4>
                <p>{artist} • {album}</p>
            </div>
        )
    }
}

export default Track