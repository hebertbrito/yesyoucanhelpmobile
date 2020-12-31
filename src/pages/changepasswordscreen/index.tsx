import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, Avatar, Headline, Button, TextInput, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../context/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

//componentes
import { InputYesComponent, SnackBarYes } from '../../components'

//services
import translate from '../../services/translate/translate'
import { UpdatePassword } from '../../services/api/UpdatePassword'

//CSS
import { styles } from './styles'

import { validationfields, SwitchErros } from './validation'


function ChangePasswordScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation();

    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [issend, setIsSend] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [eyepassword, setEyePassword] = useState(true)


    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

    useFocusEffect(
        React.useCallback(() => {

            return () => {
                cleanfields()
                null
            }
        }, [])
    );

    function eyePassword() {
        setEyePassword(!eyepassword)
    }

    function cleanfields() {
        setPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    function EnableThings() {
        setDisableButton(true)
        setIsSend(true)
    }

    function DisableThings() {
        setDisableButton(false)
        setIsSend(false)
    }

    async function updatepassword() {
        try {
            setError(false)
            EnableThings()
            if (validationfields(password, newpassword, confirmpassword, setError)) {
                await UpdatePassword({ idDocument: user!.idDocument!, newpassword, password, token: user!.token! })
                cleanfields()
                DisableThings()
                SwitchErros(201, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
                setIsVisible(true);
            } else {
                setError(true)
                DisableThings()
                SwitchErros(401, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
                setIsVisible(true);
            }
        } catch (error) {
            DisableThings()
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
            setIsVisible(true);
        }
    }

    function onPress_onDismiss() {
        setIsVisible(!isVisible)
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.viewContainer} >
                <LinearGradient colors={[theme.colors.primary, '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
                    <Headline style={{ marginTop: '5%' }}>
                        Alterar Senha
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
                <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ alignContent: "center", justifyContent: "center" }}>

                    <View style={{ width: "95%", display: "flex", alignSelf: "center", alignItems: "center", marginTop: "7%" }}>

                        <TextInput
                            secureTextEntry={eyepassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder={`exemple: Aiufsd7865`}
                            label={`Senha`}
                            style={{ margin: 10, width: "90%" }}
                            placeholderTextColor={theme.colors.text}
                            selectionColor={theme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: theme.colors.text, text: theme.colors.text } }}
                            maxLength={30}
                            error={((newpassword.length < 7 && error) || (newpassword !== confirmpassword && error))}
                            right={
                                <TextInput.Icon
                                    name="eye"
                                    color={theme.colors.text}
                                    onPress={() => {
                                        eyePassword()
                                    }}
                                />
                            }
                        />

                        <TextInput
                            secureTextEntry={eyepassword}
                            value={newpassword}
                            onChangeText={(text) => setNewPassword(text)}
                            placeholder={`exemple: Aiufsd7865`}
                            label={`Nova Senha`}
                            style={{ margin: 10, width: "90%" }}
                            placeholderTextColor={theme.colors.text}
                            selectionColor={theme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: theme.colors.text, text: theme.colors.text } }}
                            maxLength={30}
                            error={((newpassword.length < 7 && error) || (newpassword !== confirmpassword && error))}
                            right={
                                <TextInput.Icon
                                    name="eye"
                                    color={theme.colors.text}
                                    onPress={() => {
                                        eyePassword()
                                    }}
                                />
                            }
                        />

                        <TextInput
                            secureTextEntry={eyepassword}
                            value={confirmpassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            placeholder={`${translate('password')}*`}
                            label={`confirmar nova senha`}
                            style={{ margin: 10, width: "90%" }}
                            placeholderTextColor={theme.colors.text}
                            selectionColor={theme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: theme.colors.text, text: theme.colors.text } }}
                            maxLength={30}
                            error={((newpassword.length < 7 && error) || (newpassword !== confirmpassword && error))}
                            right={
                                <TextInput.Icon
                                    name="eye"
                                    color={theme.colors.text}
                                    onPress={() => {
                                        eyePassword()
                                    }}
                                />
                            }
                        />
                    </View>

                    <View style={{
                        width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-evenly",
                        alignContent: "center", alignItems: "center", alignSelf: "center", marginTop: "10%"
                    }}>
                        <Button mode="text"
                            onPress={() => navigate('OptionsScreens')}
                            style={{ width: '25%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                            color={theme.colors.text}
                            disabled={disableButton}
                        >
                            {translate("back")}
                        </Button>
                        <Button mode="contained"
                            onPress={() => updatepassword()}
                            style={{ width: '60%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", elevation: 5 }}
                            color={theme.colors.primary}
                            disabled={disableButton}
                            icon={() => <Icon name='paper-plane' size={20} color="#000000" />}
                            loading={issend}
                        >
                            <Text style={{color: "#000000", fontWeight: "bold"}}>
                                {translate("send")}
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <SnackBarYes isVisible={isVisible} onDismiss={onPress_onDismiss} onPress={onPress_onDismiss}
                text={text} style={{ height: 50, width: "80%", backgroundColor: colorbackground, alignSelf: "center" }}
                textcolor={textcolor} subcolorButton={subcolorButton}
            />
        </SafeAreaView>
    )
}



export default ChangePasswordScreen;