import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Keyboard, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

import { styles } from './styles';

import { CommomData, IdentificationInfo, AddressInfo, LoginDatas } from './step-by-step';
import { SearchCEP } from '../../services/SearchCEP';
import { CEPjson } from 'src/models/CEPjson';
import { User } from '../../models/User';

function RegisterScreen({ ...props }) {

    const theme = useTheme();

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
    const [showsErros, setShowsErros] = useState(false);
    const [avatarSource, setAvatarSource] = useState<any>();

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    const getImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
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

            setStreet(cepJSON.logradouro!)
            setCity(cepJSON.localidade!);
            setNeighbourhood(cepJSON.bairro!);
            setState(cepJSON.uf!)

        }

    }, [cepJSON])

    function ValidateDATA() {
        const objUser: User = {
            firstname, lastname, datebirth, cpf_cnpj, RG, email,
            password, gender, cellphone, typeuser,
            address: {
                CEP, city, country, neighbourhood,
                number, state, street
            },
            avatarsource: avatarSource
        }

        if (objUser) {
            setShowsErros(true)
        }

        if (objUser.firstname!.length == 0)
            setShowsErros(true)

        if (objUser.lastname!.length == 0)
            setShowsErros(true)

        if (objUser.typeuser! === '1') {

            if (objUser.datebirth!.length != 8)
                setShowsErros(true)

            if (objUser.RG!.length < 7 || objUser.RG!.length == 8)
                setShowsErros(true)

        }



    }


    function renderSwitch(step: number) {
        switch (step) {
            case 1:
                return (
                    <CommomData firstname={firstname} setFirstName={setFirstName}
                        datebirth={datebirth} setDateBirth={setDateBirth}
                        gender={gender} setGender={setGender}
                        lastname={lastname} setLastName={setLastName}
                        typeuser={typeuser} setTypeUser={setTypeUser}
                    />
                )
                break;
            case 2:
                return (
                    <IdentificationInfo RG={RG} setRG={setRG}
                        cpf_cnpj={cpf_cnpj} setCPF_CNPJ={setCPF_CNPJ}
                        cellphone={cellphone} setCellPhone={setCellPhone}
                        typeuser={typeuser}
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
                    />
                )
                break;
            case 4:
                return (
                    <LoginDatas email={email} setEmail={setEmail}
                        password={password} setPassword={setPassword}
                        avatarSource={avatarSource} getImage={getImage}
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

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>

                {renderSwitch(step)}

                <View style={{ display: "flex", flexDirection: "row", width: '90%', justifyContent: "space-evenly", marginTop: '3%' }}>
                    {step > 1 ?
                        <Button mode="outlined"
                            onPress={() => Stepback()}
                            icon={() => <Icon size={13} name="step-backward" color={theme.colors.text} />}
                            style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                            color={theme.colors.text}
                        >
                            Back
                        </Button>
                        :
                        null
                    }

                    <Button mode="outlined"
                        onPress={() => FowardStep()}
                        icon={() => <Icon size={13} name="step-forward" color={theme.colors.text} />}
                        style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                        color={theme.colors.text}
                    >
                        Next
                    </Button>
                </View>

                <View style={{ display: "flex", flexDirection: "column", width: '90%', justifyContent: "center", padding: 10, marginTop: 5 }}>
                    {step === 4 ?
                        <Button mode="contained"
                            onPress={() => { }}
                            icon={() => <Icon size={15} name='paper-plane' color='#000000' />}
                            style={{ width: '50%', padding: 2, alignSelf: "center", justifyContent: "space-evenly" }}
                            color="#76ff03"
                        >
                            Send
                        </Button>
                        :
                        null
                    }


                    <Button mode="text"
                        onPress={() => { }}
                        style={{ width: '50%', padding: 2, alignSelf: "center", justifyContent: "space-evenly" }}
                        color="#ff3d00"
                    >
                        Cancel
                    </Button>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


export default RegisterScreen