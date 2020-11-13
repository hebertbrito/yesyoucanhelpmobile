import React, { useState, useEffect, useContext, memo } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface DatePickers {
    ShowStartDate(): void,
    ShowEndDate(): void,
    startdate: Date,
    enddate: Date
}

const DatePickers = (props: DatePickers) => {

    const paperTheme = useTheme();

    const { ShowStartDate, ShowEndDate, startdate, enddate } = props;

    return (
        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-evenly", width: '100%'}}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", elevation: 5 }}>
                    <Text>
                        StartDate
                    </Text>
                    <Text>
                        {startdate.toLocaleDateString('en-US')}
                    </Text>
                </View>
                <IconButton
                    icon={() => <Icon name="calendar-alt" size={25} color={paperTheme.colors.text} style={{ elevation: 1 }} />}
                    onPress={() => ShowStartDate()}
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", elevation: 5 }}>
                    <Text>
                        EndDate
                    </Text>
                    <Text>
                        {enddate.toLocaleDateString('en-US')}
                    </Text>
                </View>
                <IconButton
                    icon={() => <Icon name="calendar-alt" size={25} color={paperTheme.colors.text} style={{ elevation: 1 }} />}
                    onPress={() => ShowEndDate()}
                />
            </View>
        </View>

    )
}

export const DatePicker = memo(DatePickers)