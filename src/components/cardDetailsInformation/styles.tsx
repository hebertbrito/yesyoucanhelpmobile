import { StyleSheet } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    animatableView: {
        position: 'absolute',
        alignSelf: 'center',
        elevation: 24,
        bottom: 0,
        backgroundColor: 'transparent',
        height: 470,
        width: '100%',
        alignContent: "center",
        alignItems: "center",
    },
    styleaVatar: {
        alignSelf: "center",
        position: "absolute",
        elevation: 13
    },
    body_card: {
        width: '90%',
        marginTop: '10%',
        flex: 1
    },
    sub_body: {
        width: '100%',
        alignItems: "center",
        marginTop: '5%',
        display: "flex",
        flexDirection: "column",
        elevation: 1
    },
    Icon: {
        alignSelf: "flex-end",
        marginRight: '10%',
        marginTop: '3%',
        elevation: 1
    }
})

export default styles;