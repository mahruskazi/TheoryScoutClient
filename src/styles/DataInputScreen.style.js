import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    hab_buttons: {
        flex: 20,
        flexDirection: 'column'
    },
    field_section: {
        flex: 65,
        flexDirection: 'column'
    },
    action_section: {
        backgroundColor: '#f2f2f2',
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back_button: {
        flex: 1
    },
    feeder: {
        backgroundColor: '#061246',
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    feeder_text: {
        color: 'white'
    },
    cargo_depot: {
        backgroundColor: 'orange',
        flex: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cargo_depot_text: {
        color: 'black',
        fontWeight: 'bold',
    },
    end_game: {
        backgroundColor: 'red',
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    end_game_text: {
        color: 'white'
    },
    rocket_section: {
        flex: 20,
        flexDirection: 'row'
    },
    rocket_buttons: {
        flex: 50,
        flexDirection: 'row'
    },
    floor_section: {
        backgroundColor: 'white',
        flex: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickup_button: {
        height: 50,
        width: 150,
        backgroundColor: '#499360',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    cargo_ship_section: {
        flex: 30,
    },
    cargo_ship: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    cargo_ship_top_buttons: {
        flex: 1,
        flexDirection: 'row', 
        paddingBottom: 1,
    },
    cargo_ship_bottom_buttons: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 1,
    },
    cargo_ship_front_buttons: {
        flex: 33,
        flexDirection: 'column',
        paddingRight: 2,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    ship_hatch_button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#123175',
    },
    hatch_button_text: {
        color: 'white'
    },
    ship_cargo_button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#5298C1'
    },
    cargo_button_text: {
        color: 'white'
    },
    timer: {
        fontSize: 25
    }
});