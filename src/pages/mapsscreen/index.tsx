import React, { useEffect, useState, useContext } from 'react';
import { Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const thememaps = require('../../assets/theme/darkmaptheme.json');
import Geolocation from 'react-native-geolocation-service';

//Services
import { GetDataMaps } from '../../services/api/GetDataMaps'

//Context
import AuthContext from '../../context/auth'

//components
import { FabButton, MarkerContribution } from '../../components';

//models
import { LocationModel, MapsLocationModels, ItemMapsLocationModels } from '../../models'

interface MapItems {
    lstContribution: Array<ItemMapsLocationModels>,
    lstAskContribution: Array<ItemMapsLocationModels>,
    lstInfoHouseless: Array<ItemMapsLocationModels>;
}

const MapsScreen = ({ ...props }) => {

    const { user } = useContext(AuthContext)

    const [choicetheme, setChoiceTheme] = useState<boolean>(false);
    const [location, setLocation] = useState<MapsLocationModels>({} as MapsLocationModels);
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(true);
    const [lstContribution, setlstContribution] = useState<Array<ItemMapsLocationModels>>()
    const [lstAskContribution, setlstAskContribution] = useState<Array<ItemMapsLocationModels>>()
    const [lstInfoHouseless, setlstInfoHouseless] = useState<Array<ItemMapsLocationModels>>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function teste() {
            const response = await GetDataMaps(user!)

            if (response != undefined) {

                setlstAskContribution(response.lstAskContribution);
                setlstContribution(response.lstContribution);
                setlstInfoHouseless(response.lstInfoHouseless);

            }

        }


        teste()

        setIsLoading(false)

    }, [setIsLoading])

    function GetLocation() {
        const idWatch = Geolocation.watchPosition((sucess) => {
            if (sucess) {
                setLocation({ latitude: sucess.coords.latitude, longitude: sucess.coords.longitude, latitudeDelta: 0, longitudeDelta: 0 });
            }
        }, (error) => {
            setMessageError(error.message)
        }, { enableHighAccuracy: true, distanceFilter: 1, interval: 2000 });

        setIdWatch(idWatch)
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

    function switchtheme() {
        setChoiceTheme(choicetheme ? false : true);
    }

    function renderAskContribution(lstAskContribution: Array<ItemMapsLocationModels>) {

        return (

            lstAskContribution.forEach(item => {
                <Marker
                    coordinate={{ latitude: item.latitude!, longitude: item.longitude! }}
                >
                    <Callout tooltip={false}>
                        <Text>{item.description}</Text>
                    </Callout>
                </Marker>
            })

        )
    }


    if (isLoading) {
        return (
            <View>
                <Text>
                    khsdgfsdhgfds
                </Text>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
                <MapView style={{ flex: 1, zIndex: -1, width: '100%' }} provider={PROVIDER_GOOGLE}
                    showsUserLocation={true} customMapStyle={choicetheme ? thememaps : []}
                    initialRegion={region[0]}
                    mapType={"standard"}
                >


                </MapView>
                <FabButton switchtheme={switchtheme} drawernavigator={props.navigate} />
            </SafeAreaView>
        )
    }


}

export default MapsScreen;