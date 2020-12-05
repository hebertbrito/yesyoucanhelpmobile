import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, StatusBar, Platform, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider, Button, Caption, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Lottie from "lottie-react-native";

//models
import { AdvancedSearchResponse, ContributionsAdvanced, HouselessAdvanced } from '../../models'

//components
import { CardAdvanced, CardAdvancedTwo } from '../../components'

interface RenderList {
    lstDatas: Array<AdvancedSearchResponse>,
    radiovalue: string,
}
interface PropsCardsContributionsAndAsk {
    lstcontributionandAks: Array<ContributionsAdvanced>
}

export const CardsContributionsAndAsk = (props: PropsCardsContributionsAndAsk) => {

    const { lstcontributionandAks } = props;
    let items = []
    if (lstcontributionandAks.length > 0) {

        for (let index = 0; index < lstcontributionandAks.length; index++) {
            const item = lstcontributionandAks[index];
            items.push(<CardAdvanced key={item.idDocument} {...item} duration={(index * 300) + 650} />)

        }

        return (
            <>
                {items}
            </>
        )
    } else {
        return (
            <Lottie source={require("../../assets/lottiefiles/empty.json")}
                resizeMode="contain"
                autoSize
                autoPlay
                loop={false}
                duration={3000}
                speed={1}
                style={{ width: "100%", height: "90%", alignSelf: "center" }}
            />
        )
    }

}

interface PropsCardsHouseless {
    lstHouselessAdvanced: Array<HouselessAdvanced>
}

export const CardsHouseless = (props: PropsCardsHouseless) => {

    const { lstHouselessAdvanced } = props;
    let items = []

    if (lstHouselessAdvanced.length > 0) {

        for (let index = 0; index < lstHouselessAdvanced.length; index++) {
            const item = lstHouselessAdvanced[index];
            items.push(<CardAdvancedTwo {...item} key={item.idDocument} duration={(index * 300) + 650} />)
        }

        return (
            <>
                {items}
            </>
        )
    } else {
        return (
            <Lottie source={require("../../assets/lottiefiles/empty.json")}
                resizeMode="contain"
                autoSize
                autoPlay
                loop
                duration={3000}
                style={{ width: "100%" }}
            />
        )
    }
}