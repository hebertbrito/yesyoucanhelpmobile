import * as React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%'
    },
    scrollContainer: {
        width: '100%'
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center"
    },
    viewTitle: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        margin: 25
    },
    informationAnimatable: {
        width: '90%',
        paddingLeft: '2%',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#e0e0e0",
        elevation: 2
    },
    containerButton: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10, marginBottom: 10
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