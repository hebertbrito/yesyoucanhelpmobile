import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, Platform, Button } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';


import { DatePicker, CheckBoxComponent, RadioGroupComponent, NavigationButon } from '../../components'

const AdvancedSerach = () => {

    const paperTheme = useTheme();

    const [date, setDate] = useState(new Date);
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [isliked, setIsLiked] = useState(false);
    const [radiovalue, setRadioValue] = useState('askcontribution');

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(show ? false : true);
        setDate(currentDate);
    };

    function ShowDataTime() {
        setShow(show ? false : true);
    }

    return (
        <SafeAreaView style={{ width: "100%", flex: 1, alignContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: '3%', marginTop: '5%' }}>
                <Headline style={{ alignSelf: "center" }}>
                    Advanced Search
                </Headline>
            </View>
            <View style={{ width: "95%", display: "flex", flexDirection: "column", margin: '2%', justifyContent: "center", alignContent: "center", }}>
                <Subheading>
                    Set type filter
                </Subheading>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", alignContent: "center" }}>
                    <DatePicker ShowDataTime={ShowDataTime} />
                    <CheckBoxComponent isValue={isReported} setValueCheckbox={setIsReported} title="Report" />
                    <CheckBoxComponent isValue={isliked} setValueCheckbox={setIsLiked} title="Accept" />
                </View>
                <RadioGroupComponent value={radiovalue} setValue={setRadioValue} />
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}

                />
            )}

            <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, marginTop: '1%' }}>
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />
                <List.Item
                    title="Contribution"
                    description="Hebert - Doa-se sofá usado"
                    right={props => <List.Icon {...props} icon={() => <Icon name="hands-helping"
                        size={20} color={paperTheme.colors.text}
                    />} />}
                />

                <NavigationButon
                    iconName="cogs"
                    nameButton="Back to Settings"
                    routeNavigation="OptionsScreens"
                />
            </ScrollView>

        </SafeAreaView>
    )
}

export default AdvancedSerach;