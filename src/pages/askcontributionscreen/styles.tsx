import { StyleSheet, PermissionsAndroid } from 'react-native';

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%',
        padding: 0,
        margin: 0
    },
    containerSafe: {
        flex: 1,
        margin: 0,
        padding: 0
    },
    containerCard: {
        borderColor: '#000000',
        borderWidth: 1,
        width: '85%',
        margin: 5,
        height: 210,
        borderRadius: 20
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
    },
    titleCard: {
        height: '23%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ef6c00",
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderTopRightRadius: 19,
        borderTopLeftRadius: 19
    },
    titleText: {
        alignSelf: "center",
        color: '#000000'
    },
    bodyCard_1: {
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    button_produt_add: {
        margin: 5,
        backgroundColor: '#000000',
        width: '70%'
    },

    //list
    containerlist: {
        width: '95%',
        height: 120,
        marginTop: 15,
        marginBottom: 8
    },
    scrollViewDisplay: {
        width: '100%',
        backgroundColor: '#eeeeee',
        padding: 5
    },
    bodySrollView: {
        width: '95%',
        display: "flex",
        flexDirection: "column",
        borderColor: '#fdd835',
        borderWidth: 2,
        alignSelf: "center"
    },
    titleList: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fdd835",
        alignItems: "center"
    },
    info_list: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fafafa"
    },

    //checkpoint
    containerCheckpoint: {
        width: '95%',
        display: "flex",
        flexDirection: "column",
        marginTop: 15
    },
    titleTextCheckpoint: {
        alignSelf: "flex-start",
        margin: 5,
        padding: 3
    },
    viewCardCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
        width: '95%',
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

    informationAnimatable: {
        width: '93%',
        paddingLeft: '2%',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#e0e0e0",
        alignSelf: "center",
        elevation: 2
    },
})