import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-paper';

//import navigation bottom
import BottomNavigation from './bottomnavigation'

function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();


class DrawNavigation extends React.Component {
  constructor(props: any) {
    super(props);

  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }

}

export default DrawNavigation;

// export default function DrawNavigation() {
//   return (

//   );
// }