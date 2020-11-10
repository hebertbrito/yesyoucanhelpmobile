import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Keyboard, View, Alert } from 'react-native';
import { Button, useTheme, ProgressBar, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

import { styles } from './styles';

import { MainButton } from '../../components/buttons'

import { CommomData, IdentificationInfo, AddressInfo, LoginDatas } from './step-by-step';
import { SearchCEP } from '../../services/SearchCEP';
import { CEPjson } from 'src/models/CEPjson';
import { User } from '../../models/User';

import { CreateUser } from '../../services/api/CreateUser'
import { AddAvatar } from '../../services/api/StaticFiles'
import { useNavigation } from '@react-navigation/native';
import translate from '../../services/translate/translate';

//validation
import { validateCreateUser } from './validation'

function RegisterScreen({ ...props }) {

    const theme = useTheme();
    const { navigate } = useNavigation();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [datebirth, setDateBirth] = useState('');
    const [cpf_cnpj, setCPF_CNPJ] = useState('');
    const [RG, setRG] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [CEP, setCEP] = useState<string>("");
    const [neighbourhood, setNeighbourhood] = useState('');
    const [gender, setGender] = useState('Man');
    const [cellphone, setCellPhone] = useState('');
    const [street, setStreet] = useState('');
    const [typeuser, setTypeUser] = useState('1');
    const [step, setStep] = useState(1);
    const [cepJSON, setCEPJSON] = useState<CEPjson | undefined>({} as CEPjson);
    const [avatarsource, setAvatarSource] = useState<ImagePickerResponse | null>();
    const [error, setError] = useState(false)
    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    function clearfields() {
        setFirstName('')
        setLastName('')
        setDateBirth('')
        setCPF_CNPJ('')
        setRG('')
        setCountry('')
        setState('')
        setCity('')
        setNumber('')
        setCEP('')
        setNeighbourhood('')
        setGender('')
        setCellPhone('')
        setStreet('')
        setCEPJSON({})
        setPassword('')
        setEmail('')
        setAvatarSource(null)
        setError(false)
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
                console.log(response.path)
                setAvatarSource(response);
            }
        });
    }

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

    async function createuser() {
        try {
            let objuser: User = {
                typeuser, firstname, lastname, gender, datebirth, cellphone, RG, cpf_cnpj, email, password,
                address: { CEP, city, country, neighbourhood, number, state, street }
            }

            if (validateCreateUser(objuser)) {
                const data = await CreateUser(objuser!)
                if (avatarsource && data) {
                    await AddAvatar(avatarsource, { idDocument: data.idDocument })
                }
                clearfields()
                Alert.alert('Criado com sucesso', 'Redirecionar para tela inical',
                [{
                    text: 'OK',
                    onPress: () => navigate('Login')
                }],
                {cancelable: false}
                )
            } else {
                setError(true)
                Alert.alert('Algum campo necessario nao preenchido')
            }
        } catch (error) {
            Alert.alert('Error no servidor, tente novamente mais tarde')
        }
    }

    function renderStep(step: number) {
        switch (step) {
            case 1:
                return (
                    <CommomData firstname={firstname} setFirstName={setFirstName}
                        datebirth={datebirth} setDateBirth={setDateBirth}
                        gender={gender} setGender={setGender}
                        lastname={lastname} setLastName={setLastName}
                        typeuser={typeuser} setTypeUser={setTypeUser}
                        showsErros={error}
                    />
                )
                break;
            case 2:
                return (
                    <IdentificationInfo RG={RG} setRG={setRG}
                        cpf_cnpj={cpf_cnpj} setCPF_CNPJ={setCPF_CNPJ}
                        cellphone={cellphone} setCellPhone={setCellPhone}
                        typeuser={typeuser}
                        showsErros={error}
                    />
                )
                break;
            case 3:
                return (
                    <AddressInfo CEP={CEP} setCEP={setCEP}
                        city={city} setCity={setCity}
                        country={country} setCountry={setCountry}
                        neighbourhood={neighbourhood} setNeighbourhood={setNeighbourhood}
                        number={number} setNumber={setNumber}
                        state={state} setState={setState}
                        street={street} setStreet={setStreet}
                        showsErros={error}
                    />
                )
                break;
            case 4:
                return (
                    <LoginDatas email={email} setEmail={setEmail}
                        password={password} setPassword={setPassword}
                        avatarSource={avatarsource} getImage={getImage}
                        showsErros={error}
                    />
                )
            default:
                return null
                break;
        }
    }

    function FowardStep() {
        if (step < 4)
            setStep(step + 1)


    }

    function Stepback() {
        if (step > 1)
            setStep(step - 1)

    }

    function StateProgressBar(value: number) {
        return (
            <View style={{ width: '50%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: "center", alignContent: "center" }}>
                <Subheading style={{ alignSelf: "center", marginBottom: '3%' }}>
                    {translate('registration_progress')}
                </Subheading>
                <ProgressBar progress={value * 0.25} color='#fdd835' style={{ width: '100%', height: 10, alignSelf: "center", borderRadius: 50, elevation: 3 }} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
                {StateProgressBar(step)}
                {renderStep(step)}

                <View style={{ display: "flex", flexDirection: "row", width: '90%', justifyContent: "space-evenly", marginTop: '3%' }}>
                    {step > 1 ?
                        <Button mode="outlined"
                            onPress={() => Stepback()}
                            icon={() => <Icon size={13} name="step-backward" color={theme.colors.text} />}
                            style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                            color={theme.colors.text}
                        >
                            {translate('button_back')}
                        </Button>
                        :
                        null
                    }

                    {step === 4 ?
                        null
                        :
                        <Button mode="outlined"
                            onPress={() => FowardStep()}
                            icon={() => <Icon size={13} name="step-forward" color={theme.colors.text} />}
                            style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                            color={theme.colors.text}
                        >
                            {translate('button_next')}
                        </Button>
                    }

                </View>

                <View style={{ display: "flex", flexDirection: "column", width: '90%', justifyContent: "center", padding: 10, marginTop: 5 }}>
                    {step === 4 ?
                        <MainButton MainActionScreen={createuser} />
                        :
                        null
                    }

                    <Button mode="text"
                        onPress={() => { clearfields(), setStep(1), navigate('Login') }}
                        style={{ width: '50%', padding: 2, alignSelf: "center", justifyContent: "space-evenly" }}
                        color={theme.colors.notification}
                    >
                        {translate('button_cancel')}
                    </Button>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


export default RegisterScreen