import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, IconButton, Paragraph, Divider, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

//dataOrderMenu
import { itemsDropdown, addressesDropdown } from '../../data/dataOrderscreen'

//screens
import { styles } from './styles'
import { CurrentRenderContext } from '@react-navigation/native';


import ListProduct from './listproduct'

interface ModelList {
    product: string,
    number: string,
    description: string
}

const OrderScreen = () => {
    const paperTheme = useTheme();
    let LSTPRODUCTS: ModelList[]=[];

    const [numberInput, setNumberInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("")
    const [dropdownvalueaddress, setDropdownValueAddress] = useState("")
    const [lstProducts, setLstProducts] = useState<any>([]);
    const [checked, setChecked] = useState('first');

    const iconExclude = () => {
        return (
            <Icon name="trash-alt" size={20} color="red" />
        )
    }

    const teste = () => {
        
        setLstProducts([...lstProducts,
        {
            id: Math.floor(Math.random() * 10) +1,
            product: dropdownvalueproduct,
            description: descriptionInput,
            number: numberInput
        }])
        console.log(lstProducts)
    }

    return (
        <ScrollView style={styles.containerSafe}
            contentContainerStyle={{
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Title style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10, fontWeight: "bold", letterSpacing: 1.3 }}>Contributions</Title>
            <View style={styles.containerCard}>
                <View style={styles.card}>
                    <View style={styles.titleCard}>
                        <Subheading style={styles.titleText}>Item Product</Subheading>
                    </View>
                    <View style={styles.bodyCard_1}>
                        <Picker mode="dropdown" style={{ width: '50%', color: paperTheme.colors.text }}
                            selectedValue={dropdownvalueproduct}
                            onValueChange={(itemvalue, itemindex) => setDropdownValueProduct(itemvalue.toString())}
                        >
                            {itemsDropdown.length > 0 && (
                                itemsDropdown.map((item) => { 
                                    return (
                                        <Picker.Item key={item.id} label={item.name} value={item.name}/>
                                    )
                                })
                            )}
                        </Picker>
                        <TextInput
                            
                            defaultValue=""
                            value={numberInput}
                            onChangeText={text => setNumberInput(text)}
                            placeholder="number"
                            keyboardType="number-pad"
                            maxLength={3}
                            underlineColorAndroid={paperTheme.colors.text}
                            placeholderTextColor={paperTheme.colors.text}
                            style={{ width: '50%', color: paperTheme.colors.text }}

                        />
                    </View>
                    <View style={{ padding: 5 }}>
                        <TextInput
                            value={descriptionInput}
                            onChangeText={(text) => setDescriptionInput(text.toString())}
                            multiline={true}
                            numberOfLines={4}
                            maxLength={150}
                            autoCompleteType="off"
                            placeholder="Description"
                            underlineColorAndroid={paperTheme.colors.text}
                            placeholderTextColor={paperTheme.colors.text}
                            style={{ color: paperTheme.colors.text, width: '99%' }}
                        />
                    </View>
                </View>
            </View>
            <Button color={'#fafafa'} style={styles.button_produt_add}
                onPress={() => teste()}
            >+ Product</Button>
                
            {<ListProduct lstProducts={lstProducts}/>}


            <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

            <View style={styles.containerCheckpoint}>
                <Subheading style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: paperTheme.colors.text,
                    padding: 5
                }}
                >
                    Checkpoint</Subheading>
                <View style={styles.viewCardCheckBox}>
                    <View style={styles.itemCheckBox}>
                        <Text style={{ color: '#000000' }}>Send Product to branch</Text>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                    <View style={styles.itemCheckBox}>
                        <Text style={{ color: '#000000' }}>Choose a meeting place</Text>
                        <RadioButton
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                </View>
                <View>
                    <Picker mode="dropdown" style={{ width: '50%', color: paperTheme.colors.text }} 
                        selectedValue={dropdownvalueaddress}
                        onValueChange={(itemvalue, itemindex) => setDropdownValueAddress(itemvalue.toString())}
                    >
                        {addressesDropdown.length > 0 && (
                            addressesDropdown.map((item) => {
                                return (
                                    <Picker.Item key={item.id} label={item.address} value={item.address} />
                                )
                            })
                        )}
                    </Picker>
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderScreen;