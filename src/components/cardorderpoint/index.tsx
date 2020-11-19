import React, { useState, useContext, memo } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Text, useTheme, Avatar, Subheading, Caption, Paragraph, Divider, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//styles
import styles from './styles'

//Components
import { Thumbs, ThumbsOrder } from '../../components';
import AuthContext from '../../context/auth'


function CardOrderItem() {

    const theme = useTheme();


    return (
        <>
            <View style={{ width: "95%", display: "flex", flexDirection: "column", marginBottom: 5 }}>
                <View style={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Avatar.Image source={require('../../assets/imageperfil/defaultavatar.jpg')} size={30} />
                    <Paragraph style={{ width: "25%", display: "flex", flexWrap: "wrap", marginLeft: "2%" }}>
                        Nome Sobrenome
                    </Paragraph>
                    <Caption style={{ width: "20%", display: "flex" }}>
                        18/09/1997
                    </Caption>
                    <ThumbsOrder AcceptOrders={() => { }} ReportOrders={() => { }} idDocument="text" typeorder="ok" />
                </View>
                <Paragraph>
                    fadlsjhfoçdsujagfpiçdasghufpidsyhfgpisdhgfpidsufgdsoiufgdspkjhfgsdkjgfsdkfgsdfsdafsdajhlfgdsaliufggofidjglikfjdhlgçkhjdflçgkjhfdçlgjhfdkçjghdfkjghkfdjhgdsçfuighdçf
                </Paragraph>
            </View>

            <Divider style={{ backgroundColor: theme.colors.accent, height: 1, width: "95%" }} />
        </>
    )
}


interface CardOrder {
    teste(): void
}

function CardOrder(props: CardOrder) {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const [typeOrder, setTypeorder] = useState('1');
    const { teste } = props;


    return (
        <Animatable.View animation="fadeInUp" useNativeDriver={true} easing="ease-out"
            style={styles.animatableView}
        >
            <View
                style={{
                    width: '100%', marginTop: '13%', flex: 1, backgroundColor: theme.colors.background, zIndex: -1,
                    borderTopRightRadius: 45, borderTopLeftRadius: 45, elevation: 10
                }}>
                <View style={{ width: "90%", alignItems: "center", justifyContent: "center", margin: 5 }}>
                    <Subheading>
                        Titulo
                    </Subheading>
                    <Icon size={20} name="times" color={theme.colors.error} style={{ position: "absolute", alignSelf: "flex-end" }}
                        onPress={() => teste() }
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, alignContent: "center", alignItems: "center" }}>

                        <CardOrderItem />

                    </ScrollView>
                </View>
            </View>
        </Animatable.View>
    )
}

export const CardOrderPoint = memo(CardOrder)
