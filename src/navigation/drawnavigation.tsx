import * as React from 'react';
import { View, Text, StatusBar, CheckBox, TextBase } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useNavigation
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
//import navigation bottom
import BottomNavigator from './bottomnavigation'

//import screens
import LoginScreen from '../pages/loginscreen'

//components
import { DrawContent } from './drawcontent'

const Drawer = createDrawerNavigator();


class DrawNavigation extends React.Component {

  state = {
    darkTheme: false
  }

  CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fafafa',
      text: '#000000',
      accent: '#D2D2D2'
    }
  }

  CustomDarkTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      ...NavigationDefaultTheme.colors,
      background: '#212121',
      text: '#fafafa',
      accent: '#757575'
    }
  }

  render() {

    const toggleTheme = () => {
      this.setState({ darkTheme: !this.state.darkTheme ? true : false })
    }

    const verify = this.state.darkTheme;
    let isDarkTheme = this.CustomDefaultTheme
    if (verify) {
      isDarkTheme = this.CustomDarkTheme
    }

    return (
      <PaperProvider theme={isDarkTheme}>
        <NavigationContainer theme={isDarkTheme} >
          <StatusBar animated={true} backgroundColor={'#ef6c00'} />
          <Drawer.Navigator initialRouteName="Login"
            backBehavior="history"
            drawerContent={props => <DrawContent props={props} valueSwitch={this.state.darkTheme} toggleTheme={toggleTheme} />}
            drawerType="front"
            drawerStyle={{backgroundColor: isDarkTheme.colors.background}}
          >
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

export default DrawNavigation;