import * as React from 'react';
import { View } from 'react-native'
import { Text, BottomNavigation, useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator, MaterialBottomTabView } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import translate from '../services/translate/translate'

//screens
import HomeScreen from '../pages/homescreen'
import OrderScreen from '../pages/orderscreen'
import HouseLessScreen from '../pages/houselessscreen'
import AskContributionScreen from '../pages/askcontributionscreen'

const Tab = createMaterialBottomTabNavigator();

function BottomNavigator({ ...props }) {

    const paperTheme = useTheme();


    return (

        <Tab.Navigator
            initialRouteName="HomeScreen"
            activeColor="#ef6c00"
            inactiveColor="#424242"
            labeled={true}
            shifting={true}
            backBehavior="history"
            keyboardHidesNavigationBar={true}
            sceneAnimationEnabled={true}

        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}

                options={{
                    tabBarLabel: `${translate('home_menu')}`,
                    tabBarColor: '#1a237e',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color='#ef6c00' size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="AskContributionScreen"
                // children={ () => { return (<ProfileScreen theme={paperTheme} {...props}/>) } }
                component={AskContributionScreen}
                options={{
                    tabBarLabel: `${translate('ask_contribution_menu')}`,
                    tabBarColor: '#251F3D',
                    tabBarIcon: ({ color }) => (
                        <Icon name="hand-holding" color='#ef6c00' size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="HouseLessScreen"
                component={HouseLessScreen}
                options={{
                    tabBarLabel: `${translate('inform_houseless')}`,
                    tabBarColor: '#004d40',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-injured" color='#ef6c00' size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="ContributionScreen"
                component={OrderScreen}
                options={{
                    tabBarLabel: `${translate('contribution_menu')}`,
                    tabBarColor: '#7D7240',
                    tabBarIcon: ({ color }) => (
                        <Icon name="hands-helping" color='#ef6c00' size={20} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}

export default BottomNavigator;