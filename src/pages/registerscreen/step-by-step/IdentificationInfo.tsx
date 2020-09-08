import React from 'react';
import { useTheme, TextInput, Card, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';


interface IdentificationInfo {
    cpf_cnpj: string,
    setCPF_CNPJ: React.Dispatch<React.SetStateAction<string>>,
    RG: string,
    setRG: React.Dispatch<React.SetStateAction<string>>,
    typeuser: string,
    cellphone: string,
    setCellPhone: React.Dispatch<React.SetStateAction<string>>
}

export function IdentificationInfo(props: IdentificationInfo) {

    const theme = useTheme();

    const { RG, setRG, cpf_cnpj, setCPF_CNPJ, typeuser, cellphone, setCellPhone } = props;

    return (
        < Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }}
            animation="fadeInRight" useNativeDriver={true} easing={"ease-in-out"}>
            <Card style={{ display: "flex", flexDirection: "column", width: '100%', justifyContent: "center", paddingLeft: '3%' }}>
                <Card.Content>
                    <Title style={{ color: '#000000' }}>Identification Info</Title>
                    <TextInput
                        value={cpf_cnpj}
                        onChangeText={text => setCPF_CNPJ(text)}
                        placeholder="exemple: 9999999999"
                        label="CPF/CNPJ"
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '96.5%' }}
                        placeholderTextColor={theme.colors.text}
                        theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        maxLength={15}
                        mode="outlined"
                    />

                    {typeuser == '1' ?
                        <TextInput
                            value={RG}
                            onChangeText={text => setRG(text)}
                            placeholder="exemple: 9999999999"
                            label="RG"
                            keyboardType="numeric"
                            style={{ marginTop: 10, width: '96.5%' }}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={10}
                            mode="outlined"
                        />
                        :
                        null
                    }

                    <TextInput
                        value={cellphone}
                        onChangeText={text => setCellPhone(text)}
                        placeholder="exemple: DDXXXXXXXXX"
                        label="Cellphone"
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '96.5%' }}
                        placeholderTextColor={theme.colors.text}
                        theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        maxLength={11}
                        mode="outlined"
                    />
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}