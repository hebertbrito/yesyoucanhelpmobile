import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, Text, Avatar, Headline, List } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../context/auth';

import { NavigationButon } from '../../components'

import { GetUserProfile } from '../../services/api/GetProfile'
import { User } from 'src/models/User';
import { AvatarUser } from '../../models/AvatarUser';

//dataSettings
import { listMenuItems } from '../../data/dataSettingsScreen'

//CSS
import { styles } from './styles'

interface Props {
    theme: any,
}

function SettingsScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);

    const [usermodel, setUserModel] = useState<User | undefined>({} as User);

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.viewContainer} >
                <LinearGradient colors={[theme.colors.primary, '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
                    <Headline style={{ marginTop: '5%' }}>
                        User Settings
                                </Headline>
                </LinearGradient>
                <View style={{
                    width: '85%', height: '25%', marginTop: '20%',
                    borderRadius: 20, backgroundColor: theme.colors.background, shadowColor: theme.colors.background,
                    shadowOffset: { width: 0, height: 9 }, shadowOpacity: 0.58, shadowRadius: 11.95, elevation: 10,
                    alignItems: "center", justifyContent: "center"
                }}>
                    <View style={styles.bodyCard}>
                        {usermodel! ?
                            <Avatar.Image size={100} source={require('../../assets/fotospublic/logoApp2.png')} style={{ alignSelf: "center", }} />
                            :
                            <Avatar.Image size={100} source={require('../../assets/fotospublic/logoApp2.png')} style={{ alignSelf: "center", }} />
                        }
                    </View>
                </View>
                <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ width: '100%', margin: '4%', elevation: 3 }}>
                        {listMenuItems.map(itemMenu => (

                            <List.Item
                                title={itemMenu.title} key={itemMenu.id}
                                description={itemMenu.description}
                                left={props => <List.Icon {...props}
                                    icon={() => <Icon name={itemMenu.nameIcon!}
                                        size={25} color={theme.colors.text}
                                    />}
                                />}
                                onPress={() => { }}
                                style={{ width: '90%', elevation: 5 }}
                            />

                        ))}
                    </View>

                    <NavigationButon
                        routeNavigation="BottomNavigator"
                        subNavigation="HomeScreen"
                        iconName="home"
                        nameButton="Go Home"
                    />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



export default SettingsScreen;