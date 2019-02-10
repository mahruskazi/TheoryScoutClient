import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/DataInputScreen.style'
import Orientation from 'react-native-orientation';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base'
import StartMatchDialog from './DataInputPopups/StartMatchDialog'

export default class DataInputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        match_started: false,
        current_time: '0:00',
        timer: null,
        seconds: 0,
        minutes: 0,
        counter: 0,
        start_dialog: false
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
    this.clearInterval(this.state.timer);
  }

  tick() {
    let counter = this.state.counter + 1
    let minutes = Math.floor(counter / 60);
    let seconds = counter % 60;
    let current_time = minutes + ":" + ('0' + seconds).slice(-2)
    seconds = seconds % 60;
    this.setState({
      seconds,
      minutes,
      counter,
      current_time
    });

    if(counter == 150){
        clearInterval(this.state.timer);
    }
  }

  start_match() {
    if(!this.state.match_started){
        this.setState({start_dialog: true});
    }
  }

  period_buttons() {
    if(this.state.match_started){
        return (
            <View style={{paddingLeft: 5, paddingRight: 5, alignContent: 'space-around', justifyContent: 'space-around', flex: 1}}>
                <Button
                    title='DEFENDED'
                    raised
                    buttonStyle={{ }}
                />
                <Button
                    title='GOT DEFENDED'
                    raised
                    buttonStyle={{backgroundColor: 'black', }}
                />
                <Button
                    title='DEAD'
                    raised
                    buttonStyle={{backgroundColor: 'red', }}
                />
                <Button
                    title='DROPPED'
                    raised
                    buttonStyle={{backgroundColor: 'purple'}}
                />
            </View>
        )
    }
    else {
        return (
            <View style={{marginLeft: 5, marginRight: 5}}>
                <Button title="START" 
                        raised 
                        buttonStyle={{backgroundColor: 'green', width: '100%'}}
                        onPress={() => this.start_match()}/>
            </View>
        )
    }
  }

  _startDialogConfirmed = (data) => {
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState({start_dialog: false, match_started: true, timer})
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
                <View style={{flex: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        title="BACK"
                        type="outline"
                        icon={
                            <Icon name='arrow-back' style={{color: '#008ae6', paddingRight: 10}}/>
                        }
                    />
                </View>
                <View style={{justifyContent: 'center', flex: 70}}>
                    {this.period_buttons()}
                </View>
                <View style={{flex: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.timer}>{this.state.current_time}</Text>
                </View>
            </View>

            {/* DIALOGS */}
            <StartMatchDialog 
                visible={this.state.start_dialog}
                cancelPressed={() => this.setState({start_dialog: false})}
                okPressed={this._startDialogConfirmed}
            />        
        </View>
    );
  }
}
