import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeView:{
        margin: 0,
        padding: 0,
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    viewCardCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
       
    },
    itemCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ef6c00",
        borderRadius: 10,
        alignContent: "center",
    },
    titleText: {
        alignSelf: "center",
        color: '#000000'
    },

})