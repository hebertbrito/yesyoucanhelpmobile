import React, { useState, useEffect, useContext, memo } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface DatePickers {
    ShowDataTime(): void
}

const DatePickers = (props: DatePickers) => {

    const paperTheme = useTheme();

    const { ShowDataTime } = props;

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", elevation: 5 }}>
                <Text>
                    Date
                    </Text>
                <Text>
                    27/09/1997
                    </Text>
            </View>
            <IconButton
                icon={() => <Icon name="calendar-alt" size={25} color={paperTheme.colors.text} style={{ elevation: 1 }} />}
                onPress={() => ShowDataTime()}
            />
        </View>
    )
}

export const DatePicker = memo(DatePickers)