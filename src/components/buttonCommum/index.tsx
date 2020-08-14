import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props {
    nameButton: string,
    navigate?: any,
    width: string,
    height: number,
    iconName: string,
    screenNameNavigate: string,
    colorHexa: string,
    setNameNavigation?: string
}

export const ButtonCommum = (props: Props) => {

    const iconButton = () => {
        return (
            <Icon name={props.iconName} size={20} color={paperTheme.colors.text} />
        )
    }

    const goToNavigation = (screenNameNavigate: string, setNameNavigation?: string) => {
        if (setNameNavigation === "") {
            props.navigate(`${screenNameNavigate}`)
        } else {
            props.navigate(`${setNameNavigation}`, {screen: `${screenNameNavigate}`})
        }
    }

    const paperTheme = useTheme();

    return (
        <Button style={{
            backgroundColor: props.colorHexa,
            height: props.height, width: props.width, alignSelf: "center", margin: 10
        }}
            color={paperTheme.colors.text} mode="outlined"
            icon={iconButton}
            onPress={() => goToNavigation(props.screenNameNavigate, props.setNameNavigation)}
        >
            {props.nameButton}
        </Button>
    )
}

const styles = StyleSheet.create({

})