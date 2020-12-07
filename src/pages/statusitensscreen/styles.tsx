import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    bottomMenus: {
        width: "95%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "1%",
        borderColor: "red",
        marginBottom: "2%"
    },
    button: {
        width: "50%",
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        borderRadius: 5
    }
})