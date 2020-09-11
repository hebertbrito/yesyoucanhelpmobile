import React from 'react';
import { View } from 'react-native';
import { Title, TextInput, useTheme, Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from './styles'

import { itemsDropdown } from '../../data/dataOrderscreen'

interface FormProduct {
    dropdownvalueproduct: string,
    setDropdownValueProduct: React.Dispatch<React.SetStateAction<string>>,
    numberInput: string,
    setNumberInput: React.Dispatch<React.SetStateAction<string>>,
    descriptionInput: string,
    setDescriptionInput: React.Dispatch<React.SetStateAction<string>>,
    addProduct(): void,
    showError: boolean,
}

export function FormProduct(props: FormProduct) {

    const paperTheme = useTheme();

    const { dropdownvalueproduct, setDropdownValueProduct, numberInput, setNumberInput,
        descriptionInput, setDescriptionInput, addProduct, showError
    } = props;

    return (
        <>
            <View style={{
                width: '85%', height: 210, marginTop: '3%', marginBottom: '4%',
                borderRadius: 20, backgroundColor: paperTheme.colors.background, shadowColor: '#FAFAFA',
                shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 16.00, elevation: 20, display: "flex",
                flexDirection: "column",
            }}>
                <View style={{
                    width: '100%', alignItems: "center", backgroundColor: paperTheme.colors.surface,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '20%', justifyContent: "center"
                }}>
                    <Title style={{ color: '#fafafa' }}>
                        Item
                </Title>
                </View>

                <View style={styles.bodyCard_1}>
                    <Picker mode="dialog" style={{ width: '50%', color: paperTheme.colors.text, alignItems: "center", alignContent: "center", justifyContent: "center" }}
                        selectedValue={dropdownvalueproduct}
                        onValueChange={(itemvalue, itemindex) => setDropdownValueProduct(itemvalue.toString())}
                    >
                        {itemsDropdown.length > 0 && (
                            itemsDropdown.map((item) => {
                                return (
                                    <Picker.Item key={item.id} label={item.name} value={item.name} />
                                )
                            })
                        )}
                    </Picker>
                    <TextInput
                        mode="outlined"
                        value={numberInput}
                        onChangeText={text => setNumberInput(text)}
                        placeholder="00,0-0"
                        label="Size/Quantity*"
                        keyboardType="number-pad"
                        maxLength={6}
                        underlineColorAndroid={paperTheme.colors.text}
                        placeholderTextColor={paperTheme.colors.text}
                        style={{ width: '48%', color: paperTheme.colors.text, height: 50 }}
                        theme={{ colors: { placeholder: paperTheme.colors.text, primary: paperTheme.colors.surface } }}
                        returnKeyType="next"
                        error={numberInput.length == 0 && showError ? true : false}
                    />
                </View>

                <View style={{ padding: 5, width: '100%', alignItems: "center" }}>
                    <TextInput
                        value={descriptionInput}
                        onChangeText={(text) => setDescriptionInput(text.toString())}
                        mode="outlined"
                        multiline={true}
                        numberOfLines={3}
                        maxLength={150}
                        placeholder="About the product you will be contributing to..."
                        label="Description*"
                        underlineColorAndroid={paperTheme.colors.text}
                        placeholderTextColor={paperTheme.colors.text}
                        style={{ color: paperTheme.colors.text, width: '96%' }}
                        theme={{ colors: { placeholder: paperTheme.colors.text, primary: paperTheme.colors.surface } }}
                        returnKeyType="next"
                        error={numberInput.length < 5 && showError ? true : false}
                    />

                </View>

            </View>

            <Button mode="outlined"
                onPress={() => { addProduct() }}
                icon={() => <Icon size={13} name="plus" color={paperTheme.colors.text} />}
                style={{
                    width: '40%', padding: 2, alignSelf: "center", justifyContent: "space-evenly",
                    borderWidth: 1, borderColor: paperTheme.colors.text
                }}
                color={paperTheme.colors.text}
            >
                Product
            </Button>
        </>
    )
}