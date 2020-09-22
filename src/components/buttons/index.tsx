import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


interface Props {
    MainActionScreen(): Promise<any>,
    isSend?: boolean
}

export const MainButton = (props: Props) => {


    const paperTheme = useTheme();
    const { MainActionScreen, isSend } = props;

    return (
        <Button icon={() => <Icon name='paper-plane' size={20} />}
            mode="contained" color={paperTheme.colors.primary}
            style={{ width: '55%', alignSelf: "center", marginBottom: 10, marginTop: 15, elevation: 5 }}
            onPress={() => MainActionScreen()}
            loading={isSend}
        >
            Send
        </Button>
    )
}

const styles = StyleSheet.create({

})