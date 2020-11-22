import React, { useState, useContext } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Text, useTheme, Avatar, Subheading, Caption, Paragraph, Divider, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//styles
import styles from './styles'

//Components
import { Thumbs } from '../../components';
import AuthContext from '../../context/auth';

//models
import { CardDetails, UserLogin } from '../../models';

//translate
import translate from '../../services/translate/translate'
interface CardDetailsInfo {
    visibileAnimatable(): void,
    CloseCardDetails(): void,
    AcceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    ReportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    objCardDetails: CardDetails
}

export function CardDetailsInfo(props: CardDetailsInfo) {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const [typeOrder, setTypeorder] = useState('1');
    const { visibileAnimatable, objCardDetails, CloseCardDetails, AcceptOrders, ReportOrders } = props;

    return (
        <Animatable.View animation="fadeInUp" useNativeDriver={true} easing="ease-out"
            style={styles.animatableView}
        >
            {objCardDetails.uri != "" ?
                <Avatar.Image size={100} source={{uri: objCardDetails.uri}}
                    style={styles.styleaVatar}
                />
                :
                <Avatar.Image size={100} source={require('../../assets/imageperfil/defaultavatar.jpg')}
                    style={styles.styleaVatar}
                />
            }

            <View
                style={{
                    width: '100%', marginTop: '13%', flex: 1, backgroundColor: theme.colors.background, zIndex: -1,
                    borderTopRightRadius: 45, borderTopLeftRadius: 45, elevation: 10
                }}>
                <Icon size={25} name="times" style={styles.Icon} color={theme.colors.error} onPress={() => CloseCardDetails()} />
                <View style={styles.sub_body}>
                    <Subheading>
                        {objCardDetails.firstname} {objCardDetails.lastname}
                    </Subheading>
                    <Caption>
                        {objCardDetails.email}
                    </Caption>
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, alignContent: "center", alignItems: "center" }}>

                        <Thumbs
                            AcceptOrders={AcceptOrders}
                            ReportOrders={ReportOrders}
                            idDocument={objCardDetails.idDocument}
                            typeorder={objCardDetails.type}
                        />

                        <Divider style={{ backgroundColor: theme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                        <View style={{ width: '100%', padding: '3%', flexDirection: "column" }}>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    {objCardDetails.type == '3' ?
                                        <View>
                                            <Title>Name:</Title>
                                            <Paragraph>
                                                {objCardDetails.name}
                                            </Paragraph>
                                        </View>
                                        :
                                        null
                                    }
                                    {objCardDetails.type == '2' ?
                                        <View style={{ marginRight: '10%', justifyContent: "center" }}>
                                            <Title>{translate("button_form_product")}</Title>
                                            <Paragraph>
                                                {translate(objCardDetails.product)}
                                            </Paragraph>
                                        </View>
                                        :
                                        null
                                    }

                                </View>

                                {objCardDetails.type == '2' ?
                                    <View style={{ alignSelf: "center", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                                        <Title>{translate("label_form_size_quant")}</Title>
                                        <Paragraph>
                                            {objCardDetails.number}
                                        </Paragraph>
                                    </View>
                                    :
                                    null
                                }

                            </View>
                            <View style={{ width: '100%', display: "flex" }}>
                                <Title>{translate("list_description")}</Title>
                                <Paragraph style={{ fontStyle: "italic" }}>
                                    {objCardDetails.description}
                                </Paragraph>
                            </View>

                            {objCardDetails.type == '3' ?
                                <View style={{ width: '95%', height: 500, borderColor: 'red', borderWidth: 2 }}>
                                    <Image source={require('../../assets/fotospublic/logoApp2.png')} style={{ width: '100%', height: '100%', resizeMode: "cover", alignSelf: "center" }} />
                                </View>
                                :
                                null
                            }

                        </View>

                    </ScrollView>
                </View>
            </View>
        </Animatable.View>
    )
}