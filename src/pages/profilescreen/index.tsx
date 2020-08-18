import React from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, TextInput, Text, Title, Avatar, IconButton, Subheading } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

import { styles } from './styles'

interface Props {
    theme: any,
}

class ProfileScreen extends React.Component<Props> {

    options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    state = {
        step: 1,
        firstName: '',
        lastName: '',
        dataBirth: '',
        genderCheck: 'first',
        cpf_cnpj: '',
        RG: '',
        country: '',
        street: '',
        city: '',
        number: '',
        email: '',
        password: '',
        State: '',
        editableInput: false,
        avatarSource: ''
    }

    componentDidMount() {
        this.setState({ editableInput: false })
    }

    iconEdit = () => {
        return (
            <Icon name="user-edit" color="#3B58FF" size={20} />
        )
    }

    enableInput = () => {
        this.setState({ editableInput: !this.state.editableInput ? true : false })
    }

    getImage = () => {
        ImagePicker.launchImageLibrary(this.options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                this.setState({
                    avatarSource: response,
                });
            }
        });
    }

    render() {

        const { theme } = this.props

        return (
            <SafeAreaView style={styles.safeView}>
                <View style={styles.viewContainer} >
                    <LinearGradient colors={['#F06C00', '#F8B00C', '#fdd835']} style={styles.LinearGradient}>
                        <Title style={{marginTop: '5%'}}>
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
                            {this.state.avatarSource ?
                                <Avatar.Image size={100} source={{ uri: this.state.avatarSource.uri }} style={{ alignSelf: "center", }} />
                                :
                                <Avatar.Image size={100} source={require('../../assets/imageperfil/hebert.jpg')} style={{ alignSelf: "center", }} />
                            }
                            <IconButton
                                icon="camera"
                                size={20}
                                color={theme.colors.text}
                                onPress={
                                    () => this.getImage()
                                }
                                style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%' }}>
                        <IconButton
                            icon={this.iconEdit}
                            size={25}
                            style={{ marginRight: '9%', marginTop: '2%', alignSelf: "flex-end" }}
                            onPress={() => this.enableInput()}
                        />
                    </View>
                    <ScrollView style={{ width: '100%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.subContainerScroll}>
                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>First Name: </Subheading>
                                    <Text>Hebert</Text>
                                </View>
                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.firstName}
                                        onChangeText={text => this.setState({ firstName: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Lastname: </Subheading>
                                    <Text>Oliviera</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.lastName}
                                        onChangeText={text => this.setState({ lastName: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Date Birth: </Subheading>
                                    <Text>18/09/1997</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.dataBirth}
                                        onChangeText={text => this.setState({ dataBirth: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>CPF/CNPJ: </Subheading>
                                    <Text>26156286873</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>RG: </Subheading>
                                    <Text>439931408</Text>
                                </View>
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Country: </Subheading>
                                    <Text>BR</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.country}
                                        onChangeText={text => this.setState({ country: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>State: </Subheading>
                                    <Text>SP</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.State}
                                        onChangeText={text => this.setState({ State: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>City: </Subheading>
                                    <Text>Paulinia</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.city}
                                        onChangeText={text => this.setState({ city: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Number: </Subheading>
                                    <Text>344</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.number}
                                        onChangeText={text => this.setState({ number: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Email: </Subheading>
                                    <Text>name@example.com</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ country: text })}
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
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>

                            <View style={styles.containerInput}>
                                <View style={styles.view_1_input}>
                                    <Subheading>Passsword: </Subheading>
                                    <Text>*******************</Text>
                                </View>

                                {this.state.editableInput &&
                                    <TextInput
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        onChangeText={text => this.setState({ password: text })}
                                        placeholder="New Password"
                                        keyboardAppearance="light"
                                        style={{ margin: 10, color: `${theme.colors.text}`, width: '90%' }}
                                        mode="flat"
                                        label="New Password"
                                        underlineColor={theme.colors.text}
                                        placeholderTextColor={theme.colors.text}
                                        selectionColor={theme.colors.text}
                                        theme={{ colors: { primary: '#fdd835', placeholder: theme.colors.text } }}
                                        editable={this.state.editableInput}
                                    />
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

}

export default ProfileScreen;