import React from 'react'
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { useNavigation, NavigationState, NavigationProp } from '@react-navigation/native';
import { useTheme, Text, Switch, Avatar, Subheading, Divider, Caption, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { State } from 'react-native-gesture-handler';


interface Props {
    toggleTheme?: () => void,
    valueSwitch?: boolean,
    props: DrawerContentComponentProps<DrawerContentOptions>
}

export const DrawContent = (props:Props) => {
    const { navigation }  = props.props;

    const valueSwitch = props.valueSwitch;

    const paperTheme = useTheme();

    const ahaha =()=>{
        console.log('**********************************************************')
        // console.log(state)
    }

    const sidebarMenus = [
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="user" />,
            labelName: 'Profile',
            route: 'profilescreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="home" />,
            labelName: 'Home',
            route: 'homescreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="map-marker-alt" />,
            labelName: 'Maps',
            route: 'mapsscreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="hands-helping" />,
            labelName: 'Contribution',
            route: 'contributionscreen'
        },
        {
            icon: () => <Icon color={paperTheme.colors.text} size={20} name="hand-holding" />,
            labelName: 'Ask Contribution',
            route: 'akscontributionscreen'
        },
    ]

    return (
        <DrawerContentScrollView {...props} >
            <View style={styles.conteinerDraw}>
                <View style={styles.viewPerfil}>
                    <Avatar.Image size={80} source={require('../assets/imageperfil/hebert.jpg')}/>
                    <Subheading>Hebert Felipe</Subheading>
                </View>
            </View>
            <Divider />
            <View >
                {sidebarMenus.length > 0 && (
                    sidebarMenus.map(menu => {
                        return <DrawerItem key={menu.labelName} label={menu.labelName} icon={menu.icon} 
                        onPress={() => navigation.navigate('BottomNavigator', {screen: 'RecentsRoute'}) } />
                    })
                )}
            </View>
            <Divider />
            <View style={styles.viewCommum}>
                <Text style={{ alignSelf: 'center', fontSize: 15 }}>Preferences</Text>
                <View style={styles.subPreferences}>
                    <Caption children={<Text>DarkTheme</Text>} />
                    <Switch value={valueSwitch} onValueChange={props.toggleTheme} trackColor={{true: "#ffa000", false: "#e0e0e0"}} thumbColor="#ef6c00"/>
                </View>
            </View>
            <Divider />
            <View style={styles.signOut}>
                <Caption children={<Text>LogOut</Text>} style={{ marginRight: 20 }} />
                <Icon name="sign-out-alt" size={25} color={paperTheme.colors.text} />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    conteinerDraw: {
        alignItems: 'center',
        padding: 5
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 5,
        alignItems: "center"
    }

})