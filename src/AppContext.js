import React from 'react';

const AppContext = 
React.createContext({
    user_id: 0,
    updateUserId: () => {},
    artists: [],
    tracks: [],
})

export default AppContext