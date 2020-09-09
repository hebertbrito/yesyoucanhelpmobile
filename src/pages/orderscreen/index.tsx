import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Keyboard } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, Divider, RadioButton, Headline, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

//dataOrderMenu
import { addressesDropdown } from '../../data/dataOrderscreen'

import { FormProduct } from '../../components/formproduct'

//screens
import { styles } from './styles'


import ListProduct from './listproduct'

interface ModelList {
    product: string,
    number: string,
    description: string
}

const OrderScreen = () => {
    const paperTheme = useTheme();

    const [numberInput, setNumberInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("")
    const [dropdownvalueaddress, setDropdownValueAddress] = useState("")
    const [lstProducts, setLstProducts] = useState<any>([] as any);
    const [checked, setChecked] = useState('ChoseMPlace');
    const [counterId, setCounterId] = useState<number>(0);

    const iconExclude = () => {
        return (
            <Icon name="trash-alt" size={20} color="red" />
        )
    }

    const addProduct = () => {

        setLstProducts([...lstProducts,
        {
            id: counterId,
            product: dropdownvalueproduct,
            description: descriptionInput,
            number: numberInput
        }])

        setCounterId(counterId + 1)
        console.log(lstProducts)
    }


    return (
        <ScrollView style={styles.containerSafe}
            contentContainerStyle={{
                alignContent: "center",
                alignItems: "center",
            }}
            pagingEnabled={true}
            nestedScrollEnabled={true}
        >
            <Headline style={{
                color: paperTheme.colors.text, marginTop: 10, marginBottom: 10,
                fontWeight: "bold"
            }}
            >
                Contribution
            </Headline>

            <FormProduct dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct}
                numberInput={numberInput} setNumberInput={setNumberInput}
                descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}
                addProduct={addProduct}
            />

            {<ListProduct lstProducts={lstProducts} />}


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
                        <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Send Product to branch</Text>
                        <RadioButton
                            value="SendBranch"
                            status={checked === 'SendBranch' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('SendBranch')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                    <View style={styles.itemCheckBox}>
                        <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Choose a meeting place</Text>
                        <RadioButton
                            value="ChoseMPlace"
                            status={checked === 'ChoseMPlace' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('ChoseMPlace')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                </View>
                {checked === "ChoseMPlace" &&
                    <View>
                        <Picker mode="dialog" style={{ width: '50%', color: paperTheme.colors.text }}
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
                }
                <View style={{ width: '95%' }}>
                    <Button icon={() => <Icon name='paper-plane' size={20} />}
                        mode="contained" color="#76ff03"
                        style={{ width: '55%', alignSelf: "center", marginBottom: 10, marginTop: 15 }}
                        onPress={() => { }}
                    >
                        Send
                        </Button>
                </View>
            </View>
        </ScrollView >
    )
}

export default OrderScreen;