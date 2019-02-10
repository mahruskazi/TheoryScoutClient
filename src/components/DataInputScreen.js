import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/DataInputScreen.style";
import constants from '../constants/DataInputConstants'
import Orientation from "react-native-orientation";
import { Button } from "react-native-elements";
import { Icon } from "native-base";
import StartMatchDialog from "./DataInputPopups/StartMatchDialog";

import { connect } from "react-redux";
import CargoShipDialog from "./DataInputPopups/CargoShipDialog";

/*
    This classes is used to collect match data
*/

class DataInputScreen extends Component {

  CARGO_SHIP = 0;



  constructor(props) {
    super(props);
    this.state = {
      match_started: false,
      period: 0,
      start_dialog: false,
      cargo_dialog: {
        location: "",
        object_type: "",
        visible: false
      },
      current_time: "0:00",
      timer: null,
      seconds: 0,
      minutes: 0,
      counter: 0,
      match_data: {
        match_number: 0,
        team_number: 1241,
        scout_name: "Kazi",
        starting_position: "CENTER",
        starting_level: 0,
        auto: {
          hab: {
            level_one_success: 0,
            level_one_fail: 0,
            level_two_success: 0,
            level_two_fail: 0
          },
          cargo_ship: {
            cargo: {
              missed: 0,
              scored: 0
            },
            hatch: {
              missed: 0,
              scored: 0
            }
          },
          rocket: {
            cargo: {
              low: {
                missed: 0,
                scored: 0
              },
              mid: {
                missed: 0,
                scored: 0
              },
              high: {
                missed: 0,
                scored: 0
              }
            },
            hatch: {
              low: {
                missed: 0,
                scored: 0
              },
              mid: {
                missed: 0,
                scored: 0
              },
              high: {
                missed: 0,
                scored: 0
              }
            }
          },
          actions: [
            {
              time_stamp: 0,
              location: 0,
              action_code: 0
            }
          ]
        },
        tele: {
          cargo_ship: {
            cargo: {
              missed: 0,
              scored: 0
            },
            hatch: {
              missed: 0,
              scored: 0
            }
          },
          rocket: {
            cargo: {
              low: {
                missed: 0,
                scored: 0
              },
              mid: {
                missed: 0,
                scored: 0
              },
              high: {
                missed: 0,
                scored: 0
              }
            },
            hatch: {
              low: {
                missed: 0,
                scored: 0
              },
              mid: {
                missed: 0,
                scored: 0
              },
              high: {
                missed: 0,
                scored: 0
              }
            }
          },
          actions: [
            {
              time_stamp: 0,
              location: 0,
              action_code: 0
            }
          ]
        },
        end_game: {
          success: false,
          attempted: false,
          level: 0,
          time_stamp: 0
        },
        times_defended: 0,
        times_got_defended: 0,
        died: false,
        times_dropped_object: 0
      }
    };
  }

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
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

  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("To Landscape");
    } else {
      // do something with portrait layout
    }
  };

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
    this.clearInterval(this.state.timer);
  }

  tick() {
    let counter = this.state.counter + 1;
    let minutes = Math.floor(counter / 60);
    let seconds = counter % 60;
    let current_time = minutes + ":" + ("0" + seconds).slice(-2);
    seconds = seconds % 60;
    this.setState({
      seconds,
      minutes,
      counter,
      current_time
    });

    if (counter == 150) {
      clearInterval(this.state.timer);
    }
  }

  start_match() {
    if (!this.state.match_started) {
      this.setState({ start_dialog: true });
    }
  }

  period_buttons() {
    if (this.state.period == 2) {
      return (
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            alignContent: "space-around",
            justifyContent: "space-around",
            flex: 1
          }}
        >
          <Button title="DEFENDED" raised buttonStyle={{}} />
          <Button
            title="GOT DEFENDED"
            raised
            buttonStyle={{ backgroundColor: "black" }}
          />
          <Button
            title="DEAD"
            raised
            buttonStyle={{ backgroundColor: "red" }}
          />
          <Button
            title="DROPPED"
            raised
            buttonStyle={{ backgroundColor: "purple" }}
          />
        </View>
      );
    } 
    else if (this.state.period == 1){
        <View style={{ marginLeft: 5, marginRight: 5 }}>
          <Button
            title="TELE"
            raised
            buttonStyle={{ backgroundColor: "yellow" }}
            onPress={() => console.log("PRESSED")}
          />
          <Text>AUTO</Text>
        </View>
    }
    else {
      return (
        <View style={{ marginLeft: 5, marginRight: 5 }}>
          <Button
            title="START"
            raised
            buttonStyle={{ backgroundColor: "green", width: "100%" }}
            onPress={() => this.start_match()}
          />
        </View>
      );
    }
  }

  _startDialogConfirmed = data => {
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState(state => {
      const start_dialog = false;
      const match_started = true;
      let starting_position = data.position;
      let starting_level = data.level;
      let period = 1;

      return {
        start_dialog,
        match_started,
        timer,
        starting_position,
        starting_level,
        period
      };
    });
  };

  _cargoDialogConfirmed = data => {
    this.setState(state => {
        const actions = state.auto
  
        return {
          start_dialog,
          match_started,
          timer,
          starting_position,
          starting_level
        };
      });
  };

  render() {
    const { cargo_dialog } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.hab_buttons}>
          <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1 }}>
            <View style={styles.rocket_section}>
              <View style={{ flex: 25, backgroundColor: "white" }} />
              <View style={styles.rocket_buttons}>
                <TouchableOpacity
                  style={[
                    styles.ship_hatch_button,
                    { borderBottomLeftRadius: 20 }
                  ]}
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ship_cargo_button]}>
                  <Text style={styles.cargo_button_text}>CARGO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.ship_hatch_button,
                    { borderBottomRightRadius: 20 }
                  ]}
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 25, backgroundColor: "white" }} />
            </View>
            <View style={styles.floor_section}>
              <TouchableOpacity style={styles.pickup_button}>
                <Text>FLOOR PICKUP</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cargo_ship_section}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  {/* BLANK SPACE LEFT BESIDE THE SHIP */}
                </View>
                <View style={styles.cargo_ship}>
                  <View style={styles.cargo_ship_front_buttons}>
                    <TouchableOpacity
                      style={[
                        styles.ship_hatch_button,
                        { borderTopLeftRadius: 20 }
                      ]}
                    >
                      <Text
                        style={styles.hatch_button_text}
                        onPress={() =>
                          this.setState({
                            cargo_dialog: {
                              object_type: constants.object_type.HATCH,
                              visible: true,
                              location: constants.CARGO_SHIP
                            }
                          })
                        }
                      >
                        HATCH
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.ship_cargo_button,
                        { borderBottomLeftRadius: 20 }
                      ]}
                    >
                      <Text style={styles.cargo_button_text}>CARGO</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 66, flexDirection: "column" }}>
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
              <View style={{ flex: 25, backgroundColor: "white" }} />
              <View style={styles.rocket_buttons}>
                <TouchableOpacity
                  style={[
                    styles.ship_hatch_button,
                    { borderTopLeftRadius: 20 }
                  ]}
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ship_cargo_button]}>
                  <Text style={styles.cargo_button_text}>CARGO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.ship_hatch_button,
                    { borderTopRightRadius: 20 }
                  ]}
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 25, backgroundColor: "white" }} />
            </View>
          </View>
        </View>
        <View style={styles.action_section}>
          <View
            style={{ flex: 15, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              title="BACK"
              type="outline"
              icon={
                <Icon
                  name="arrow-back"
                  style={{ color: "#008ae6", paddingRight: 10 }}
                />
              }
            />
          </View>
          <View style={{ justifyContent: "center", flex: 70 }}>
            {this.period_buttons()}
          </View>
          <View
            style={{ flex: 15, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.timer}>{this.state.current_time}</Text>
          </View>
        </View>

        {/* DIALOGS */}
        <StartMatchDialog
          visible={this.state.start_dialog}
          cancelPressed={() => this.setState({ start_dialog: false })}
          okPressed={this._startDialogConfirmed}
        />

        <CargoShipDialog
          object_type={this.state.cargo_dialog.object_type}
          visible={this.state.cargo_dialog.visible}
          cancelPressed={() =>
            this.setState({ cargo_dialog: { ...cargo_dialog, visible: false } })
          }
          okPressed={this._cargoDialogConfirmed}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches
  };
}

//make this component available to the app
export default connect(mapStateToProps)(DataInputScreen);
