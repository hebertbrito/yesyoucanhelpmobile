import React from 'react'
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { useTheme, Text, Switch, Avatar, Subheading, Divider, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import translate from '../services/translate/translate'


interface Props {
    toggleTheme?: () => void,
    SwitchDarkTheme?: boolean,
    props: DrawerContentComponentProps<DrawerContentOptions>
}

export const DrawContent = (props: Props) => {

    const { navigation } = props.props;

    const SwitchDarkTheme = props.SwitchDarkTheme;

    const paperTheme = useTheme();

    const sidebarMenus = [
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="user-cog" style={styles.styleIcons} />,
            labelName: 'profile_menu',
            route: 'profilescreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="home" style={styles.styleIcons} />,
            labelName: 'home_menu',
            route: 'homescreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="map-marker-alt" style={styles.styleIcons} />,
            labelName: 'maps_menu',
            route: 'mapsscreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="hands-helping" style={styles.styleIcons} />,
            labelName: 'contribution_menu',
            route: 'contributionscreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="hand-holding" style={styles.styleIcons} />,
            labelName: 'ask_contribution_menu',
            route: 'akscontributionscreen'
        },
    ]

    const singOutIcon = () => {
        return (
            <Icon color={paperTheme.colors.text} size={20} name="sign-out-alt" />
        )
    }
    return (
        <>
            <DrawerContentScrollView {...props} >
                <View style={styles.conteinerDraw}>
                    <View style={styles.viewPerfil}>
                        <Avatar.Image size={80} source={require('../assets/imageperfil/hebert.jpg')} />
                        <Subheading>Hebert Felipe</Subheading>
                    </View>
                </View>
                <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
                <Drawer.Section style={styles.drawSection}>
                    {sidebarMenus.length > 0 && (
                        sidebarMenus.map(menu => {
                            return (
                                <DrawerItem key={menu.labelName} label={translate(menu.labelName)} icon={menu.icon}
                                    onPress={() => navigation.navigate('BottomNavigator', { screen: 'RecentsRoute' })}
                                    labelStyle={{ display: "flex", width: 160, textAlign: "left" }}
                                    style={{ display: "flex", alignItems: "flex-end", alignContent: "center" }}
                                />
                            )
                        })
                    )}
                </Drawer.Section>
                <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
                <View style={styles.viewCommum}>
                    <Text style={{ alignSelf: 'center', fontSize: 15 }}>{translate('preferences_menu')}</Text>
                    <View style={styles.subPreferences}>
                        <Caption children={<Text>{translate('theme_menu')}</Text>} />
                        <Switch value={SwitchDarkTheme} onValueChange={props.toggleTheme}
                            trackColor={{ true: "#ffa000", false: "#e0e0e0" }}
                            thumbColor="#ef6c00"
                        />
                    </View>
                </View>
                <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
            </DrawerContentScrollView>
            <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
            <Drawer.Section style={styles.signOut}>
                <DrawerItem key="Sing Out" label={translate('sing_out')} icon={singOutIcon}
                    onPress={() => { }}
                />
            </Drawer.Section>
        </>
    )
}

const styles = StyleSheet.create({
    conteinerDraw: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 5
    },
    viewMenus: {
        display: "flex",
        textAlign: "center"
    },
    viewPerfil: {
        alignItems: 'center',
        textAlign: "center",
        marginBottom: 5
    },
    viewCommum: {
        padding: 5,
        marginBottom: 5
    },
    subPreferences: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8
    },
    signOut: {
        marginBottom: 15,
    },
    drawSection: {
        marginTop: 15
    },
    styleIcons: {
        display: "flex",
        alignSelf: "flex-start",
    }
})