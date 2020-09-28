import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Lottie from "lottie-react-native";

const gifError = require('../../assets/lottiefiles/gifError.json')

export function LottieError() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Lottie source={gifError}
                resizeMode="contain"
                autoSize
                autoPlay loop
                style={{ width: "100%" }}
            />
        </SafeAreaView>
    )
}