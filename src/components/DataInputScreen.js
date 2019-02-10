import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/DataInputScreen.style'
import Orientation from 'react-native-orientation';
import { Button } from 'react-native-elements';

export default class DataInputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        match_started: false
    };
  }

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

  componentDidMount() {
    // this locks the view to Portrait Mode
    //Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      console.log("To Landscape")
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  period_buttons() {
    if(this.state.match_started){
        return (
            <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Button
                    title='DEFENDED'
                    buttonStyle={{ paddingBottom: 10 }}
                />
                <Button
                    title='GOT DEFENDED'
                    buttonStyle={{backgroundColor: 'black'}}
                />
                <Button
                    title='DEAD'
                    buttonStyle={{backgroundColor: 'red'}}
                />
                <Button
                    title='DROPPED'
                    buttonStyle={{backgroundColor: 'purple'}}
                />
            </View>
        )
    }
    else {
        return (
            <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Button title="START" 
                        raised 
                        buttonStyle={{backgroundColor: 'green'}}
                        onPress={() => this.setState({match_started: true})}/>
            </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.hab_buttons}>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.feeder}>
                    <Text style={styles.feeder_text}>FEEDER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cargo_depot}>
                    <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.end_game}>
                    <Text style={styles.end_game_text}>END GAME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cargo_depot}>
                    <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feeder}>
                    <Text style={styles.feeder_text}>FEEDER</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.field_section}>
            <View style={{flex: 1}}>
                <View style={styles.rocket_section}>
                    <View style={{flex: 25, backgroundColor: 'white'}}/>
                    <View style={styles.rocket_buttons}>
                        <TouchableOpacity style={[styles.ship_hatch_button, {borderBottomLeftRadius: 20}]}>
                            <Text style={styles.hatch_button_text}>HATCH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ship_cargo_button]}>
                            <Text style={styles.cargo_button_text}>CARGO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ship_hatch_button, {borderBottomRightRadius: 20}]}>
                            <Text style={styles.hatch_button_text}>HATCH</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 25, backgroundColor: 'white'}}/>
                </View>
                <View style={styles.floor_section}>
                    <TouchableOpacity style={styles.pickup_button}>
                        <Text>FLOOR PICKUP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cargo_ship_section}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, backgroundColor: 'white'}}>
                            {/* BLANK SPACE LEFT BESIDE THE SHIP */}
                        </View>
                        <View style={styles.cargo_ship}>
                            <View style={styles.cargo_ship_front_buttons}>
                                <TouchableOpacity style={[styles.ship_hatch_button, {borderTopLeftRadius: 20}]}>
                                    <Text style={styles.hatch_button_text}>HATCH</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ship_cargo_button, {borderBottomLeftRadius: 20}]}>
                                    <Text style={styles.cargo_button_text}>CARGO</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 66, flexDirection: 'column'}}>
                                <View style={styles.cargo_ship_top_buttons}>
                                    <TouchableOpacity style={styles.ship_hatch_button}>
                                        <Text style={styles.hatch_button_text}>HATCH</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.ship_cargo_button}>
                                        <Text style={styles.cargo_button_text}>CARGO</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cargo_ship_bottom_buttons}>
                                    <TouchableOpacity style={styles.ship_hatch_button}>
                                        <Text style={styles.hatch_button_text}>HATCH</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.ship_cargo_button}>
                                        <Text style={styles.cargo_button_text}>CARGO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.floor_section}>
                    <TouchableOpacity style={styles.pickup_button}>
                        <Text>FLOOR PICKUP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rocket_section}>
                    <View style={{flex: 25, backgroundColor: 'white'}}/>
                    <View style={styles.rocket_buttons}>
                        <TouchableOpacity style={[styles.ship_hatch_button, {borderTopLeftRadius: 20}]}>
                            <Text style={styles.hatch_button_text}>HATCH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ship_cargo_button]}>
                            <Text style={styles.cargo_button_text}>CARGO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ship_hatch_button, {borderTopRightRadius: 20}]}>
                            <Text style={styles.hatch_button_text}>HATCH</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 25, backgroundColor: 'white'}}/>
                </View>
            </View>
        </View>
        <View style={styles.action_section}>
            <View style={{justifyContent: 'center'}}>
                {this.period_buttons()}
            </View>
        </View>
      </View>
    );
  }
}
