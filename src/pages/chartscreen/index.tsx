import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';

function ChartScreen() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
           <LottieView source={require('../../assets/lottiefiles/gifError.json')} autoPlay loop speed={0.5}/>
        </SafeAreaView>
    )
}

export default ChartScreen;