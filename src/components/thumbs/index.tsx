import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//context
import AuthContex from '../../context/auth'

//models
import { UserLogin } from '../../models'

interface Thumbs {
    AcceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    ReportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string): void,
    idDocument: string,
    typeorder: string
}

export function Thumbs(props: Thumbs) {

    const { AcceptOrders, idDocument, typeorder, ReportOrders } = props;
    const { user } = useContext(AuthContex);

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }} disabled={false}>
                    <IconButton icon={() => <Icon name="thumbs-down" size={20} color="#d50000" />} style={{ alignSelf: "center" }} disabled={false}
                        onPress={() => ReportOrders(idDocument, user, typeorder)}
                    />
                    <Paragraph>Report</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }}>
                    <IconButton icon={() => <Icon name="thumbs-up" size={20} color="#2979ff" />} style={{ alignSelf: "center" }}
                        onPress={() => AcceptOrders(idDocument, user, typeorder)}
                    />
                    <Paragraph>Accept</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export function ThumbsOrder(props: Thumbs) {

    const { AcceptOrders, idDocument, typeorder, ReportOrders } = props;
    const { user } = useContext(AuthContex);

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', width: "40%" }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }} disabled={false}>
                    <IconButton icon={() => <Icon name="thumbs-down" size={20} color="#d50000" />} style={{ alignSelf: "center" }} disabled={false}
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