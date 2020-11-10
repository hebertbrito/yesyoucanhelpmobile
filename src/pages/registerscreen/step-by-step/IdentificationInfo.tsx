import React from 'react';
import { useTheme, TextInput, Card, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import translate from '../../../services/translate/translate';


interface IdentificationInfo {
    cpf_cnpj: string,
    setCPF_CNPJ: React.Dispatch<React.SetStateAction<string>>,
    RG: string,
    setRG: React.Dispatch<React.SetStateAction<string>>,
    typeuser: string,
    cellphone: string,
    setCellPhone: React.Dispatch<React.SetStateAction<string>>,
    showsErros: boolean
}

export function IdentificationInfo(props: IdentificationInfo) {

    const theme = useTheme();

    const { RG, setRG, cpf_cnpj, setCPF_CNPJ, typeuser, cellphone, setCellPhone, showsErros } = props;

    return (
        < Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }}
            animation="fadeInRight" useNativeDriver={true} easing={"ease-in-out"}>
            <Card style={{ display: "flex", flexDirection: "column", width: '100%', backgroundColor: '#eeeeee', elevation: 4 }}>
                <Card.Content style={{ backgroundColor: '#eeeeee' }}>
                    <Title style={{ color: '#000000' }}>
                        {translate('identification_info')}
                    </Title>
                    <TextInput
                        value={cpf_cnpj}
                        onChangeText={text => setCPF_CNPJ(text)}
                        placeholder={`${translate('example')}: 9999999999`}
                        label={`${translate('cpf_npj')}*`}
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '96.5%' }}
                        placeholderTextColor={theme.colors.text}
                        theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        maxLength={15}
                        mode="outlined"
                        error={cpf_cnpj.length < 11 && showsErros}
                    />

                    {typeuser == '1' ?
                        <TextInput
                            value={RG}
                            onChangeText={text => setRG(text)}
                            placeholder={`${translate('example')}: 9999999999`}
                            label={`${translate('rg')}*`}
                            keyboardType="numeric"
                            style={{ marginTop: 10, width: '96.5%' }}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={10}
                            mode="outlined"
                            error={RG.length < 9 && showsErros}
                        />
                        :
                        null
                    }

                    <TextInput
                        value={cellphone}
                        onChangeText={text => setCellPhone(text)}
                        placeholder={`${translate('example')}: DDXXXXXXXXX`}
                        label={`${translate('cellphone')}*`}
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '96.5%' }}
                        placeholderTextColor={theme.colors.text}
                        theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        maxLength={11}
                        mode="outlined"
                        error={cellphone.length < 10 && showsErros}
                    />
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}