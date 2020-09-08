import React from 'react';
import { useTheme, TextInput, Card, Title, Avatar, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface LoginDatas {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    avatarSource: any,
    getImage(): void
}

export function LoginDatas(props: LoginDatas) {

    const theme = useTheme();

    const { email, setEmail, password, setPassword, avatarSource, getImage } = props;

    return (
        <Animatable.View style={{ justifyContent: "center", marginTop: 5, width: '90%' }} easing="ease-in-out" animation="fadeInRight" useNativeDriver={true}>
            <Card>
                <Card.Content>
                    <Title style={{ color: '#000000' }}> Login Datas</Title>

                    <View style={{ display: "flex", alignItems: "center" }}>
                        {avatarSource ?
                            <Avatar.Image size={100} source={{ uri: avatarSource.uri }} style={{ alignSelf: "center", }} />
                            :
                            <Icon size={60} name="user" />
                        }
                        <IconButton
                            icon="camera"
                            size={20}
                            color={theme.colors.text}
                            onPress={() => getImage()}
                            style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
                        />
                    </View>

                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder="exemple: test@teste.com"
                            label="Email"
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '100%' }}
                            placeholderTextColor={theme.colors.text}
                            maxLength={50}
                            mode="outlined"
                            theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        />

                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="Password"
                            label="Password"
                            style={{ marginTop: 10, width: '100%' }}
                            placeholderTextColor={theme.colors.text}
                            selectionColor={theme.colors.text}
                            mode="outlined"
                            theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                        />
                    </View>
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}