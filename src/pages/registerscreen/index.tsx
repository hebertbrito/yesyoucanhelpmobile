import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Keyboard, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

import { styles } from './styles';

import { MainButton } from '../../components/buttons'

import { CommomData, IdentificationInfo, AddressInfo, LoginDatas } from './step-by-step';
import { SearchCEP } from '../../services/SearchCEP';
import { CEPjson } from 'src/models/CEPjson';
import { User } from '../../models/User';

import { CreateUser, SetAvatarUser } from '../../services/api/CreateUser'

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
    const [showsErros, setShowsErros] = useState<boolean>(false);
    const [avatarsource, setAvatarSource] = useState<ImagePickerResponse | null>();
    const [objUser, setObjUser] = useState<User | null>();

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };


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
                console.log(response.fileName)
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

    async function setavatar() {
        try {

            if (avatarsource) {
                await SetAvatarUser(avatarsource)
            }

        } catch (error) {
            console.log(error)
        }
    }

    function ValidateDATA() {
        // const objUser: User = {
        //     firstname, lastname, datebirth, cpf_cnpj, RG, email,
        //     password, gender, cellphone, typeuser,
        //     address: {
        //         CEP, city, country, neighbourhood,
        //         number, state, street
        //     },
        //     avatarsource
        // }

        // setObjUser({
        //     firstname, lastname, datebirth, cpf_cnpj, RG, email,
        //     password, gender, cellphone, typeuser,
        // })

        // if (firstname == undefined || firstname!.length < 3)
        //     setShowsErros(true)

        // console.log('******depois do if *****')
        // console.log(showsErros)
        // if (lastname == undefined || lastname!.length < 3)
        //     setShowsErros(true)

        // if (typeuser! === '1') {

        //     if (datebirth!.length != 8)
        //         setShowsErros(true)

        //     if (RG!.length < 7 || RG!.length == 8)
        //         setShowsErros(true)

        // }

        // if (cellphone == undefined || cellphone!.length < 10)
        //     setShowsErros(true)


        // if (CEP == undefined || CEP!.length != 8)
        //     setShowsErros(true)

        // if (number == undefined || number!.length < 1)
        //     setShowsErros(true)

        // if (neighbourhood == undefined || neighbourhood!.length < 10)
        //     setShowsErros(true)

        // if (street == undefined || street!.length < 10)
        //     setShowsErros(true)

        // if (city == undefined || city!.length < 5)
        //     setShowsErros(true)

        // if (state == undefined || state!.length != 2)
        //     setShowsErros(true)

        // if (country == undefined || country!.length != 2)
        //     setShowsErros(true)

        // if (email == undefined || email!.length < 10)
        //     setShowsErros(true)

        // if (password == undefined || password!.length < 6)
        //     setShowsErros(true)



    }

    async function InsertUser() {
        try {

            setObjUser({
                firstname, lastname, datebirth, cpf_cnpj, RG, email,
                password, gender, cellphone, typeuser,
                address: {
                    CEP, city, country, neighbourhood,
                    number, state, street
                },
                avatarsource: {
                    uri: avatarsource?.uri,
                    fileSize: avatarsource?.fileSize,
                    fileName: avatarsource?.fileName,
                    type: avatarsource?.type,
                    path: avatarsource?.path
                }
            })

            console.log('*****dentro da função testeInsertUser')
            console.log(objUser)

            if (objUser != null && objUser != undefined) {
                await CreateUser(objUser)

            }


        } catch (error) {
            console.log(error)
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
                        showsErros={showsErros}
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
                        avatarSource={avatarsource} getImage={getImage}
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

                {renderStep(step)}

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

                    {step === 4 ?
                        null
                        :
                        <Button mode="outlined"
                            onPress={() => FowardStep()}
                            icon={() => <Icon size={13} name="step-forward" color={theme.colors.text} />}
                            style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: theme.colors.text }}
                            color={theme.colors.text}
                        >
                            Next
                        </Button>
                    }

                </View>

                <View style={{ display: "flex", flexDirection: "column", width: '90%', justifyContent: "center", padding: 10, marginTop: 5 }}>
                    {step === 4 ?
                        <MainButton MainActionScreen={InsertUser} />
                        :
                        null
                    }

                    <Button mode="text"
                        onPress={() => setavatar()}
                        style={{ width: '50%', padding: 2, alignSelf: "center", justifyContent: "space-evenly" }}
                        color={theme.colors.notification}
                    >
                        Cancel
                    </Button>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


export default RegisterScreen