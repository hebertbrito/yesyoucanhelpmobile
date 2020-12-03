import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton, Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//translate
import translate from '../../services/translate/translate'

//context
import AuthContex from '../../context/auth'

//models
import { UserLogin } from '../../models'

interface Thumbs {
    AcceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    ReportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    idDocument: string,
    typeorder: string,
    CloseCardDetails(): void
}

export function Thumbs(props: Thumbs) {

    const { AcceptOrders, idDocument, typeorder, ReportOrders, CloseCardDetails } = props;
    const { user } = useContext(AuthContex);
    const theme = useTheme()

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column", width: "40%" }} disabled={false}>
                    <IconButton icon={() => <Icon name="exclamation-circle" size={20} color={theme.colors.third} />} style={{ alignSelf: "center" }} disabled={false}
                        onPress={() => { ReportOrders(idDocument, user, typeorder), CloseCardDetails() }}
                    />
                    <Paragraph style={{ alignSelf: "center" }}>{translate("report")}</Paragraph>
                </TouchableOpacity>
                {typeorder != "3" ?
                    <TouchableOpacity style={{ display: "flex", flexDirection: "column", width: "40%" }}>
                        <IconButton icon={() => <Icon name="check-circle" size={20} color={theme.colors.onSurface} />} style={{ alignSelf: "center" }}
                            onPress={() => { AcceptOrders(idDocument, user, typeorder) }}
                        />
                        <Paragraph style={{ alignSelf: "center" }}>
                            {translate("accept")}
                        </Paragraph>
                    </TouchableOpacity>
                    :
                    null
                }

            </View>
        </View>
    )
}

interface ThumbsOrders {
    AcceptOrders(idDocument: string): Promise<void>,
    ReportOrders(idDocument: string): Promise<void>,
    idDocument: string,
    typeorder: string
}

export function ThumbsOrder(props: ThumbsOrders) {

    const { AcceptOrders, idDocument, typeorder, ReportOrders } = props;
    const { user } = useContext(AuthContex);
    const theme = useTheme()

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', width: "40%" }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column", width: "40%" }} disabled={false}>
                    <IconButton icon={() => <Icon name="exclamation-circle" size={20} color={theme.colors.third} />} style={{ alignSelf: "center" }} disabled={false}
                        onPress={() => ReportOrders(idDocument)}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <IconButton icon={() => <Icon name="check-circle" size={20} color={theme.colors.onSurface} />} style={{ alignSelf: "center" }}
                        onPress={() => AcceptOrders(idDocument)}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export function ThumbsOrderPoint(props: Thumbs) {

    const { AcceptOrders, idDocument, typeorder, ReportOrders } = props;
    const { user } = useContext(AuthContex);
    const theme = useTheme()

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', width: "40%" }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }} disabled={false}>
                    <IconButton icon={() => <Icon name="exclamation-circle" size={20} color={theme.colors.third} />} style={{ alignSelf: "center" }} disabled={false}
                        onPress={() => ReportOrders(idDocument, user, typeorder)}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }}>
                    <IconButton icon={() => <Icon name="thumbs-up" size={20} color="#2979ff" />} style={{ alignSelf: "center" }}
                        onPress={() => AcceptOrders(idDocument, user, typeorder)}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}