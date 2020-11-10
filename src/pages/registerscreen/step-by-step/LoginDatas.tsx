import React from 'react';
import { useTheme, TextInput, Card, Title, Avatar, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/EvilIcons';

//services
import translate from '../../../services/translate/translate';

interface LoginDatas {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    avatarSource: any,
    getImage(): void,
    showsErros: boolean
}

export function LoginDatas(props: LoginDatas) {

    const theme = useTheme();

    const { email, setEmail, password, setPassword, avatarSource, getImage, showsErros } = props;

    return (
        <Animatable.View style={{ justifyContent: "center", marginTop: 5, width: '90%' }} easing="ease-in-out" animation="fadeInRight" useNativeDriver={true}>
            <Card style={{ backgroundColor: '#eeeeee', elevation: 4 }}>
                <Card.Content style={{ backgroundColor: '#eeeeee' }}>
                    <Title style={{ color: '#000000' }}>
                        {translate('login_datas')}
                    </Title>

                    <View style={{
                        width: '100%',
                        backgroundColor: '#eeeeee',
                        alignItems: "center", justifyContent: "center"
                    }}>
                        <View style={{ display: "flex", alignItems: "center" }}>
                            {avatarSource ?
                                <Avatar.Image size={100} source={{ uri: avatarSource.uri }} style={{ alignSelf: "center", }} />
                                :
                                <Avatar.Image size={100} source={require('../../../assets/imageperfil/defaultavatar.jpg')} style={{ alignSelf: "center", }} />
                            }
                            <IconButton
                                icon="camera"
                                size={20}
                                color={theme.colors.onBackground}
                                onPress={() => getImage()}
                                style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
                            />
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder={`${translate('example')}: test@test.com`}
                            label={`${translate('email')}*`}
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '100%' }}
                            placeholderTextColor={theme.colors.text}
                            maxLength={50}
                            mode="outlined"
                            theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            error={email.length < 10 && showsErros}
                        />

                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder={`${translate('password')}`}
                            label={`${translate('password')}*`}
                            style={{ marginTop: 10, width: '100%' }}
                            placeholderTextColor={theme.colors.text}
                            selectionColor={theme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            error={password.length < 5 && showsErros}
                        />
                    </View>
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}