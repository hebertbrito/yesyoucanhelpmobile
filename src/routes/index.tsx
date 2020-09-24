import React, { useContext } from 'react';
import { useTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthContext from '../context/auth'

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
                    <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
                    <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                    <Drawer.Screen name="MapsScreen" component={MapsScreen} {...props} />

                </>

            ) : (
                    <>
                        <Drawer.Screen name="Login" component={LoginScreen} options={{ swipeEnabled: false }} />
                        <Drawer.Screen name="RegisterUserScreen" component={RegisterUserScreen} options={{ swipeEnabled: false }} />
                    </>
                )}

        </Drawer.Navigator>

    )
}

