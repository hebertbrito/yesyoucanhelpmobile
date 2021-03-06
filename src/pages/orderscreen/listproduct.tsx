import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, IconButton, Paragraph, Divider, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';

//css
import { styles } from './styles'

//services
import translate from '../../services/translate/translate'

interface ModelList {
    id: number,
    number: string,
    description: string,
    product: string,
}

interface Props {
    lstProducts: ModelList[],
    removeItemList(id: number): any
}

const ListProduct = (props: Props) => {

    const paperTheme = useTheme();

    const { lstProducts, removeItemList } = props;

    const iconExclude = () => {
        return (
            <Icon name="trash-alt" size={20} color="red" />
        )
    }

    if (lstProducts.length > 0) {
        return (
            <>
                <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                <Animatable.View animation="zoomIn" delay={500} easing="ease-in-out" useNativeDriver={true} style={styles.containerlist}>
                    <Subheading style={{ alignSelf: "center", color: paperTheme.colors.text }}>{translate('title_list_product')}</Subheading>
                    <ScrollView style={styles.scrollViewDisplay}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="black"
                        pagingEnabled={true}
                        nestedScrollEnabled={true}
                    >

                        {lstProducts.map(item => {
                            return (
                                <View key={item.id} style={{ width: '100%' }}>
                                    <View style={styles.scrollViewDisplay}>
                                        <View style={styles.titleList}>
                                            <Subheading style={{ margin: 8, color: paperTheme.colors.onBackground }}>{translate('button_form_product')}: {translate(item.product)}</Subheading>
                                            <Text style={{ color: paperTheme.colors.onBackground }}> - </Text>
                                            <Text style={{ margin: 8, color: paperTheme.colors.onBackground }}>{translate('label_form_size_quant')}: {item.number}</Text>
                                        </View>
                                        <View style={styles.info_list}>
                                            <View style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
                                                <Text style={{ marginLeft: 5, color: paperTheme.colors.onBackground, fontWeight: "bold" }}>{translate('list_description')}</Text>
                                                <Paragraph style={{ margin: 5, color: paperTheme.colors.onBackground }}>{item.description}</Paragraph>
                                            </View>
                                            <IconButton
                                                icon={() => <Icon name="trash-alt" size={20} color="red" />}
                                                onPress={() => removeItemList(item.id)}
                                                animated={true}
                                            />
                                        </View>
                                    </View>

                                    <Divider style={{ backgroundColor: paperTheme.colors.accent, marginTop: 10, marginBottom: 10 }} />
                                </View>
                            )
                        })}
                    </ScrollView>
                </Animatable.View>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }

}

export default ListProduct;