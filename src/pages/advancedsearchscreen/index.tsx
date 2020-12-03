import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, Platform, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
    DatePicker,
    CheckBoxComponent,
    RadioGroupComponent,
    NavigationButon,
    MainButton,
    ButtonComponent,
    DropdownYesComponent
} from '../../components';

//translate
import translate from '../../services/translate/translate'

//mock
import { GetFormatDate, ValidationInputDate } from './mock';

//models
import { AdvancedSearch, AdvancedSearchResponse } from '../../models';

//services
import { GetAdvancedSearch } from '../../services/api/AdvancedSearch';

//context
import Auth from '../../context/auth';

//childs
import { RenderList } from './factory'

const AdvancedSerach = () => {

    const paperTheme = useTheme();
    const { navigate } = useNavigation();
    const { user } = useContext(Auth)

    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [showstartdate, setShowStartDate] = useState(false);
    const [showenddate, setShowEndDate] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [isliked, setIsLiked] = useState(false);
    const [radiovalue, setRadioValue] = useState('askcontribution');
    const [dropdownvalueproduct, setDropdownValueProduct] = useState('')
    const [lstDatas, setLstDatas] = useState<Array<AdvancedSearchResponse>>([] as Array<AdvancedSearchResponse>)

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                clearfields()
                null
            }
        }, [])
    );    

    function clearfields() {
        setIsLiked(false)
        setStartDate(new Date())
        setEndDate(new Date())
        setShowStartDate(false)
        setShowEndDate(false)
        setIsReported(false)
        setRadioValue("askcontribution")
        setDropdownValueProduct("")
        setLstDatas([])
    }

    function onChangeStartDate(event: any, selectedDate: any) {
        setShowStartDate(false);
        setStartDate(selectedDate)
    }
    function onChangeEndDate(event: any, selectedDate: any) {
        setShowEndDate(false);
        setEndDate(selectedDate)
    }
    function ShowStartDate() {
        setShowStartDate(showstartdate ? false : true);
    }

    function ShowEndDate() {
        setShowEndDate(showenddate ? false : true);
    }

    async function getadvancedsearch() {
        try {
            const _startdate = GetFormatDate(startdate)
            const _enddate = GetFormatDate(enddate)
            if (ValidationInputDate(_startdate, _enddate)) {
                const objModel: AdvancedSearch = {
                    startdate: _startdate,
                    enddate: _enddate,
                    typeaction: radiovalue,
                    accept: "",
                    rating: "",
                    products: "" //dropdownvalueproduct
                }

                const datas = await GetAdvancedSearch(objModel, user!)
                if (datas) {
                    setLstDatas(datas)
                }

            } else {
                Alert.alert('EndDate não pode ser menos que StartDate')
            }
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    function DynamicIcon() {

        if ('askcontribution' == radiovalue) {
            return (
                <Icon name="hands-helping" size={20} color={paperTheme.colors.text} />
            )
        } else {
            return (
                <Icon name="home" size={20} color={paperTheme.colors.text} />
            )
        }


    }

    return (
        <SafeAreaView style={{ width: "100%", flex: 1, alignContent: "center", alignItems: "center" }}>

            <View style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: '3%', marginTop: '5%' }}>
                <Headline style={{ alignSelf: "center", fontWeight: "bold" }}>
                    {translate("advanced_search_menu")}
                </Headline>
            </View>
            <View style={{
                width: '95%', height: 196,
                borderRadius: 10, backgroundColor: paperTheme.colors.background, shadowColor: '#FAFAFA',
                shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 16.00, elevation: 20, display: "flex",
                flexDirection: "column",
            }}>
                <View style={{ width: '100%', height: 40, backgroundColor: paperTheme.colors.primary, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: "center" }}>
                    <Subheading style={{ paddingLeft: '4%', alignSelf: "center" }}>
                        {translate("select_filters")}
                    </Subheading>
                </View>
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <DatePicker ShowStartDate={ShowStartDate} startdate={startdate} enddate={enddate} ShowEndDate={ShowEndDate} />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <CheckBoxComponent isValue={isReported} setValueCheckbox={setIsReported} title="reported" />
                        <CheckBoxComponent isValue={isliked} setValueCheckbox={setIsLiked} title="accepted" />
                        <DropdownYesComponent dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct} />
                    </View>
                </View>
                <RadioGroupComponent value={radiovalue} setValue={setRadioValue} />
            </View>

            {showstartdate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startdate}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChangeStartDate}
                />
            )}

            {showenddate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={enddate}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChangeEndDate}
                />
            )}

            <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, marginTop: '1%' }}>
                <RenderList lstDatas={lstDatas} radiovalue={radiovalue} />
            </ScrollView>

            <View style={styles.bottomButonsView}>
                <Button mode="text"
                    onPress={() => navigate('OptionsScreens')}
                    style={{ width: '25%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: paperTheme.colors.text }}
                    color={paperTheme.colors.text}
                >
                    {translate("back")}
                </Button>
                <ButtonComponent iconName="search" isSend={false} nameButton={translate("search")} size={20} styles={styles.buttoncomponente} MainActionScreen={getadvancedsearch} />
                <Button mode="outlined"
                    onPress={() => { }}
                    style={{ width: '25%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: paperTheme.colors.surface }}
                    color={paperTheme.colors.surface}
                >
                    {translate("clean")}
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomButonsView: {
        width: '100%',
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: '3%',
        alignContent: "center", alignItems: "center"
    },
    buttoncomponente: {
        width: '30%',
        height: 41,
        display: "flex",
        justifyContent: "center",
        color: "#000000"
    }
})

export default AdvancedSerach;