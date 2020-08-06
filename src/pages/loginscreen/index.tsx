import React, { useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Text, useTheme, TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

//styles
import styles from './styles'
import { NavigationRouteContext } from '@react-navigation/native';


const LoginScreen = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

    const paperTheme = useTheme()

    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')

    const { navigation } = props;
    
    
    const iconbutton = () =>{
        return <Icon name="sign-in-alt" size={20} />
    }

    const teste = () =>{
        console.log(paperTheme)
    }

    return (

        <SafeAreaView style={styles.safeareContainer}>
            <View style={styles.formView}>
                <TextInput
                    value={email}
                    onChangeText={text => { setEmail(text) }}
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
                    value={password}
                    onChangeText={text => { setPassword(text)}}
                    placeholder="Password"
                    keyboardAppearance="light"
                    style={{ margin: 10 }}
                    underlineColorAndroid={paperTheme.colors.text}
                    placeholderTextColor={paperTheme.colors.text}
                />
                
                <Button icon={iconbutton} mode="contained" onPress={() => navigation.navigate('BottomNavigator', { screen: 'MusicRoute' })}
                    style={{ width: '45%', padding: 2, alignSelf: "center" }}
                    color="#ef6c00"
                >
                    Press me
                    </Button>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;