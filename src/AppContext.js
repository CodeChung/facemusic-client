import React from 'react';

const AppContext = 
React.createContext({
    user_id: 0,
    updateUserId: () => {},
})

export default AppContext