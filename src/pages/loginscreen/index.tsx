import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Text, useTheme, TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

//styles
import styles from './styles'
import { NavigationRouteContext } from '@react-navigation/native';


const LoginScreen = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

    const paperTheme = useTheme()

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const { navigation } = props;


    const iconbutton = () => {
        return <Icon name="sign-in-alt" size={20} />
    }

    const teste = () => {
        // setPassword(text)
        console.log(password)
    }

    return (

        <SafeAreaView style={styles.safeareContainer}>

        <View ></View>

            <Animatable.Image animation="bounceInDown" delay={1100} useNativeDriver={true}  source={require('../../assets/fotospublic/logoLetra.png')} style={{ height: '40%', width: '50%' }} />

            <Animatable.View style={styles.formView} animation="fadeInLeft" delay={1200}  useNativeDriver={true}>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    keyboardAppearance="light"
                    keyboardType="email-address"
                    style={{ margin: 10 }}
                    focusable={false}
                    underlineColorAndroid={paperTheme.colors.text}
                    placeholderTextColor={paperTheme.colors.text}
                    
                />

                <TextInput
                    secureTextEntry={true}
                    value={password.split(' ').toString()}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    keyboardAppearance="light"
                    style={{ margin: 10 }}
                    underlineColorAndroid={paperTheme.colors.text}
                    placeholderTextColor={paperTheme.colors.text}
                    selectionColor={paperTheme.colors.text}
                />

                <Button icon={iconbutton} mode="contained" onPress={() => navigation.navigate('BottomNavigator', { screen: 'HomeScreen' })}
                    style={{ width: '45%', padding: 2, alignSelf: "center" }}
                    color="#ef6c00"
                >
                    Press me
                </Button>
                <TouchableOpacity style={{width: 120, height: 50, alignSelf: "center"}}
                onPress={()=> navigation.navigate('RegisterUserScreen')}
                >
                    <Text style={{alignSelf: "center", margin: 3, color: 'red'}}>
                        Register
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default LoginScreen;