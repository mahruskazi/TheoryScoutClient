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
    settings_container: {
        padding: 10
    },
    header_text: {
        color: "white",
        fontSize: 20
    },
    heading_text: {
        fontSize: 15,
        color: '#292F6D',
        fontWeight: 'bold',
    },
    select_event_button: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    event_text: {
        fontSize: 13
    },
    input_orientation: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});