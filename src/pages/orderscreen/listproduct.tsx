import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Title, Subheading, List, Button, IconButton, Paragraph, Divider, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from './styles'

interface ModelList {
    id: string,
    number: string,
    description: string,
    product: string
}

interface Props {
    lstProducts: ModelList[]
}

const ListProduct = (props: Props) => {

    const paperTheme = useTheme();

    const iconExclude = () => {
        return (
            <Icon name="trash-alt" size={20} color="red" />
        )
    }

    if (props.lstProducts.length > 0) {
        return (
            <>
                <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                <Animatable.View animation="zoomIn" delay={500} easing="ease-in-out" useNativeDriver={true} style={styles.containerlist}>
                    <Subheading style={{ alignSelf: "center", color: paperTheme.colors.text }}>List of All Products</Subheading>
                    <ScrollView style={styles.scrollViewDisplay}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="black"
                        pagingEnabled={true}
                        nestedScrollEnabled={true}
                    >

                        {props.lstProducts.map(item => {
                            return (
                                <View key={item.id} style={{ width: '100%' }}>
                                    <View style={styles.scrollViewDisplay}>
                                        <View style={styles.titleList}>
                                            <Subheading style={{ margin: 8, color: paperTheme.colors.onBackground }}>{item.product}</Subheading>
                                            <Text style={{ color: paperTheme.colors.onBackground }}> - </Text>
                                            <Text style={{ margin: 8, color: paperTheme.colors.onBackground }}>{item.number}</Text>
                                        </View>
                                        <View style={styles.info_list}>
                                            <View style={{ width: '90%' }}>
                                                <Paragraph style={{ margin: 5, color: paperTheme.colors.onBackground }}>{item.description}</Paragraph>
                                            </View>
                                            <IconButton
                                                icon={() => <Icon name="trash-alt" size={20} color="red" />}
                                                onPress={() => console.log('Pressed')}
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