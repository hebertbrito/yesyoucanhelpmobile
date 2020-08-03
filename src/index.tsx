import React from 'react'
import { View, Text } from 'react-native'

//import the navigation
import DrawNavigation from './navigation/drawnavigation'

class App extends React.Component {
    constructor(props: any) {
        super(props);

    }

    render(){
        return(
            <DrawNavigation />
        )
    }

}

export default App;