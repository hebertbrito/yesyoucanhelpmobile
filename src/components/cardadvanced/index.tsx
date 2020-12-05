import React, { memo, useState } from 'react'
import { SafeAreaView, View, ScrollView, StatusBar, Platform, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider, Button, Caption, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

//styles
import { styles } from './styles'

//models
import { ContributionsAdvanced, HouselessAdvanced } from '../../models'

//translate
import translate from '../../services/translate/translate'

import { transformDate } from '../../mocks/transformDate'

interface Duration {
    duration?: number
}
type Props = ContributionsAdvanced & Duration
function cardone(props: Props) {

    const theme = useTheme();

    const { uri, accept, cep, createdAt, description, idDocument, lastname, name, product, number, duration } = props;


    return (
        <Animatable.View animation="fadeInRight" useNativeDriver={true} easing="ease-out"
            style={styles.animatableContainer} duration={duration}
        >
            <View style={styles.viewAvatar}>
                {uri != "" ?
                    <Avatar.Image source={{ uri: uri }} size={65}
                        style={{ elevation: 6 }}
                    />
                    :
                    <Avatar.Image source={require("../../assets/imageperfil/defaultavatar.jpg")} size={65}
                        style={{ elevation: 6 }}
                    />
                }
            </View>

            <View style={{
                width: "90%", height: "100%", alignSelf: "flex-end",
                borderRadius: 10, backgroundColor: theme.colors.background, shadowColor: '#FAFAFA',
                shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 16.00, elevation: 4,
            }}>
                <View style={styles.subItem}>
                    <Paragraph>{name} {lastname}</Paragraph>
                    <Caption style={{ marginLeft: "13%" }}>{transformDate(createdAt._seconds)}</Caption>
                </View>
                <View style={styles.subItemDois}>
                    <Paragraph>{translate(product)}</Paragraph>
                    <Paragraph>{number}</Paragraph>
                    {accept ?
                        <Paragraph style={{ color: theme.colors.onSurface }}>Finalizado</Paragraph>
                        :
                        <Paragraph style={{ color: theme.colors.third }}>Não Finalizado</Paragraph>
                    }
                    <Paragraph>{cep}</Paragraph>
                </View>
                <View style={styles.subItem}>
                    <Paragraph>{description.substr(0, 80)}...</Paragraph>
                </View>
            </View>
        </Animatable.View>
    )
}

export const CardAdvanced = memo(cardone)


type PropsTwo = HouselessAdvanced & Duration
const cardtwo = (props: PropsTwo) => {

    const theme = useTheme();

    const { cep, createdAt, description, idDocument, name, rating, uri, duration } = props;

    return (
        <Animatable.View animation="fadeInRight" useNativeDriver={true} easing="ease-out"
            style={styles.animatableContainer} duration={duration}
        >
            <View style={styles.viewAvatarHouseless}>
                {uri != "" ?
                    <Avatar.Image source={{ uri: uri }} size={65}
                        style={{ elevation: 6 }}
                    />
                    :
                    <Avatar.Image source={require("../../assets/imageperfil/defaultavatar.jpg")} size={65}
                        style={{ elevation: 6 }}
                    />
                }
            </View>

            <View style={{
                width: "85%", height: "100%", alignSelf: "flex-end",
                borderRadius: 10, backgroundColor: theme.colors.background, shadowColor: '#FAFAFA',
                shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 16.00, elevation: 4,
            }}>
                <View style={styles.subItem}>
                    <Paragraph>{name}</Paragraph>
                    <Caption style={{ marginLeft: "13%" }}>{transformDate(createdAt._seconds)}</Caption>
                </View>
                <View style={styles.subItemTres}>
                    <Paragraph>{cep}</Paragraph>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Icon name="exclamation-circle" size={20} color={theme.colors.third} style={{ paddingLeft: "15%", marginRight: "5%" }} />
                        <Paragraph>{rating}</Paragraph>
                    </View>
                </View>
                <View style={styles.subItem}>
                    <Paragraph>{description.substr(0, 80)}...</Paragraph>
                </View>
            </View>
        </Animatable.View>
    )
}

export const CardAdvancedTwo = memo(cardtwo)
