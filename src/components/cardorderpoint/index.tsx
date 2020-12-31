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
import { ItemMapsSpecificLocation } from 'src/models';

//translate
import translate from '../../services/translate/translate'

//mocks
import { transformDate } from '../../mocks/transformDate'

interface CardOrderItem {
    ratingorderscontributions(idDocument: string): Promise<void>
    accpetorderscontributions(idDocument: string): Promise<void>
}
type Props = ItemMapsSpecificLocation & CardOrderItem
function CardOrderItem(props: Props) {

    const theme = useTheme();
    const { createdAt, description, id, number, ownname, product, uri, accpetorderscontributions, ratingorderscontributions } = props;

    return (
        <>
            <View style={{ width: "95%", display: "flex", flexDirection: "column", marginBottom: 5 }} key={id}>
                <View style={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {uri != "" ?
                        <Avatar.Image source={{ uri: uri }} size={30} />
                        :
                        <Avatar.Image source={require('../../assets/imageperfil/defaultavatar.jpg')} size={30} />
                    }
                    <Paragraph style={{ width: "25%", display: "flex", flexWrap: "wrap", marginLeft: "2%" }}>
                        {ownname}
                    </Paragraph>
                    <Caption style={{ width: "20%", display: "flex" }}>
                        {transformDate(createdAt._seconds)}
                    </Caption>
                    <ThumbsOrder AcceptOrders={accpetorderscontributions} ReportOrders={ratingorderscontributions} idDocument={id} typeorder="ok" />
                </View>
                <Paragraph style={{ fontStyle: "italic" }}>
                    {translate(product)}, {number} - {description}
                </Paragraph>
            </View>
            <Divider style={{ backgroundColor: theme.colors.accent, height: 1, width: "95%" }} />
        </>
    )
}


interface CardOrder {
    showiscardorderpoint(): void,
    lstContribution: Array<ItemMapsSpecificLocation>,
    title: string,
    subTitleCardOrderPoint: string,
    ratingorderscontributions(idDocument: string): Promise<void>
    accpetorderscontributions(idDocument: string): Promise<void>
}

function CardOrder(props: CardOrder) {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { showiscardorderpoint, lstContribution, title, subTitleCardOrderPoint, accpetorderscontributions, ratingorderscontributions } = props;


    return (
        <Animatable.View animation="fadeInUp" useNativeDriver={true} easing="ease-out"
            style={styles.animatableView}
        >
            <View
                style={{
                    width: '100%', marginTop: '13%', flex: 1, backgroundColor: theme.colors.background, zIndex: -1,
                    borderTopRightRadius: 20, borderTopLeftRadius: 20, elevation: 10
                }}>
                <View style={{ width: "90%", alignItems: "center", justifyContent: "center", margin: 5 }}>
                    <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Subheading>
                            {translate(title)}
                        </Subheading>
                        <Caption>
                            {translate(subTitleCardOrderPoint)}
                        </Caption>
                    </View>
                    <Icon size={20} name="times" color={theme.colors.error} style={{ position: "absolute", alignSelf: "flex-end" }}
                        onPress={() => showiscardorderpoint()}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, alignContent: "center", alignItems: "center" }}>
                        {lstContribution.length > 0
                            ?
                            lstContribution.map(item => (
                                <CardOrderItem key={item.id} {...item} accpetorderscontributions={accpetorderscontributions} ratingorderscontributions={ratingorderscontributions} />
                            ))
                            :
                            <>
                                <Paragraph>
                                    nenhum conteúdo
                            </Paragraph>
                            </>
                        }

                    </ScrollView>
                </View>
            </View>
        </Animatable.View>
    )
}

export const CardOrderPoint = memo(CardOrder)
