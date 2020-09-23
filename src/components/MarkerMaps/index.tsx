import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';

import { ItemMapsLocationModels } from '../../models'

interface MarkerMaps {
    lstContribution: Array<ItemMapsLocationModels>,
}

export function MarkerContribution(props: MarkerMaps) {

    const { lstContribution } = props;

    {
        lstContribution.forEach(item => {
            return (
                <Marker key={item.idDocument} coordinate={{ latitude: item.latitude!, longitude: item.longitude! }}>
                    <Callout>
                        {item.description}
                    </Callout>
                </Marker>
            )
        })
    }

}