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
        padding: 20
    },

    styleProgressView: {
        display: "flex"
    }
})