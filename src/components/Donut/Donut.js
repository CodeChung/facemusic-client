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
        }
    }
    getData() {
        // QUESTION ASK why cant i setstate in componentdidmount? but it works in entry.js????
        //convert emotions data into format that doughnut specifies
        const emotions = this.props.emotions
        const labels = []
        const data = []
        const backgroundColor = []
        const hoverBackgroundColor = []
    
        for (const [key, value] of Object.entries(emotions)) {
            const capitalizedWord = key[0].toUpperCase() + key.slice(1)
            if (parseFloat(value) > 0) {
                labels.push(capitalizedWord)
                data.push(parseFloat(value))
                backgroundColor.push(this.state.colors[key])
                hoverBackgroundColor.push(this.state.colors[key])
            }
        }
        const datasets = [{
            data,
            backgroundColor,
            hoverBackgroundColor
        }]
        const graphData = {
            labels,
            datasets
        }
        return graphData
       
    }
    render() {
        return (
            <div>
                <Doughnut
                    data={this.getData()}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        legend: {
                            position: 'bottom'
                        }
                      }}
                    />
            </div>
        )
    }
}

export default Donut