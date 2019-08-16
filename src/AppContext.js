import React from 'react';

const AppContext = 
React.createContext({
    entry: {},
    setEntry: () => {},
    rerender: () => {}
})

export default AppContext