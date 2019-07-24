import React from 'react';

class Artist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button_visible: false
        }
    }
    render() {
        const {name, id, img, message, handleClick} = this.props
        return (
            <div className='search-artist'
                onMouseEnter={() => this.setState({button_visible: true})}
                onMouseLeave={() => this.setState({button_visible: false})}
                onClick={() => handleClick()}
                >
                <div className='search-img'>
                    <img src={img} alt='artist' width={200} height={200}/>
                    {this.state.button_visible && <button>{message}</button>}
                </div>
                
                <h4>{name}</h4>
            </div>
        )
    }
}

export default Artist;