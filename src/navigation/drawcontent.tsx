import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerContentOptions, DrawerNavigationProp, DrawerNavigationOptions } from '@react-navigation/drawer';
import { useTheme, Text, Switch, Avatar, Subheading, Divider, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import translate from '../services/translate/translate';
import AuthContext from '../context/auth'

interface Props {
    toggleTheme?: () => void,
    SwitchDarkTheme?: boolean,
    props: DrawerContentComponentProps<DrawerContentOptions>
}

export const DrawContent = (props: Props) => {

    const { SingOut, user } = useContext(AuthContext)

    const { navigation } = props.props;

    const SwitchDarkTheme = props.SwitchDarkTheme;

    const paperTheme = useTheme();

    const sidebarMenus = [
        {
            nameIcon: 'cogs',
            labelName: 'settings_menu',
            route: 'OptionsScreens',
            navigate: () => navigation.navigate('OptionsScreens')
        },
        {
            nameIcon: 'home',
            labelName: 'home_menu',
            route: 'HomeScreen',
            navigate: () => navigation.navigate('BottomNavigator', { screen: 'HomeScreen' })
        },
        {
            nameIcon: 'map-marked-alt',
            icon: () => <Icon color="#ef6c00" size={20} name="map-marker-alt" style={styles.IconStylesDraw} />,
            labelName: 'maps_menu',
            route: 'mapsscreen',
            navigate: () => navigation.navigate('MapsScreen')
        },
        {
            nameIcon: 'hands-helping',
            labelName: 'contribution_menu',
            route: 'ContributionScreen',
            navigate: () => navigation.navigate('BottomNavigator', { screen: 'ContributionScreen' })
        },
        {
            nameIcon: 'user-injured',
            labelName: 'inform_houseless',
            route: 'HouseLessScreen',
            navigate: () => navigation.navigate('BottomNavigator', { screen: 'HouseLessScreen' })
        },
        {
            nameIcon: 'hand-holding',
            labelName: 'ask_contribution_menu',
            route: 'AskContributionScreen',
            navigate: () => navigation.navigate('BottomNavigator', { screen: 'AskContributionScreen' })
        },
    ]

    function singout() {
        navigation.closeDrawer();
        SingOut();
    }

    const singOutIcon = () => {
        return (
            <Icon color={paperTheme.colors.notification} size={20} name="sign-out-alt" />
        )
    }

    function hehehe(event: any){
        navigation.navigate("ProfileScreen")

    }
    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawContainer}>
                    <View style={styles.PerfilViews}>
                        {user?.avatarsource?.uri != "" ?
                            <>
                                <Avatar.Image size={80} source={{uri: user?.avatarsource?.uri}} onTouchStart={(event) => hehehe(event)}/>
                                <Subheading>{user?.firstname} {user?.lastname}</Subheading>
                            </>
                            :
                            <>
                                <Avatar.Image size={80} source={require('../assets/imageperfil/defaultavatar.jpg')} />
                                <Subheading>{user?.firstname} {user?.lastname}</Subheading>
                            </>
                        }


                    </View>
                </View>
                <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
                <Drawer.Section style={{
                    marginTop: 15,
                    borderBottomColor: `${paperTheme.colors.accent}`,
                    borderBottomWidth: 0.4
                }}

                >
                    {sidebarMenus.length > 0 && (
                        sidebarMenus.map(menu => {
                            return (
                                <DrawerItem key={menu.labelName} label={translate(menu.labelName)}
                                    icon={({ color, size }) => (
                                        <Icon name={menu.nameIcon} size={size} color={paperTheme.colors.primary}
                                            style={{ alignSelf: "flex-start", width: 35, height: 35, textAlign: "center" }} />
                                    )}
                                    onPress={() => menu.navigate()}
                                    //the error is here
                                    labelStyle={{ alignSelf: "stretch", fontWeight: "bold" }}
                                    style={{ justifyContent: 'center', alignContent: "center" }}
                                />
                            )
                        })
                    )}
                </Drawer.Section>

                <View style={styles.CommumViews}>
                    <Text style={{ alignSelf: 'center', fontSize: 15 }}>{translate('preferences_menu')}</Text>
                    <View style={styles.PreferencesSub}>
                        <Caption children={<Text>{translate('theme_menu')}</Text>} />
                        <Switch value={SwitchDarkTheme} onValueChange={props.toggleTheme}
                            trackColor={{ true: '#877300', false: "#e0e0e0" }}
                            thumbColor={paperTheme.colors.third}
                            color={paperTheme.colors.third}
                        />
                    </View>
                </View>
                <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
            </DrawerContentScrollView>
            <Divider style={{ backgroundColor: paperTheme.colors.accent }} />
            <Drawer.Section style={{
                borderBottomColor: `${paperTheme.colors.accent}`,
                borderBottomWidth: 0.4
            }}>
                <DrawerItem key="Sing Out" label={translate('sing_out')} icon={singOutIcon}
                    onPress={() => singout()}
                />
            </Drawer.Section>
        </>
    )
}

const styles = StyleSheet.create({
    DrawContainer: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 5
    },
    MenusViews: {
        display: "flex",
        textAlign: "center"
    },
    PerfilViews: {
        alignItems: 'center',
        textAlign: "center",
        marginBottom: 5
    },
    CommumViews: {
        padding: 5,
        marginBottom: 5
    },
    PreferencesSub: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8
    },
    signOut: {
        marginBottom: 15,
    },
    SectionDraw: {
        marginTop: 15,
        borderColor: 'red',
        borderBottomColor: 'red',
        borderBottomWidth: 2
    },
    IconStylesDraw: {
        display: "flex",
        alignSelf: "flex-start",
    }
})