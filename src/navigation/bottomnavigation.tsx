import * as React from 'react';
import { View } from 'react-native'
import { Text, BottomNavigation, useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import translate from '../services/translate/translate'

const Tab = createMaterialBottomTabNavigator();

const MusicRoute = () => <View><Text>MusicRoute</Text></View>;

const AlbumsRoute = () => <View><Text>AlbumsRoute</Text></View>;

const RecentsRoute = () => <View><Text>RecentsRoute</Text></View>;
const coco = () => <View><Text>coco</Text></View>;

function BottomNavigator() {

    const paperTheme = useTheme();


    return (

        <Tab.Navigator
            initialRouteName="MusicRoute"
            activeColor="#fafafa"
            inactiveColor="#424242"
            labeled={true}
            shifting={true}
        >
            <Tab.Screen
                name="MusicRoute"
                component={MusicRoute}
                options={{
                    tabBarLabel: `${translate('home_menu')}`,
                    tabBarColor: '#A85008',

                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="AlbumsRoute"
                component={AlbumsRoute}
                options={{
                    tabBarLabel: `${translate('ask_contribution_menu')}`,
                    tabBarColor: '#ef6c00',
                    tabBarIcon: ({ color }) => (
                        <Icon name="hand-holding" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="RecentsRoute"
                component={RecentsRoute}
                options={{
                    tabBarLabel: `${translate('maps_menu')}`,
                    tabBarColor: '#914100',
                    tabBarIcon: ({ color }) => (
                        <Icon name="map-marker-alt" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}

export default BottomNavigator;