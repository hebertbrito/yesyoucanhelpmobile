import React, { useEffect, useState, useContext } from 'react';
import { Alert, Platform, SafeAreaView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const thememaps = require('../../assets/theme/darkmaptheme.json');
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';


//validation
import { SwitchErros } from './validation'

//Services
import { GetDataMaps, GetDatasMapsSpecificPoint } from '../../services/api/GetDataMaps';
import { GetDetailsCardAskConstributions, GetDetailsCardInfoHouseless } from '../../services/api/DetailsCard';
import { AcceptOrders, ReportOrders } from '../../services/api/ActionOrders'

//Context
import AuthContext from '../../context/auth'

//components
import { FabButton, MarkerContribution, CardDetailsInfo, CardOrderPoint, SnackBarYes } from '../../components';
import { Maps } from './maps'

//models
import { LocationModel, MapsLocationModels, ItemMapsLocationModels, CardDetails, UserLogin, ItemMapsSpecificLocation } from '../../models';
import { useFocusEffect } from '@react-navigation/native';

const MapsScreen = ({ ...props }) => {

    const { user } = useContext(AuthContext);
    const paperTheme = useTheme();

    const [choicetheme, setChoiceTheme] = useState<boolean>(false);
    const [location, setLocation] = useState<MapsLocationModels>({ latitude: 0, longitude: 0, latitudeDelta: 0.2, longitudeDelta: 0.2 });
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(true);
    const [lstContribution, setlstContribution] = useState<Array<ItemMapsSpecificLocation>>([] as Array<ItemMapsSpecificLocation>)
    const [lstAskContribution, setlstAskContribution] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>)
    const [lstInfoHouseless, setlstInfoHouseless] = useState<Array<ItemMapsLocationModels>>([] as Array<ItemMapsLocationModels>);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setvisible] = useState(false);
    const [cardDetails, setCardDetails] = useState<CardDetails | undefined>()
    const [iscardorderpoint, setIsCardOrderPoint] = useState(false);
    const [titleCardOrderPoint, SetTitleCardOrderPoint] = useState("")


    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

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
                    setlstInfoHouseless(response.lstInfoHouseless);

                }

            }

            teste();
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
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
        try {
            const objCardDetails = await GetDetailsCardAskConstributions(idDocument, user);

            if (objCardDetails) {
                setCardDetails(objCardDetails)
                console.log(objCardDetails)
            }
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }
    }

    async function getDetailsCardInfoHouseless(idDocument: string) {
        try {
            const objCardDetails = await GetDetailsCardInfoHouseless(idDocument, user);

            if (objCardDetails) {
                setCardDetails(objCardDetails)
                console.log(objCardDetails)
            }
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }
    }

    function CloseCardDetails() {
        setvisible(false);
        setCardDetails(undefined)
    }

    async function acceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
        try {
            await AcceptOrders(idDocument, user, typeorder);
            SwitchErros(200, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }
    }

    async function reportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
        try {
            await ReportOrders(idDocument, user, typeorder);
            SwitchErros(200, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }

    }

    function showiscardorderpoint() {
        setIsCardOrderPoint(!iscardorderpoint)
    }

    //search for speciflocation branch or meetpoint
    async function GetDataBySpecificPoint(titlecardpoint: string, point: number) {
        try {
            const lstresponse = await GetDatasMapsSpecificPoint(user!, point)
            SetTitleCardOrderPoint(titlecardpoint)
            setlstContribution(lstresponse)
            showiscardorderpoint()
        } catch (error) {
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }
    }

    function onPress() {
        setIsVisible(!isVisible)
    }

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <LottieView source={require('../../assets/lottiefiles/location-maps.json')} autoPlay loop />
            </SafeAreaView>
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
                    GetDataBySpecificPoint={GetDataBySpecificPoint}
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

                {iscardorderpoint
                    ?
                    <CardOrderPoint showiscardorderpoint={showiscardorderpoint} lstContribution={lstContribution} title={titleCardOrderPoint} />
                    :
                    null
                }


                <SnackBarYes isVisible={isVisible} onDismiss={onPress} onPress={onPress}
                    text={text}
                    style={{
                        height: 50, width: "90%",
                        backgroundColor: colorbackground, alignSelf: "center", bottom: 15,
                        display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center"
                    }}
                    textcolor={textcolor} subcolorButton={subcolorButton} title={title}
                />
            </SafeAreaView>
        )
    }


}

export default MapsScreen;