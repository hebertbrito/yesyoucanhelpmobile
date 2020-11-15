import React, { useContext } from 'react';
import { useTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthContext from '../context/auth'

import LoginScreen from '../pages/loginscreen';
import RegisterUserScreen from '../pages/registerscreen';
import MapsScreen from '../pages/mapsscreen';
import ProfileScreen from '../pages/profilescreen';
import BottomNavigator from '../navigation/bottomnavigation';
import OptionsScreens from '../pages/optionsscreen';
import AdvancedSerach from '../pages/advancedsearchscreen';
import ChartScreen from '../pages/chartscreen';
import { DrawContent } from '../navigation/drawcontent';

import { CardDetailsInfo } from '../components'

const Drawer = createDrawerNavigator();

interface Props {
    toggleTheme?: () => void,
    SwitchDarkTheme?: boolean
}

const options = {
    swipeEnabled: false,
    headerShown: false
}

export const Routes = (props: Props) => {
    const { signed } = useContext(AuthContext);
    const papertheme = useTheme();
    const { toggleTheme, SwitchDarkTheme } = props;

    return (

        <Drawer.Navigator
            backBehavior="none"
            drawerContent={props => <DrawContent props={props} SwitchDarkTheme={SwitchDarkTheme} toggleTheme={toggleTheme} />}
            drawerType="slide"
            drawerStyle={{ backgroundColor: papertheme.colors.background, elevation: 16, }}
            {...props}
            edgeWidth={65}
        >

            {signed ? (

                <>
                    <Drawer.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
                    <Drawer.Screen name="MapsScreen" component={MapsScreen} {...props} options={{ gestureEnabled: false, swipeEnabled: false, headerShown: false }} />
                    <Drawer.Screen name="OptionsScreens" component={OptionsScreens} options={{ headerShown: false }} />
                    <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                    <Drawer.Screen name="AdvancedSerach" component={AdvancedSerach} options={{ headerShown: false }} />
                    <Drawer.Screen name="ChartScreen" component={ChartScreen} options={{ headerShown: false }} />
                </>

            ) : (
                    <>
                        <Drawer.Screen name="Login" component={LoginScreen} options={options} />
                        <Drawer.Screen name="RegisterUserScreen" component={RegisterUserScreen} options={options} />
                    </>
                )}

        </Drawer.Navigator>

    )
}

