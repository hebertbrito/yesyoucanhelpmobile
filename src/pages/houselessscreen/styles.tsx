import * as React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%'
    },
    viewContainer: {
        width: '100%'
    },
    viewCardCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: '95%',
        marginTop: '3%'
    },
    itemCheckBox: {
        paddingLeft: "2.5%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: '#ef6c00',
        justifyContent: "center",
        borderRadius: 10,
        width: '45%'
    },
    ImageAnimatable: {
        maxWidth: 350,
        minWidth: 170,
        maxHeight: 420,
        minHeight: 220,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10
    }
})

export default styles;