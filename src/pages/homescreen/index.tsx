import React, { useContext, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Button, Text, ProgressBar, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//componentes
import { ProgressBarComponent } from '../../components/progressbar'
import { } from '../../components/buttons'
import { ButtonDrawer } from '../../components/buttonDrawer'

//services
import { GetPorcentDatas } from '../../services/api/PorcentDatas'

//context
import auth from '../../context/auth'
const HomeScreen = ({ ...props }) => {
    const { user } = useContext(auth)
    const paperTheme = useTheme();
    const { navigate } = useNavigation();
    const [bestprofileporcent, setbestProfilePorcent] = useState(0)
    const [contributionPorcent, setContributionPorcent] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            async function getporcentdatas() {
                try {
                    const response = await GetPorcentDatas(user!)
                    setbestProfilePorcent(response.porcentuserprofile)
                    setContributionPorcent(response.porcentcontribution)
                } catch (error) {
                    console.log(error)
                }
            }
            getporcentdatas()
            return () => {
                null
            }
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeView}>
            <Animatable.Image animation="fadeInDown" delay={500} useNativeDriver={true} source={require('../../assets/fotospublic/social.jpg')}
                style={{ height: '62%', width: '100%', position: "absolute", resizeMode: "cover" }}
                borderBottomLeftRadius={20} borderBottomRightRadius={20} />
            <ButtonDrawer navigate={navigate} />
            <Animatable.View animation="slideInUp" delay={500} useNativeDriver={true} style={styles.viewInfo}>
                <View style={{ marginBottom: 20, marginTop: 30 }}>
                    <ProgressBarComponent title="home_progressbar_best_profile" value={bestprofileporcent} />
                    <ProgressBarComponent title="home_progressbar_contributions" value={contributionPorcent} />
                </View>


                <TouchableOpacity style={styles.touchpad} onPress={() => navigate("MapsScreen")}>
                    <Icon name="map-marked-alt" size={30} />
                    <Text style={{ color: "#000000" }}>
                        Maps
                    </Text>
                </TouchableOpacity>
            </Animatable.View>



        </SafeAreaView>
    )
}

export default HomeScreen;
