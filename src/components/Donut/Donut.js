import React from 'react'
import { Doughnut } from 'react-chartjs-2'

class Donut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: {
                anger: '#FF6833',
                contempt: '#B313C6',
                disgust: '#17DF1A',
                fear: '#FF2D9F',
                happiness: '#29FFFC',
                neutral: '#A8A8A8',
                sadness: '#337DFF',
                surprise: '#D3FF0E'
            },
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }],
            }
        }
    }
    componentDidUpdate() {
        const emotions = this.props.emotions
        for (const [key, value] of Object.entries(emotions)) {
            const data = this.state.data
            const capitalizedWord = key[0].toUpperCase() + key.slice(1)
            if (parseFloat(value) > 0) {
                data.labels.push(capitalizedWord)
                data.datasets[0].data.push(parseFloat(value))
                data.datasets[0].backgroundColor.push(this.state.colors[key])
                data.datasets[0].hoverBackgroundColor.push(this.state.colors[key])
            }
        }
    }
    render() {
        const options = {
            // maintainAspectRatio: true,
            // responsive: true,
            legend: {
                position: 'bottom'
            }
        }
        return (
            <Doughnut 
                data={this.state.data}
                options={options}
                />
        )
    }
}

export default Donut