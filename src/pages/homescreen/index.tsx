import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text, ProgressBar, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';


//componentes
import { ProgressBarComponent } from '../../components/progressbar'
import { ButtonCommum } from '../../components/buttonCommum'
import { ButtonDrawer } from '../../components/buttonDrawer'

const HomeScreen = ({ ...props }) => {
    const paperTheme = useTheme()
    const { navigate } = useNavigation()
    return (
        <SafeAreaView style={styles.safeView}>
            <Animatable.Image animation="fadeInDown" delay={500} useNativeDriver={true} source={require('../../assets/fotospublic/social.jpg')}
                style={{ height: '62%', width: '100%', position: "absolute" }}
                borderBottomLeftRadius={20} borderBottomRightRadius={20} />
            <ButtonDrawer navigate={navigate} />
            <Animatable.View animation="slideInUp" delay={500} useNativeDriver={true} style={styles.viewInfo}>
                <View style={{ marginBottom: 20, marginTop: 30 }}>
                    <ProgressBarComponent title="Better Profile" value={6} />
                    <ProgressBarComponent title="Contributions" value={4} />
                    <ProgressBarComponent title="Requests" value={6} />
                </View>
                <ButtonCommum {...props} nameButton="Contribuition" width="50%" height={40} iconName="hands-helping" navigate={navigate} screenNameNavigate="ContributionScreen" colorHexa="#ef6c00" />

            </Animatable.View>

        </SafeAreaView>
    )
}

export default HomeScreen;