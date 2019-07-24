import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button_visible: false
        }
    }
    render() {
        const {name, id, img, artist, album, handleClick} = this.props
        return (
            <div className='search-track'
                onMouseEnter={() => this.setState({button_visible: true})}
                onMouseLeave={() => this.setState({button_visible: false})}
                onClick={() => handleClick()}
                >
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