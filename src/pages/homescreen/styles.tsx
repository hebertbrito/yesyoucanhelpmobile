import { StyleSheet, PermissionsAndroid } from 'react-native';

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column"
    },
    viewInfo: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: '40%',
        zIndex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        justifyContent: "center"
    },

    styleProgressView: {
        display: "flex"
    },
    touchpad: {
        alignSelf: "center",
        width: 80,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#FAFAFA',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 16.00,
        elevation: 2,
        borderRadius: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0DFF94"
    }
})