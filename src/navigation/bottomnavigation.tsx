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
            activeColor="#fafafa"
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
                    tabBarColor: '#A85008',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="AskContributionScreen"
                // children={ () => { return (<ProfileScreen theme={paperTheme} {...props}/>) } }
                component={AskContributionScreen}
                options={{
                    tabBarLabel: `${translate('ask_contribution_menu')}`,
                    tabBarColor: '#ef6c00',
                    tabBarIcon: ({ color }) => (
                        <Icon name="hand-holding" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="HouseLessScreen"
                component={HouseLessScreen}
                options={{
                    tabBarLabel: `${translate('inform_houseless')}`,
                    tabBarColor: '#b53d00',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-injured" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="ContributionScreen"
                component={OrderScreen}
                options={{
                    tabBarLabel: `${translate('contribution_menu')}`,
                    tabBarColor: '#914100',
                    tabBarIcon: ({ color }) => (
                        <Icon name="hands-helping" color={paperTheme.colors.text} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}

export default BottomNavigator;