import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';




interface Props {
    navigate?: any,
    width?: string,
    height?: number,
    iconName?: string,
    screenNameNavigate?: string
}

export const ButtonDrawer = (props: Props) => {

    const navigation = useNavigation<DrawerContentComponentProps<any>>();

    const iconButton = () => {
        return (
            <Icon name="bars" size={20} color={paperTheme.colors.onBackground} />
        )
    }

    const paperTheme = useTheme();

    return (
        <IconButton
            icon={iconButton}
            onPress={() => navigation.toggleDrawer()}
            style={{ position: "absolute", margin: 5, zIndex: +1 }}
        />
    )
}

const styles = StyleSheet.create({

})