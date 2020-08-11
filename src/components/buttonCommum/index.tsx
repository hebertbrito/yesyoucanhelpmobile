import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props{
    nameButton: string,
    navigate?: any,
    width: string,
    height: number,
    iconName: string,
    screenNameNavigate: string
}

export const ButtonCommum = (props: Props) =>{

    const iconButton = () => {
        return(
            <Icon name={props.iconName} size={20} color={paperTheme.colors.text}/>
        )
    }

    const paperTheme = useTheme();

    return(
        <Button style={{backgroundColor: "#ef6c00", 
        height: props.height, width: props.width, alignSelf: "center", margin: 10}}
        color={paperTheme.colors.text} mode="outlined" 
        icon={iconButton}
        onPress={()=> props.navigate(`${props.screenNameNavigate}`)}
        >
            {props.nameButton}
        </Button>
    )
}

const styles = StyleSheet.create({

})