import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: '#292F6D',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_text: {
        color: "white",
        fontSize: 20
    },
    section: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 1,
        borderTopColor: "#c0c0c0",
    },
    match_number: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    qr_container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    qr_icon: {
        padding: 10
    },
    content: {
        alignItems: 'center',
    }
});