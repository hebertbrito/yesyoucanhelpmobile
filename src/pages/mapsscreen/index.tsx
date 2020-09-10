import React, { Component } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle } from 'react-native-maps';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


const MapsScreen = () => {

    const icone = () => {

        <Icon size={20} name="home" />

    }

    const region = [
        {
            latitude: -22.8356143,
            longitude: -47.0512416,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
        },
        {
            latitude: -22.785015,
            longitude: -47.192458,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        {
            latitude: -22.908775,
            longitude: -47.075943,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        {
            latitude: -22.795969,
            longitude: -47.186727,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
    ]

    return (
        <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={region[0]} mapType="standard" showsUserLocation={true}>
            <Marker
                coordinate={region[1]}
            >
                <Callout tooltip={false}>
                    <Text>Houseless</Text>
                </Callout>
            </Marker>
        </MapView>
    )
}

export default MapsScreen;