import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, TextInput, Text, Title, Avatar, IconButton, Subheading } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import AuthContext from '../../context/auth';

import { AvatarUser as AvatarComponent } from '../../components/avataruser'

import { GetUserProfile } from '../../services/api/GetProfile'
import { User } from 'src/models/User';
import { AvatarUser } from '../../models/AvatarUser'


import { styles } from './styles'

interface Props {
    theme: any,
}

function ProfileScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [dataBirth, setDataBirth] = useState('');
    const [genderCheck, setGenderCheck] = useState('first');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [State, setState] = useState('');
    const [editableInput, setEditableInput] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [findData, setFindData] = useState(true);
    const [usermodel, setUserModel] = useState<User | undefined>({} as User);
    const [avatarSource, setAvatarSource] = useState<AvatarUser>({} as AvatarUser);



    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    console.log(findData)

    useEffect(() => {
        setEditableInput(false);
        setFindData(true)
    }, [])

    useEffect(() => {

        async function any() {
            const response = await GetUserProfile(user);

            if (response) {
                setUserModel(response)
                if (response.avatarsource) {
                    console.log('*******avatar sourcer valor')
                    setAvatarSource(response.avatarsource!)
                    console.log(avatarSource)

                }
                setIsloading(false)
            }
        }
        if (findData) {
            any();
            setFindData(false);
        }

    }, [findData])


    const iconEdit = () => {
        return (
            <Icon name="user-edit" color="#3B58FF" size={20} />
        )
    }

    const enableInput = () => {
        setEditableInput(!editableInput ? true : false)
    }

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
                setAvatarSource({
                    fileSize: response.fileSize,
                    path: response.path,
                    type: response.type,
                    uri: response.uri,
                    fileName: response.fileName

                });
            }
        });
    }

    return (

        isLoading ?
            <View><Text>Poha</Text></View>
            :
            <SafeAreaView style={styles.safeView}>
                <View style={styles.viewContainer} >
                    <LinearGradient colors={['#F06C00', '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
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
                            {avatarSource ?
                                <AvatarComponent avatarSource={avatarSource} size={100} />
                                :
                                <Avatar.Image size={100} source={require('../../assets/imageperfil/hebert.jpg')} style={{ alignSelf: "center", }} />
                            }
                            <IconButton
                                icon="camera"
                                size={20}
                                color={theme.colors.text}
                                onPress={() => getImage()}
                                style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%' }}>
                        <IconButton
                            icon={iconEdit}
                            size={25}
                            style={{ marginRight: '9%', marginTop: '2%', alignSelf: "flex-end" }}
                            onPress={() => enableInput()}
                        />
                    </View>
                    <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.subContainerScroll}>
                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>First Name: </Subheading>
                                    <Text>{usermodel!.firstname!}</Text>
                                </View>
                                {editableInput &&
                                    <TextInput
                                        value={firstName}
                                        onChangeText={text => setFirstName(text)}
                                        placeholder="New FirstName"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '60%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New FirstName"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Lastname: </Subheading>
                                    <Text>{usermodel!.lastname!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={lastName}
                                        onChangeText={text => setlastName(text)}
                                        placeholder="New LastName"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '60%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New LastName"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Date Birth: </Subheading>
                                    <Text>{usermodel?.datebirth!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={dataBirth}
                                        onChangeText={text => setDataBirth(text)}
                                        placeholder="New DataBirth"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '60%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New DataBirth"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>CPF/CNPJ: </Subheading>
                                    <Text>{usermodel!.cpf_cnpj!}</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>RG: </Subheading>
                                    <Text>{usermodel?.RG!}</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Country: </Subheading>
                                    <Text>{usermodel!.address?.country!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={country}
                                        onChangeText={text => setCountry(text)}
                                        placeholder="New Country"
                                        keyboardAppearance="light"
                                        keyboardType="default"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '40%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New Country"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>State: </Subheading>
                                    <Text>{usermodel!.address!?.state!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={State}
                                        onChangeText={text => setState(text)}
                                        placeholder="New State"
                                        keyboardAppearance="light"
                                        keyboardType="default"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '40%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New State"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>City: </Subheading>
                                    <Text>{usermodel!.address!?.city!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={city}
                                        onChangeText={text => setCity(text)}
                                        placeholder="New City"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '50%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New City"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Number: </Subheading>
                                    <Text>{usermodel!.address!?.number!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={number}
                                        onChangeText={text => setNumber(text)}
                                        placeholder="New Number"
                                        keyboardAppearance="light"
                                        keyboardType="numeric"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '30%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New Number"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>CEP: </Subheading>
                                    <Text>{usermodel!.address!?.CEP!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={number}
                                        onChangeText={text => setNumber(text)}
                                        placeholder="New CEP"
                                        keyboardAppearance="light"
                                        keyboardType="numeric"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '30%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New CEP"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Country: </Subheading>
                                    <Text>{usermodel!.address!?.country!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={number}
                                        onChangeText={text => setNumber(text)}
                                        placeholder="New Country"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '30%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New Country"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Street: </Subheading>
                                    <Text>{usermodel!.address!?.street!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={number}
                                        onChangeText={text => setNumber(text)}
                                        placeholder="New Street"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '30%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New Street"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Email: </Subheading>
                                    <Text>{usermodel!.email!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        placeholder="name@example.com"
                                        keyboardAppearance="light"
                                        keyboardType="email-address"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '90%' }}
                                        focusable={false}
                                        mode="flat"
                                        label="New Email"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Passsword: </Subheading>
                                    <Text>{usermodel!.password!}</Text>
                                </View>

                                {editableInput &&
                                    <TextInput
                                        secureTextEntry={true}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        placeholder="New Password"
                                        keyboardAppearance="light"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '90%' }}
                                        mode="flat"
                                        label="New Password"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={editableInput}
                                    />
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
    )
}



export default ProfileScreen;