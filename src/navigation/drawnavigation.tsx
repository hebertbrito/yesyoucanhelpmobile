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
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
//import navigation bottom
import BottomNavigator from './bottomnavigation'

//import screens
import LoginScreen from '../pages/loginscreen'


const Drawer = createDrawerNavigator();

class DrawNavigation extends React.Component {
  constructor(props: any) {
    super(props);
  }
  state ={
    status: true
  }
   
  render() {

        
    // const [status, setStatus] = React.useState('checked');

    return (
      <PaperProvider theme={PaperDarkTheme}>
        <NavigationContainer theme={NavigationDarkTheme}>
          <StatusBar animated={true} backgroundColor={'#ef6c00'} />
          <Drawer.Navigator initialRouteName="Home" >
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="BottomNavigator" component={BottomNavigator}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }

}

export default DrawNavigation;

// export default function DrawNavigation() {
//   return (

//   );
// }