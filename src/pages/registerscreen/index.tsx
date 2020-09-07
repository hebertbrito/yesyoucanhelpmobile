import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Keyboard, View } from 'react-native';
import { Title, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from './styles'

import { CommomData, IdentificationInfo, AddressInfo, LoginDatas } from './step-by-step'

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
    const [CEP, setCEP] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [gender, setGender] = useState('Man');
    const [cellphone, setCellPhone] = useState('');
    const [street, setStreet] = useState('');
    const [typeuser, setTypeUser] = useState('1');
    const [step, setStep] = useState(1);

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