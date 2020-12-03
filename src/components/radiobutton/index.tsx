import React, { useState, useEffect, useContext, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, IconButton, Text, useTheme, Subheading, RadioButton, Caption } from 'react-native-paper';

import styles from './styles';

interface radioGroup {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}

const radioGroup = (props: radioGroup) => {

    const paperTheme = useTheme();
    const { setValue, value } = props;

    return (
        <View style={styles.viewCardCheckBox}>
            <View style={{
                paddingLeft: "2.5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: paperTheme.colors.onSurface,
                justifyContent: "center",
                borderRadius: 5,
                width: '30%',
                elevation: 2
            }}>
                <Text style={{ color: '#000000' }}>Contribution</Text>
                <RadioButton
                    value="contribution"
                    status={value === 'contribution' ? 'checked' : 'unchecked'}
                    onPress={() => setValue('contribution')}
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
                borderRadius: 5,
                width: '35%',
                elevation: 2
            }}>
                <Text style={{ color: '#000000' }}>A. Contribution</Text>
                <RadioButton
                    value="askcontribution"
                    status={value === 'askcontribution' ? 'checked' : 'unchecked'}
                    onPress={() => setValue('askcontribution')}
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
                borderRadius: 5,
                width: '30%',
                elevation: 2
            }}>
                <Text style={{ color: '#000000' }}>Houseless</Text>
                <RadioButton
                    value="infohouseless"
                    status={value === 'infohouseless' ? 'checked' : 'unchecked'}
                    onPress={() => setValue('infohouseless')}
                    color={'#000000'}
                    uncheckedColor={'#000000'}
                />
            </View>
        </View>

    )
}

export const RadioGroupComponent = memo(radioGroup);

