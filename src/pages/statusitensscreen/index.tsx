import React, { useEffect, useState, useContext } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Divider, FAB, List, Text, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


//services
import { GetStatusItemsByUser } from '../../services/api/StatusItensByUser'

//styles
import { styles } from './styles'

//components
import { ButtonComponent, SnackBarYes } from '../../components';

//translate
import translate from '../../services/translate/translate';

//context
import AuthContext from '../../context/auth';

//validation
import { SwitchErros } from './validation'

//models
import { Contribution, Houseless, AskContribution } from '../../models'

//mocks
import { transformDate } from '../../mocks/transformDate'

function StatusScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation()

    const [enableButton, setEnableButton] = useState(true)
    const [lstContributions, setLstContributions] = useState<Array<Contribution>>([] as Array<Contribution>)
    const [lstAksContributions, setLstAksContributions] = useState<Array<AskContribution>>([] as Array<AskContribution>)
    const [lstHouseless, setLstHouseless] = useState<Array<Houseless>>([] as Array<Houseless>)

    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")


    async function getStatusItemsByUser() {
        try {
            setEnableButton(true)
            const response = await GetStatusItemsByUser(user!)
            setLstAksContributions(response.lstAksContributions)
            setLstContributions(response.lstContributions)
            setLstHouseless(response.lstHouseless)
            setEnableButton(false)
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
            setIsVisible(true)
            setEnableButton(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getStatusItemsByUser()
            return () => {
                //do something when screen are unfocused
                null
            }

        }, [])
    );

    function clearFields(){
        setLstAksContributions([])
        setLstContributions([])
        setLstContributions([])
    }

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={{ width: "95%", height: "30%" }}>
                <Title style={{ marginTop: '5%', alignSelf: "center" }}>
                    {translate("status_items")}
                </Title>
                <LottieView source={require('../../assets/lottiefiles/status.json')} autoPlay loop speed={0.7} resizeMode="contain"
                    style={{ width: "100%", height: "85%", alignSelf: "center", marginTop: "1%" }}
                />
            </View>

            <Divider style={{ backgroundColor: theme.colors.accent, width: '95%', height: 1, marginBottom: 8 }} />

            <ScrollView style={{ width: '95%' }} contentContainerStyle={{ flexGrow: 1, marginTop: '1%' }}>
                <List.Section>
                    <List.Accordion
                        title="Doações feitas"
                        left={props => <List.Icon {...props} icon={() => <Icon name="hands-helping" size={20} color={theme.colors.text} />} />}
                    >
                        {lstContributions.length > 0 ?
                            lstContributions.map(item => {
                                if (item.accept) {
                                    return (
                                        <List.Item
                                            style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 0.7 }}
                                            descriptionNumberOfLines={4}
                                            key={item.idDocument}
                                            title={`${translate(item.product)} ${item.number} - status: aceito`}
                                            description={`${transformDate(item.createdAt._seconds)} - ${item.description}`}
                                            right={props => <List.Icon {...props} icon={() => <Icon name="user-check" size={15} color={theme.colors.onSurface} />} />}
                                        />
                                    )
                                } {
                                    return (
                                        <List.Item
                                            style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 0.7 }}
                                            descriptionNumberOfLines={4}
                                            key={item.idDocument}
                                            title={`${translate(item.product)} ${item.number} - status: não aceito`}
                                            description={`${transformDate(item.createdAt._seconds)} - ${item.description}`}
                                            right={props => <List.Icon {...props} icon={() => <Icon name="user-check" size={15} color={theme.colors.third} />} />}
                                        />
                                    )
                                }
                            })
                            :
                            null
                        }
                    </List.Accordion>
                    <List.Accordion
                        title="Doações pedidas"
                        left={props => <List.Icon {...props} icon={() => <Icon name="hand-holding" size={20} color={theme.colors.text} />} />}

                    >
                        {lstAksContributions.length > 0 ?
                            lstAksContributions.map(item => {
                                if (item.accept) {
                                    return (
                                        <List.Item
                                            style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 0.7 }}
                                            descriptionNumberOfLines={4}
                                            key={item.idDocument}
                                            title={`${translate(item.product)} ${item.number} - status: aceito`}
                                            description={`${transformDate(item.createdAt._seconds)} - ${item.description}`}
                                            right={props => <List.Icon {...props} icon={() => <Icon name="user-check" size={15} color={theme.colors.onSurface} />} />}
                                        />
                                    )
                                } {
                                    return (
                                        <List.Item
                                            style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 0.7 }}
                                            descriptionNumberOfLines={4}
                                            key={item.idDocument}
                                            title={`${translate(item.product)} ${item.number} - status: não aceito`}
                                            description={`${transformDate(item.createdAt._seconds)} - ${item.description}`}
                                            right={props => <List.Icon {...props} icon={() => <Icon name="user-check" size={15} color={theme.colors.third} />} />}
                                        />
                                    )
                                }
                            })
                            :
                            null
                        }
                    </List.Accordion>
                    <List.Accordion
                        title="Desabrigados Informados"
                        left={props => <List.Icon {...props} icon={() => <Icon name="user-injured" size={20} color={theme.colors.text} />} />}
                    >
                        {lstHouseless.length > 0 ?
                            lstHouseless.map(item => (
                                <List.Item
                                    style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 0.7 }}
                                    descriptionNumberOfLines={4}
                                    key={item.idDocument}
                                    title={`${item.name}`}
                                    description={`${transformDate(item.createdAt._seconds)} - ${item.description}`}
                                    right={props => <List.Icon {...props} icon={() => <Icon name="eye" size={15} color={theme.colors.third} />} />}
                                />
                            ))
                            :
                            null
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <View style={styles.bottomMenus}>
                <Button mode="text"
                    onPress={() => navigate('BottomNavigator', { screen: 'HomeScreen' })}
                    style={{ width: "40%", height: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: theme.colors.text }}
                    color={theme.colors.text}
                    disabled={enableButton}
                >
                    {translate("back")}
                </Button>
                <FAB
                    style={{ position: "absolute", bottom: 7, backgroundColor: theme.colors.onSurface, zIndex: 1 }}
                    icon="sync"
                    onPress={() => getStatusItemsByUser()}
                    disabled={enableButton}
                />
                <Button mode="text"
                    onPress={() => clearFields()}
                    style={{ width: "40%", height: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: theme.colors.surface }}
                    color={theme.colors.surface}
                    disabled={enableButton}
                >
                    {translate("clean")}
                </Button>
            </View>
            <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onDismiss}
                text={text}
                style={{
                    height: 50, width: "90%",
                    backgroundColor: colorbackground, alignSelf: "center", bottom: 15,
                    display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center"
                }}
                textcolor={textcolor} subcolorButton={subcolorButton} title={title}
            />
        </SafeAreaView>
    )
}

export default StatusScreen;