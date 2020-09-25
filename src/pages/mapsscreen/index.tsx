import React, { useEffect, useState, useContext } from 'react';
import { Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const thememaps = require('../../assets/theme/darkmaptheme.json');
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable';


//Services
import { GetDataMaps } from '../../services/api/GetDataMaps'

//Context
import AuthContext from '../../context/auth'

//components
import { FabButton, MarkerContribution, CardDetailsInfo } from '../../components';
import { Maps } from './maps'

//models
import { LocationModel, MapsLocationModels, ItemMapsLocationModels } from '../../models';
import { useFocusEffect } from '@react-navigation/native';

const MapsScreen = ({ ...props }) => {

    const { user } = useContext(AuthContext);
    const paperTheme = useTheme();

    const [choicetheme, setChoiceTheme] = useState<boolean>(false);
    const [location, setLocation] = useState<MapsLocationModels>({} as MapsLocationModels);
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(true);
    const [lstContribution, setlstContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstAskContribution, setlstAskContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstInfoHouseless, setlstInfoHouseless] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setvisible] = useState(false);


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

    useFocusEffect(
        React.useCallback(() => {

            async function teste() {
                const response = await GetDataMaps(user!)

                if (response != undefined) {

                    setlstAskContribution(response.lstAskContribution);
                    setlstContribution(response.lstContribution);
                    setlstInfoHouseless(response.lstInfoHouseless);

                }

            }
            WatchGeolocation();
            teste();
            setIsLoading(false)
            return () => {
                //do something when screen are unfocused
                setIsLoading(true)
            }
        }, [])
    );

    function switchtheme() {
        setChoiceTheme(choicetheme ? false : true);
    }

    function visibileAnimatable() {
        setvisible(visible ? false : true)
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
                <Maps
                    choicetheme={choicetheme}
                    lstAskContribution={lstAskContribution}
                    lstContribution={lstContribution}
                    lstInfoHouseless={lstInfoHouseless}
                    userlocation={location}
                    visibileAnimatable={visibileAnimatable}
                />
                <FabButton switchtheme={switchtheme} drawernavigator={props.navigate} />

                {visible ?
                    <CardDetailsInfo visibileAnimatable={visibileAnimatable} />
                    :
                    null
                }


            </SafeAreaView>
        )
    }


}

export default MapsScreen;