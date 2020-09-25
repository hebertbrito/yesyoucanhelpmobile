import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Thumbs() {
    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
            <View style={{
                width: '50%', display: "flex", flexDirection: "row", marginTop: '2%',
                justifyContent: 'space-evenly'
            }}>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }} disabled={false}>
                    <IconButton icon={() => <Icon name="thumbs-down" size={20} color="#d50000" />} style={{ alignSelf: "center" }} disabled={false} />
                    <Paragraph>Report</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity style={{ display: "flex", flexDirection: "column" }}>
                    <IconButton icon={() => <Icon name="thumbs-up" size={20} color="#2979ff" />} style={{ alignSelf: "center" }} />
                    <Paragraph>Accept</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}