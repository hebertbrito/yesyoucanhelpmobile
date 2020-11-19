import React, { useEffect, useState, useContext } from 'react';
import { Alert, Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const thememaps = require('../../assets/theme/darkmaptheme.json');
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable';


//Services
import { GetDataMaps } from '../../services/api/GetDataMaps';
import { GetDetailsCardAskConstributions, GetDetailsCardInfoHouseless } from '../../services/api/DetailsCard';
import { AcceptOrders, ReportOrders } from '../../services/api/ActionOrders'

//Context
import AuthContext from '../../context/auth'

//components
import { FabButton, MarkerContribution, CardDetailsInfo } from '../../components';
import { Maps } from './maps'

//models
import { LocationModel, MapsLocationModels, ItemMapsLocationModels, CardDetails, UserLogin } from '../../models';
import { useFocusEffect } from '@react-navigation/native';

const MapsScreen = ({ ...props }) => {

    const { user } = useContext(AuthContext);
    const paperTheme = useTheme();

    const [choicetheme, setChoiceTheme] = useState<boolean>(false);
    const [location, setLocation] = useState<MapsLocationModels>({latitude: 0, longitude: 0, latitudeDelta: 0.2, longitudeDelta: 0.2});
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(true);
    const [lstContribution, setlstContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstAskContribution, setlstAskContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstInfoHouseless, setlstInfoHouseless] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setvisible] = useState(false);
    const [cardDetails, setCardDetails] = useState<CardDetails | undefined>()


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
            WatchGeolocation()
            async function teste() {
                const response = await GetDataMaps(user!)

                if (response != undefined) {

                    setlstAskContribution(response.lstAskContribution);
                    setlstContribution(response.lstContribution);
                    setlstInfoHouseless(response.lstInfoHouseless);

                }

            }
            
            teste();
            setIsLoading(false)
            return () => {
                //do something when screen are unfocused
                setIsLoading(true)
                null
            }
        }, [])
    );

    function switchtheme() {
        setChoiceTheme(choicetheme ? false : true);
    }

    function visibileAnimatable() {
        setvisible(visible ? false : true)
    }

    async function getDetailsCardAskontributions(idDocument: string) {
        const objCardDetails = await GetDetailsCardAskConstributions(idDocument, user);

        if (objCardDetails) {
            setCardDetails(objCardDetails)
            console.log(objCardDetails)
        }

    }

    async function getDetailsCardInfoHouseless(idDocument: string) {
        const objCardDetails = await GetDetailsCardInfoHouseless(idDocument, user);

        if (objCardDetails) {
            setCardDetails(objCardDetails)
            console.log(objCardDetails)
        }

    }

    function CloseCardDetails() {
        setvisible(false);
        setCardDetails(undefined)
    }

    async function acceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
        await AcceptOrders(idDocument, user, typeorder);
        Alert.alert("Você aceitou um chamado. Obrigado!.")
    }

    async function reportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
        await ReportOrders(idDocument, user, typeorder);
        Alert.alert("Você solicitou um alerta para este chamado. Obrigado!.");
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
                    getDetailsCardAskontributions={getDetailsCardAskontributions}
                    getDetailsCardInfoHouseless={getDetailsCardInfoHouseless}
                />
                <FabButton switchtheme={switchtheme} drawernavigator={props.navigate} />

                {visible && cardDetails ?
                    <CardDetailsInfo
                        visibileAnimatable={visibileAnimatable}
                        objCardDetails={cardDetails}
                        CloseCardDetails={CloseCardDetails}
                        AcceptOrders={acceptOrders}
                        ReportOrders={reportOrders}
                    />
                    :
                    null
                }


            </SafeAreaView>
        )
    }


}

export default MapsScreen;