import { StyleSheet } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    animatableView: {
        position: 'absolute',
        alignSelf: 'center',
        elevation: 24,
        backgroundColor: "transparent",
        bottom: 0,
        height: 700,
        width: '100%',
        alignContent: "center",
        alignItems: "center",
    }
})

export default styles;