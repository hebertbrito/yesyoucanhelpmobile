import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


interface Props {
    nameButton: string,
    navigate?: any,
    width: string,
    height: number,
    iconName: string,
    screenNameNavigate: string,
    colorHexa: string,
}

export const ButtonCommum = (props: Props) => {

    const navigation = useNavigation()
    const paperTheme = useTheme();

    const teste =()=>{
        // console.log(props.navigate)
        console.log(navigation)
    }

    return (
        <Button style={{
            backgroundColor: props.colorHexa,
            height: props.height, width: props.width, alignSelf: "center", margin: 10, alignItems: "center", alignContent: "center", justifyContent: "center"
        }}
            color={paperTheme.colors.text} mode="outlined"
            icon={()=> <Icon name={props.iconName} size={20} color={paperTheme.colors.text} />}
            onPress={() =>  navigation.navigate('BottomNavigator', { screen: props.screenNameNavigate.toString() })}
        >
            {props.nameButton}
        </Button>
    )
}

const styles = StyleSheet.create({

})