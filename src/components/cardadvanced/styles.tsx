import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    animatableContainer: {
        backgroundColor: "transparent",
        width: "95%",
        height: 135,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: "8%"
    },
    viewAvatar: {
        position: "absolute",
        display: "flex",
        marginLeft: "2.8%"
    },
    viewAvatarHouseless: {
        position: "absolute",
        display: "flex",
        marginLeft: "4%"
    },
    subItem: {
        width: "100%",
        height: "33%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "9%"
    },
    subItemDois: {
        width: "100%",
        height: "33%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingLeft: "8.3%",
        alignContent: "center",
        alignSelf: "center",
    },
    subItemTres: {
        width: "100%",
        height: "33%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "12%"
    }
})