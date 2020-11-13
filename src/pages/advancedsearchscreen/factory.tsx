import React from 'react'
import { SafeAreaView, View, ScrollView, StatusBar, Platform, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AdvancedSearchResponse } from '../../models'

interface RenderList {
    lstDatas: Array<AdvancedSearchResponse>,
    radiovalue: string,
}

export const RenderList = (props: RenderList) => {

    const { lstDatas, radiovalue } = props;
    const paperTheme = useTheme();

    if (lstDatas.length > 0) {
        return (
            <>

                <List.Item
                    title="Teste"
                    description="teste poha"
                    right={props => <List.Icon {...props}
                        icon={() => <Icon name="hands-helping" size={20} color={paperTheme.colors.text} />}
                    />}
                />
                <List.Item
                    title="Teste"
                    description="teste poha"
                    right={props => <List.Icon {...props}
                        icon={() => <Icon name="hands-helping" size={20} color={paperTheme.colors.text} />}
                    />}
                />
                <List.Item
                    title="Teste"
                    description="teste poha"
                    right={props => <List.Icon {...props}
                        icon={() => <Icon name="hands-helping" size={20} color={paperTheme.colors.text} />}
                    />}
                />

            </>
        )
    } else {
        return (
            <>
            </>
        )
    }

}