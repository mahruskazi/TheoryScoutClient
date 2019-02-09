import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#292F6D',
        flex: 1,
    },
    welcome_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    image: {
        height: 250,
        width: 250,
    },
    button_container: {
        backgroundColor: "white",
        height: 100,
        alignItems: "center",
        justifyContent: "space-evenly",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    button: {
        flexDirection: 'row',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});