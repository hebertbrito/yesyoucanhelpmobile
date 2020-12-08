import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, Text, Avatar, Headline, List } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../context/auth';
import { useNavigation } from '@react-navigation/native';

//componentes
import { NavigationButon } from '../../components'

//services
import translate from '../../services/translate/translate'
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

function OptionsScreens() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation();

    const [usermodel, setUserModel] = useState<User | undefined>({} as User);

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.viewContainer} >
                <LinearGradient colors={[theme.colors.primary, '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
                    <Headline style={{ marginTop: '5%' }}>
                        {translate('title_user_settings')}
                    </Headline>
                </LinearGradient>
                <View style={{
                    width: '85%', height: '25%', marginTop: '20%',
                    borderRadius: 10, backgroundColor: theme.colors.background, shadowColor: theme.colors.background,
                    shadowOffset: { width: 0, height: 9 }, shadowOpacity: 0.58, shadowRadius: 11.95, elevation: 10,
                    alignItems: "center", justifyContent: "center"
                }}>
                    <View style={styles.bodyCard}>
                        {user?.avatarsource?.uri ?
                            <Avatar.Image size={125} source={{ uri: user.avatarsource.uri }} />
                            :
                            <Avatar.Image size={125} source={require('../../assets/imageperfil/defaultavatar.jpg')} style={{ alignSelf: "center", }} />
                        }
                    </View>
                </View>
                <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ width: '100%', margin: '4%', elevation: 3 }}>

                        {user?.typeuser == '2' ?
                            listMenuItems.map(itemMenu => (

                                <List.Item
                                    title={`${translate(itemMenu.title)}`} key={itemMenu.id}
                                    description={`${translate(itemMenu.description)}`}
                                    left={props => <List.Icon {...props}
                                        icon={() => <Icon name={itemMenu.nameIcon!}
                                            size={25} color={theme.colors.text}
                                        />}
                                    />}
                                    onPress={() => navigate(`${itemMenu.screenNavigation}`)}
                                    style={{ width: '90%', elevation: 5 }}
                                />

                            ))
                            :
                            <>
                                <List.Item
                                    title={`${translate(listMenuItems[0].title)}`} key={listMenuItems[0].id}
                                    description={`${translate(listMenuItems[0].description)}`}
                                    left={props => <List.Icon {...props}
                                        icon={() => <Icon name={listMenuItems[0].nameIcon!}
                                            size={25} color={theme.colors.text}
                                        />}
                                    />}
                                    onPress={() => navigate(`${listMenuItems[0].screenNavigation}`)}
                                    style={{ width: '90%', elevation: 5 }}
                                />
                                <List.Item
                                    title={`${translate(listMenuItems[2].title)}`} key={listMenuItems[2].id}
                                    description={`${translate(listMenuItems[2].description)}`}
                                    left={props => <List.Icon {...props}
                                        icon={() => <Icon name={listMenuItems[2].nameIcon!}
                                            size={25} color={theme.colors.text}
                                        />}
                                    />}
                                    onPress={() => navigate(`${listMenuItems[2].screenNavigation}`)}
                                    style={{ width: '90%', elevation: 5 }}
                                />
                            </>
                        }
                    </View>

                    <NavigationButon
                        routeNavigation="BottomNavigator"
                        subNavigation="HomeScreen"
                        iconName="home"
                        nameButton={translate('home_menu')}
                    />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



export default OptionsScreens;