import React, { } from 'react';
import { useTheme } from 'react-native-paper'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';

import LoginScreen from '../pages/loginscreen';
import RegisterUserScreen from '../pages/registerscreen'
import MapsScreen from '../pages/mapsscreen'
import ProfileScreen from '../pages/profilescreen'
import BottomNavigator from '../navigation/bottomnavigation'
import { DrawContent } from '../navigation/drawcontent'

const Drawer = createDrawerNavigator();

interface Props {
    toggleTheme?: () => void,
    SwitchDarkTheme?: boolean
}


export const Routes = (props: Props) => {
    const papertheme = useTheme();
    const { toggleTheme, SwitchDarkTheme } = props;

    return (

        <Drawer.Navigator initialRouteName="Login"
            backBehavior="none"
            drawerContent={props => <DrawContent props={props} SwitchDarkTheme={SwitchDarkTheme} toggleTheme={toggleTheme} />}
            drawerType="slide"
            drawerStyle={{ backgroundColor: papertheme.colors.background }}
            {...props}
            edgeWidth={65}
        >

            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="RegisterUserScreen" children={() => { return (<RegisterUserScreen theme={papertheme} {...props} />) }} />
            <Drawer.Screen name="ProfileScreen" children={() => { return (<ProfileScreen theme={papertheme} {...props} />) }} />
            <Drawer.Screen name="MapsScreen" component={MapsScreen} />
            <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
        </Drawer.Navigator>

    )
}

