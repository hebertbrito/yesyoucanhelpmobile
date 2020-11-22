import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, Keyboard } from 'react-native';
import { useTheme, TextInput, Text, Title, Avatar, IconButton, Subheading } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import AuthContext from '../../context/auth';
import LottieView from 'lottie-react-native';

import { InputYesComponent, MainButton, SnackBarYes } from '../../components'

import { GetUserProfile } from '../../services/api/GetProfile'
import { User } from 'src/models/User';
import { AvatarUser } from '../../models/AvatarUser';
import { lstGenders } from '../../data/dataUserRegister'

import { styles } from './styles'
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

//Services
import { SearchCEP } from '../../services/SearchCEP'
import { UpdateUser } from '../../services/api/Updateuser'

//Models
import { CEPjson } from '../../models'

//factory
import { GetNewValues } from './factory'

//validation
import { SwitchErros } from './validation'
interface Props {
    theme: any,
}

function ProfileScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);

    const [firstname, setFirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [datebirth, setdateBirth] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [CEP, setCEP] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [editableInput, setEditableInput] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [usermodel, setUserModel] = useState<User | undefined>({} as User);
    const [avatarSource, setAvatarSource] = useState<AvatarUser>({} as AvatarUser);
    const [cepJSON, setCEPJSON] = useState<CEPjson | undefined>({} as CEPjson);
    const [isSendUpdate, setIsSendUpdate] = useState(false);


    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    useFocusEffect(
        React.useCallback(() => {

            async function getuserprofile() {
                const response = await GetUserProfile(user, setUserModel);

                if (response) {
                    setUserModel(response)
                    if (response.avatarsource) {
                        setAvatarSource(response.avatarsource!)
                    }
                    setIsloading(false)
                }
            }
            setTimeout(() => {
                getuserprofile();
                setAvatarSource({
                    fileName: "",
                    fileSize: 0,
                    path: "",
                    type: "",
                    uri: user?.avatarsource?.uri
                })
            }, 2000);

            return () => {
                //do something when screen are unfocused
                null
            }

        }, [])
    );

    useEffect(() => {

        async function executeSearchCEP() {
            try {
                if (CEP.length == 8) {
                    const response = await SearchCEP(CEP);
                    if (response) {
                        setCEPJSON(response);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        executeSearchCEP();

    }, [CEP])

    useEffect(() => {

        if (cepJSON) {
            Keyboard.dismiss()
            setStreet(cepJSON.logradouro!)
            setCity(cepJSON.localidade!);
            setNeighbourhood(cepJSON.bairro!);
            setState(cepJSON.uf!)

        }

    }, [cepJSON])

    const enableInput = () => {
        setEditableInput(!editableInput ? true : false)
    }

    const getImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                setAvatarSource({
                    fileSize: response.fileSize,
                    path: response.path,
                    type: response.type,
                    uri: response.uri,
                    fileName: response.fileName,
                    data: response.data
                });
            }
        });
    }
    async function updateuser() {
        try {
            setIsSendUpdate(true)
            const objNewValues = GetNewValues(
                { firstname, lastname, datebirth, gender, email, password, cellphone },
                { country, city, street, number, state, CEP, neighbourhood }
            )

            await UpdateUser(objNewValues, avatarSource, user!)
            setIsSendUpdate(false)
            SwitchErros(201, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
            setIsVisible(true)
        } catch (error) {
            setIsSendUpdate(false)
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, theme)
            setIsVisible(true)
        }
    }

    function onPress() {
        setIsVisible(!isVisible)
    }

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    return (

        isLoading ?
            <SafeAreaView style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <LottieView source={require('../../assets/lottiefiles/searching-for-profile.json')} autoPlay loop speed={0.7} resizeMode="contain" />
            </SafeAreaView>
            :
            <SafeAreaView style={styles.safeView}>
                <View style={styles.viewContainer} >
                    <LinearGradient colors={[theme.colors.primary, '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
                        <Title style={{ marginTop: '5%' }}>
                            Profile
                                </Title>
                    </LinearGradient>
                    <View style={{
                        width: '85%', height: '25%', marginTop: '20%',
                        borderRadius: 20, backgroundColor: theme.colors.background, shadowColor: theme.colors.background,
                        shadowOffset: { width: 0, height: 9 }, shadowOpacity: 0.58, shadowRadius: 11.95, elevation: 10,
                        alignItems: "center", justifyContent: "center"
                    }}>
                        <View style={styles.bodyCard}>
                            {avatarSource.uri != "" ?
                                <Avatar.Image size={120} source={{ uri: avatarSource.uri }} style={{ alignSelf: "center", }} />
                                :
                                <Avatar.Image size={100} source={require('../../assets/imageperfil/defaultavatar.jpg')} style={{ alignSelf: "center", }} />
                            }
                            <IconButton
                                icon="camera"
                                size={25}
                                color={theme.colors.text}
                                onPress={() => getImage()}
                                style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%' }}>
                        <IconButton
                            icon={() => <Icon name="user-edit" size={20} color={theme.colors.surface} />}
                            size={25}
                            style={{ marginRight: '9%', marginTop: '2%', alignSelf: "flex-end" }}
                            onPress={() => enableInput()}
                        />
                    </View>
                    <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.subContainerScroll}>
                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>First Name: </Subheading>
                                    <Text>{usermodel!.firstname!}</Text>
                                </View>
                                {editableInput &&


                                    <InputYesComponent
                                        value={firstname}
                                        setvalue={setFirstName}
                                        placeholder="Boseman"
                                        label="New FirstName"
                                        typeKeyboard="email-address"
                                        width="60%"
                                        maxLength={20}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Lastname: </Subheading>
                                    <Text>{usermodel!.lastname!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={lastname}
                                        setvalue={setlastName}
                                        placeholder="Chadwik"
                                        label="New Lastname"
                                        typeKeyboard="email-address"
                                        width="60%"
                                        maxLength={20}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Date Birth: </Subheading>
                                    <Text>{usermodel?.datebirth!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={datebirth}
                                        setvalue={setdateBirth}
                                        placeholder="DDMMYYYY"
                                        label="New DateBirth"
                                        typeKeyboard="numeric"
                                        width="40%"
                                        maxLength={8}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Gender: </Subheading>
                                    <Text>{usermodel?.gender!}</Text>
                                </View>

                                {editableInput &&
                                    <Picker mode="dialog" style={{ width: '50%', color: theme.colors.text }}
                                        selectedValue={gender}
                                        onValueChange={(itemvalue, itemindex) => setGender(itemvalue.toString())}
                                    >
                                        {lstGenders.length > 0 && (
                                            lstGenders.map((item) => {
                                                return (
                                                    <Picker.Item key={item.id} label={item.name} value={item.name} />
                                                )
                                            })
                                        )}
                                    </Picker>
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Cellphone: </Subheading>
                                    <Text>{usermodel?.cellphone!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={cellphone}
                                        setvalue={setCellphone}
                                        placeholder="exemple: DDXXXXXXXXX"
                                        label="New Cellphone"
                                        typeKeyboard="numeric"
                                        width="60%"
                                        maxLength={11}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>CPF/CNPJ: </Subheading>
                                    <Text>{usermodel!.cpf_cnpj!}</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>RG: </Subheading>
                                    <Text>{usermodel?.RG!}</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>CEP: </Subheading>
                                    <Text>{usermodel!.address?.CEP!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={CEP}
                                        setvalue={setCEP}
                                        placeholder="exemple: 00000111"
                                        label="New CEP"
                                        typeKeyboard="numeric"
                                        width="50%"
                                        maxLength={8}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Number: </Subheading>
                                    <Text>{usermodel!.address?.number!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={number}
                                        setvalue={setNumber}
                                        placeholder="Exemple: 000"
                                        label="New Number"
                                        typeKeyboard="numeric"
                                        width="40%"
                                        maxLength={10}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Street: </Subheading>
                                    <Text>{usermodel!.address?.street!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={street}
                                        setvalue={setStreet}
                                        placeholder="Exemple: Street Park Runbo"
                                        label="New Street"
                                        typeKeyboard="default"
                                        width="60%"
                                        maxLength={50}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Neighbourhood: </Subheading>
                                    <Text>{usermodel!.address?.neighbourhood!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={neighbourhood}
                                        setvalue={setNeighbourhood}
                                        placeholder="Exemple: Morumbi"
                                        label="New Neighbourhood"
                                        typeKeyboard="default"
                                        width="60%"
                                        maxLength={50}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>City: </Subheading>
                                    <Text>{usermodel!.address?.city!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={city}
                                        setvalue={setCity}
                                        placeholder="Exemple: São Paulo"
                                        label="New City"
                                        typeKeyboard="default"
                                        width="50%"
                                        maxLength={30}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>State: </Subheading>
                                    <Text>{usermodel!.address?.state!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={state}
                                        setvalue={setState}
                                        placeholder="XX"
                                        label="New State"
                                        typeKeyboard="default"
                                        width="30%"
                                        maxLength={2}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Country: </Subheading>
                                    <Text>{usermodel!.address?.country!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={country}
                                        setvalue={setCountry}
                                        placeholder="XX"
                                        label="New Country"
                                        typeKeyboard="default"
                                        width="35%"
                                        maxLength={2}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Email: </Subheading>
                                    <Text>{usermodel!.email!}</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={email}
                                        setvalue={setEmail}
                                        placeholder="exemple: test@teste.com"
                                        label="New Email"
                                        typeKeyboard="email-address"
                                        width="60%"
                                        maxLength={50}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading style={{ fontWeight: "bold" }}>Password: </Subheading>
                                    <Text>******************</Text>
                                </View>

                                {editableInput &&
                                    <InputYesComponent
                                        value={password}
                                        setvalue={setPassword}
                                        placeholder="exemple: AOuhfkjds16513"
                                        label="New Password"
                                        typeKeyboard="email-address"
                                        width="60%"
                                        maxLength={50}
                                        secureTextEntry={true}
                                    />
                                }
                            </View>
                            {editableInput || avatarSource.data ?

                                <MainButton MainActionScreen={updateuser} isSend={isSendUpdate}/>
                                :
                                null
                            }

                        </View>
                    </ScrollView>
                </View>
                <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onPress}
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



export default ProfileScreen;