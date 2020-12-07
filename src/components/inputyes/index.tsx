import React, { memo } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

interface InputYes {
    value: any
    setvalue: React.Dispatch<React.SetStateAction<any>>,
    placeholder: string,
    label: string,
    typeKeyboard: any,
    width: string,
    maxLength: number,
    secureTextEntry?: boolean,
    error?: boolean,
    right?: JSX.Element
}

function InputYes(props: InputYes) {

    const paperTheme = useTheme();
    const { error, value, setvalue, label, maxLength, placeholder, typeKeyboard, width, secureTextEntry, right } = props;

    return (
        <TextInput
            value={value}
            onChangeText={text => setvalue(text)}
            placeholder={placeholder}
            label={label}
            keyboardType={typeKeyboard}
            style={{ marginTop: 10, width: `${width}` }}
            placeholderTextColor={paperTheme.colors.text}
            theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
            maxLength={maxLength}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            error={error}
            right={right}
        />
    )
}

export const InputYesComponent = memo(InputYes);