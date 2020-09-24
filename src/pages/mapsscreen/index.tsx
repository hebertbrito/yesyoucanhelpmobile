import React, { useEffect, useState, useContext } from 'react';
import { Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Text, useTheme } from 'react-native-paper';
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
import { size } from 'lodash';

interface MapItems {
    lstContribution: Array<ItemMapsLocationModels>,
    lstAskContribution: Array<ItemMapsLocationModels>,
    lstInfoHouseless: Array<ItemMapsLocationModels>;
}

const MapsScreen = ({ ...props }) => {

    const { user } = useContext(AuthContext);
    const paperTheme = useTheme();

    const [choicetheme, setChoiceTheme] = useState<boolean>(false);
    const [location, setLocation] = useState<MapsLocationModels>({} as MapsLocationModels);
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(true);
    const [lstContribution, setlstContribution] = useState<Array<ItemMapsLocationModels>>()
    const [lstAskContribution, setlstAskContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstInfoHouseless, setlstInfoHouseless] = useState<Array<ItemMapsLocationModels>>();
    const [isLoading, setIsLoading] = useState(true);

    function WatchGeolocation() {
        const idWatch = Geolocation.watchPosition((sucess) => {
            if (sucess.coords) {
                console.log(sucess.coords)
                setLocation({ latitude: sucess.coords.latitude, longitude: sucess.coords.longitude, latitudeDelta: 1.0, longitudeDelta: 1.5 });
            }
        }, (error) => {
            setMessageError(error.message)
        }, { enableHighAccuracy: true, distanceFilter: 1, interval: 2000 });

        setIdWatch(idWatch)
    }

    function GetGeolocation() {
        Geolocation.getCurrentPosition((sucess) => {
            console.log(sucess.coords)
            if (sucess.coords) {
                setLocation({ latitude: sucess.coords!.latitude!, longitude: sucess.coords!.longitude!, latitudeDelta: 1.0, longitudeDelta: 1.5 })
            }
        })
    }


    useEffect(() => {

        async function teste() {
            const response = await GetDataMaps(user!)

            if (response != undefined) {

                setlstAskContribution(response.lstAskContribution);
                setlstContribution(response.lstContribution);
                setlstInfoHouseless(response.lstInfoHouseless);

            }

        }


        teste();
        GetGeolocation()

        setIsLoading(false)

    }, [setIsLoading])

    useEffect(() => {
        WatchGeolocation();
    }, [])

    function switchtheme() {
        setChoiceTheme(choicetheme ? false : true);
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
                    // initialRegion={region[0]}
                    region={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.4, longitudeDelta: 0.4 }}
                    mapType={"standard"}
                >

                    {lstAskContribution?.map(marker => (
                        <MarkerAnimated key={marker.idDocument}
                            coordinate={{ latitude: marker.latitude!, longitude: marker.longitude! }}
                            rotation={5} pinColor={paperTheme.colors.primary}
                            icon={require('../../assets/fotospublic/hand-holding2.png')}
                        >
                            <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}>
                                <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                                    {marker.description?.substring(0, 45) + '...'}
                                </Text>
                            </Callout>
                        </MarkerAnimated>
                    ))}

                    {lstInfoHouseless?.map(marker => (
                        <MarkerAnimated key={marker.idDocument}
                            coordinate={{ latitude: marker.latitude!, longitude: marker.longitude! }}
                            rotation={10} pinColor={paperTheme.colors.primary}
                            icon={require('../../assets/fotospublic/user-injured2.png')}
                        >
                            <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}>
                                <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                                    {marker.description?.substring(0, 45) + '...'}
                                </Text>
                            </Callout>
                        </MarkerAnimated>
                    ))}

                </MapView>
                <FabButton switchtheme={switchtheme} drawernavigator={props.navigate} />
            </SafeAreaView>
        )
    }


}

export default MapsScreen;