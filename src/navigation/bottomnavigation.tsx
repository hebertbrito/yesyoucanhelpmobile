import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button, View, Text } from 'react-native';


const Tab = createMaterialBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home - Bottom Navigation</Text>
        </View>
    );
}


class BottomNavigation extends React.Component {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
        )
    }

}

export default BottomNavigation;