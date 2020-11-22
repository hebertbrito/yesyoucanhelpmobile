import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, Keyboard, Alert } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, Divider, RadioButton, Headline, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../context/auth';

//dataOrderMenu
import { addressesDropdown } from '../../data/dataOrderscreen';
import { FormProduct } from '../../components/formproduct';
import { MainButton } from '../../components/buttons';
import ListProduct from './listproduct';
import { GetLatLongByCheckBox } from '../../mocks/getlatlongbycheckbox';

//services
import { MakeContribution } from '../../services/api/MakeContribution';
import translate from '../../services/translate/translate'

import { MakeContributionModel } from '../../models/MakeContribution';

//screens
import { styles } from './styles';

//errorswitch
import { SwitchErros } from './validation'

//componentes
import { SnackBarYes } from '../../components'


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
    const [isSend, setIsSend] = useState<boolean>(false);

    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

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
                    cep: returnLocation.cep,
                    products: lstProducts
                }
                setIsSend(true);
                await MakeContribution(user!, dataRequest)
                setLstProducts([])
                setIsSend(false);
                //201
                // Alert.alert(`${translate("completed")}`, `${translate("completed_order_message")}`)
                SwitchErros(201, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                setIsVisible(true);
            } else {
                //204
                // Alert.alert(`${translate("attention")}`, `${translate("attention_message")}`)
                SwitchErros(204, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                setIsVisible(true);
            }

        } catch (error) {
            setIsSend(false);
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true);
        }
    }

    function onPress() {
        setIsVisible(!isVisible)
    }

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
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
                    {translate("contribution_menu")}
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
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>
                                {translate('check_contribution_branch')}
                            </Text>
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
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>
                                {translate('check_contribution_meet_place')}
                            </Text>
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
                        <MainButton MainActionScreen={SendProducts} isSend={isSend} />
                    </View>
                </View>
            </ScrollView >
            <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onPress}
                text={text} 
                style={{ height: 50, width: "90%",
                backgroundColor: colorbackground, alignSelf: "center", bottom: 15, display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center" }}
                textcolor={textcolor} subcolorButton={subcolorButton} title={title}
            />
        </SafeAreaView>

    )
}

export default OrderScreen;