import React from 'react';
import ServerApiService from '../../services/server-api-service';

class Calendar extends React.Component {
    componentDidMount() {
        ServerApiService.getEntries()
            .then(res => console.log(res))
    }
    render() {
        return (
            <div>Calendar</div>
        )
    }
}

export default Calendar;