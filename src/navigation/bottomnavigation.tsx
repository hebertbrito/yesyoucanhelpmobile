import * as React from 'react';
import { View } from 'react-native'
import { Text, BottomNavigation, useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    NavigationContainer
} from '@react-navigation/native';

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
        >
            <Tab.Screen
                name="MusicRoute"
                component={MusicRoute}
                options={{
                    tabBarLabel: 'MusicRoute',
                    tabBarColor: '#ef6c00',
                    
                    tabBarIcon: ({ color }) => (
                        <Icon name="play" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="AlbumsRoute"
                component={AlbumsRoute}
                options={{
                    tabBarLabel: 'AlbumsRoute',
                    tabBarColor: '#A85008',
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="RecentsRoute"
                component={RecentsRoute}
                options={{
                    tabBarLabel: 'RecentsRoute',
                    tabBarColor: '#914100',
                    tabBarIcon: ({ color }) => (
                        <Icon name="heart" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="coco"
                component={coco}
                options={{
                    tabBarLabel: 'coco',
                    tabBarColor: '#B35000',
                    tabBarIcon: ({ color }) => (
                        <Icon name="trash" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}

export default BottomNavigator;