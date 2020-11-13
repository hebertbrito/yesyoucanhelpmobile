import React, { useState, useEffect, useContext, memo } from 'react';
import { View } from 'react-native';
import { Checkbox, IconButton, Text, useTheme, Subheading } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';

//datas
import { itemsDropdown, items } from '../../data/dataOrderscreen';

//translate
import translate from '../../services/translate/translate'

interface DropdownYes {
    dropdownvalueproduct: string,
    setDropdownValueProduct: React.Dispatch<React.SetStateAction<string>>
}

const DropdownYes = (props: DropdownYes) => {

    const paperTheme = useTheme();
    const { dropdownvalueproduct, setDropdownValueProduct } = props;

    return (
        <View style={{width: '40%'}}>
            <Picker mode="dialog" style={{ width: '100%', color: paperTheme.colors.text, alignItems: "center", alignContent: "center", justifyContent: "center" }}
                selectedValue={dropdownvalueproduct}
                onValueChange={(itemvalue, itemindex) => setDropdownValueProduct(itemvalue.toString())}
            >
                {items.length > 0 && (
                    items.map((item) => {
                        return (
                            <Picker.Item key={item.id} label={translate(item.name)} value={item.value} />
                        )
                    })
                )}
            </Picker>
        </View>
    )
}

export const DropdownYesComponent = memo(DropdownYes);