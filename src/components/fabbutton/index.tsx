import React, { } from 'react';
import { FAB, Portal, Provider, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';

interface FabButton {
    switchtheme(): any,
    drawernavigator: DrawerContentComponentProps<DrawerContentOptions>
}

export function FabButton(props: FabButton) {
    const theme = useTheme();

    const { switchtheme } = props;

    const { navigate } = useNavigation()

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state

    const styles = {
        alignSelf: "center",
        alignItems: "center"
    }

    return (

        <FAB.Group visible={true}
            open={open}
            icon={open ? 'undo' : 'plus'}
            color={theme.colors.primary}
            fabStyle={{ backgroundColor: theme.colors.background }}
            style={{ elevation: 5 }}
            actions={[
                {
                    icon: 'plus',
                    onPress: () => console.log(props),
                    color: theme.colors.primary,
                    style: { backgroundColor: theme.colors.background }
                },
                {
                    icon: 'palette',
                    label: 'Theme Maps',
                    color: theme.colors.primary,
                    onPress: () => switchtheme(),
                    style: { backgroundColor: theme.colors.background }
                },
                {
                    icon: 'home',
                    label: 'Inicial Page',
                    color: theme.colors.primary,
                    onPress: () => navigate('BottomNavigator', { screen: 'HomeScreen' }),
                    style: { backgroundColor: theme.colors.background }
                },
                {
                    icon: 'sync',
                    label: 'Refresh Data',
                    color: theme.colors.primary,
                    onPress: () => { },
                    style: { backgroundColor: theme.colors.background }
                },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                    // do something if the speed dial is open
                }
            }}
        />
    )
}