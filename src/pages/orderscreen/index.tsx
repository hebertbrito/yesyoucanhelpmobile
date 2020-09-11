import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, Keyboard } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, Divider, RadioButton, Headline, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../context/auth'

//dataOrderMenu
import { addressesDropdown } from '../../data/dataOrderscreen'
import { FormProduct } from '../../components/formproduct';
import { MainButton } from '../../components/buttons'
import ListProduct from './listproduct'
import { GetLatLongByCheckBox } from '../../mocks/getlatlongbycheckbox'

import { MakeContribution } from '../../services/api/MakeContribution'
import { MakeContributionModel } from '../../models/MakeContribution'

//screens
import { styles } from './styles'


const DEFAULTADDRESS = 'Rua Paulo Mazetto, 344 - Paulinia/SP';
interface ModelList {
    id: number,
    product: string,
    number: string,
    description: string
}

const OrderScreen = () => {
    const paperTheme = useTheme();
    const { user } = useContext(AuthContext);

    const [numberInput, setNumberInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("Clothes")
    const [dropdownvalueaddress, setDropdownValueAddress] = useState(DEFAULTADDRESS)
    const [lstProducts, setLstProducts] = useState<Array<ModelList>>([] as Array<ModelList>);
    const [checked, setChecked] = useState('ChoseMPlace');
    const [counterId, setCounterId] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);

    function resetStateCard() {
        setDescriptionInput('');
        setDropdownValueProduct('Clothes');
        setNumberInput('');
    }

    function addProduct() {

        if (dropdownvalueproduct.length != 0 && numberInput.length != 0 && descriptionInput.length > 5) {

            setLstProducts([...lstProducts,
            {
                id: counterId,
                product: dropdownvalueproduct,
                description: descriptionInput,
                number: numberInput
            }
            ])
            console.log(lstProducts)
            resetStateCard();
            setShowError(false);

        } else {
            setShowError(true)
        }

        setCounterId(counterId + 1)

    }

    function removeItemList(id: number) {
        lstProducts.forEach(item => {
            if (item.id == id) {
                lstProducts.splice(lstProducts.indexOf(item), 1)
            }
        });
        setLstProducts([...lstProducts])

        console.log(lstProducts)
    }

    async function SendProducts() {
        try {

            if (lstProducts.length != 0) {

                const returnLocation = GetLatLongByCheckBox(checked, dropdownvalueaddress);

                const dataRequest: MakeContributionModel = {
                    idDocument: user?.idDocument!,
                    lat: returnLocation.lat,
                    long: returnLocation.long,
                    products: lstProducts
                }

                await MakeContribution(user, dataRequest)

            }

        } catch (error) {

        }
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
                addProduct={addProduct} showError={showError}
            />

            {<ListProduct lstProducts={lstProducts} removeItemList={removeItemList} />}


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
                    <View style={{
                        paddingLeft: "2.5%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        backgroundColor: paperTheme.colors.onSurface,
                        justifyContent: "center",
                        borderRadius: 10,
                        width: '45%',
                        elevation: 2
                    }}>
                        <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Send Product to branch</Text>
                        <RadioButton
                            value="SendBranch"
                            status={checked === 'SendBranch' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('SendBranch')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                    <View style={{
                        paddingLeft: "2.5%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        backgroundColor: paperTheme.colors.onSurface,
                        justifyContent: "center",
                        borderRadius: 10,
                        width: '45%',
                        elevation: 2

                    }}>
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
                    <MainButton MainActionScreen={SendProducts} />
                </View>
            </View>
        </ScrollView >
    )
}

export default OrderScreen;