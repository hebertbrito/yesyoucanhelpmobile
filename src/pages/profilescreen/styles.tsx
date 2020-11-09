import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%'
    },
    viewContainer: {
        width: '100%',
        flex: 1,
        alignItems: "center"
    },
    LinearGradient: {
        width: '100%',
        height: '30%',
        alignItems: "center",
        position: "absolute",
        zIndex: -1
    },

    //cardImageContainer
    bodyCard: {
        display: "flex",
        alignItems: "center",
        width: '50%'
    },

    //scroll
    subContainerScroll: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: '2%'
    },

    containerInput: {
        display: "flex",
        width: '90%',
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: '2%',
        alignSelf: "center"
    },

    view_1_input: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    }
})