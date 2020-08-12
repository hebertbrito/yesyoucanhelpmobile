import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, IconButton, Paragraph, Divider, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';



//dataOrderMenu
import { itemsDropdown, addressesDropdown } from '../../data/dataOrderscreen'

//screens
import { styles } from './styles'


const OrderScreen = () => {
    const paperTheme = useTheme();

    const [numberInput, setNumberInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [dropdownvalueproduct, setDropdownValueProduct] = useState('')
    const [dropdownvalueaddress, setDropdownValueAddress] = useState('')
    const [lstProducts, setLstProducts] = useState([])
    const [checked, setChecked] = useState('first');

    const iconExclude = () => {
        return (
            <Icon name="trash-alt" size={20} color="red" />
        )
    }

    return (
        <SafeAreaView style={styles.containerSafe}>
            <Title style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10 }}>Contributions</Title>
            <View style={styles.containerCard}>
                <View style={{ display: "flex", flexDirection: "column" }}>
                    <View style={{ height: '23%', alignItems: "center", justifyContent: "center", backgroundColor: "#ef6c00", borderBottomWidth: 1, borderColor: '#000000' }}>
                        <Subheading style={{ alignSelf: "center", color: '#000000' }}>Item Product</Subheading>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", padding: 5 }}>
                        <Picker mode="dropdown" style={{ width: '50%', color: paperTheme.colors.text }}
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
                            value={numberInput}
                            onChangeText={(text) => setNumberInput(text)}
                            placeholder="number"
                            keyboardType="number-pad"
                            maxLength={3}
                            underlineColorAndroid={paperTheme.colors.text}
                            placeholderTextColor={paperTheme.colors.text}
                            style={{ width: '50%', color: paperTheme.colors.text }}
                        />
                    </View>
                    <View>
                        <TextInput
                            value={descriptionInput}
                            onChangeText={(text) => setDescriptionInput(text)}
                            multiline={true}
                            numberOfLines={4}
                            maxLength={150}
                            autoCompleteType="off"
                            placeholder="Description"
                            underlineColorAndroid={paperTheme.colors.text}
                            placeholderTextColor={paperTheme.colors.text}
                            style={{ color: paperTheme.colors.text }}
                        />
                    </View>
                </View>
            </View>
            <Button color={'#fafafa'} style={{ margin: 5, backgroundColor: '#000000', width: '70%' }}>+ Product</Button>


            <View style={{ width: '95%', height: 120, marginTop: 15 }}>
                <Subheading style={{ alignSelf: "center" }}>List of All Products</Subheading>
                <ScrollView style={{ width: '100%', backgroundColor: '#eeeeee', paddingTop: 5 }}
                    showsVerticalScrollIndicator={true}
                    indicatorStyle="black"
                    pinchGestureEnabled={true}
                >
                    <View style={{ width: '95%', display: "flex", flexDirection: "column", borderColor: '#fdd835', borderWidth: 2, alignSelf: "center" }}>
                        <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#fdd835", alignItems: "center" }}>
                            <Subheading style={{ margin: 8, color: paperTheme.colors.onBackground }}>Clothes</Subheading>
                            <Text style={{ color: paperTheme.colors.onBackground }}> - </Text>
                            <Text style={{ margin: 8, color: paperTheme.colors.onBackground }}>16</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#fafafa" }}>
                            <View style={{ width: '90%' }}>
                                <Paragraph style={{ margin: 5, color: paperTheme.colors.onBackground }}>descrição</Paragraph>
                            </View>
                            <IconButton
                                icon={iconExclude}
                                onPress={() => console.log('Pressed')}
                                animated={true}
                            />
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: paperTheme.colors.accent, marginTop: 10, marginBottom: 10 }} />
                </ScrollView>
            </View>
            <View style={{ width: '95%', display: "flex", flexDirection: "column", marginTop: 15 }}>
                <Subheading style={{ alignSelf: "flex-start", margin: 5, padding: 3 }}>Checkpoint</Subheading>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#ef6c00" }}>
                        <Text style={{color: '#000000'}}>Send Product to branch</Text>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#ef6c00"}}>
                        <Text style={{color: '#000000'}}>Choose a meeting place</Text>
                        <RadioButton
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                </View>
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
        </SafeAreaView>
    )
}

export default OrderScreen;