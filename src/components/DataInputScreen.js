import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/DataInputScreen.style";
import constants from "../constants/DataInputConstants";
import Orientation from "react-native-orientation";
import { Button, Icon } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import StartMatchDialog from "./DataInputPopups/StartMatchDialog";
import CargoShipDialog from "./DataInputPopups/CargoShipDialog";
import RocketDialog from "./DataInputPopups/RocketDialog";
import AutoDialog from "./DataInputPopups/AutoDialog";
import PickupDialog from "./DataInputPopups/PickupDialog";
import OtherDialog from "./DataInputPopups/OtherDialog";
import EndGameDialog from "./DataInputPopups/EndGameDialog";

import { connect } from "react-redux";

/*
    This class is used to collect match data
*/

class DataInputScreen extends Component {
  constructor(props) {
    super(props);
    data = props.navigation.state.params;
    set =
      data.alliance_color == "red"
        ? this.props.settings.orientation
        : -this.props.settings.orientation;
    flip = set == 1 ? "row" : "row-reverse";
    this.state = {
      match_started: false,
      period: constants.period.NOT_STARTED,
      period_color: "#f2f2f2",
      start_dialog: false,
      auto_dialog: false,
      flip,
      cargo_dialog: {
        location: 0,
        object_type: 0,
        visible: false
      },
      rocket_dialog: {
        location: 0,
        object_type: 0,
        visible: false
      },
      pickup_dialog: {
        location: 0,
        visible: false
      },
      other_dialog: {
        action: 0,
        visible: false,
        text: "Oops",
        title: "Not working"
      },
      end_dialog: false,
      current_time: "0:00",
      timer: null,
      seconds: 0,
      minutes: 0,
      counter: 0,
      has_object: false,
      match_data: {
        mn: data.match_number, // match number
        tn: data.team_number, // team number
        c: data.alliance_color, // alliance color
        sn: data.scout_name, // scout name
        sp: 0, // selected position
        sl: 0, // selected level
        a: {
          // auto
          hs: 0, // hab success
          a: [] // action: [{ a -> action, l -> location, t -> time_stamp }]
        },
        t: {
          // tele
          a: [] // action: [{ a -> action, l -> location, t -> time_stamp }]
        },
        e: {
          // end game
          l: [], // level '0a' or '0c' a = attempted, c = climbed
          t: 0, // time stamp,
          c: ""
        }
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
    Orientation.lockToPortrait();
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
    clearInterval(this.state.timer);
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
    } else if (counter == 15 && this.state.period == constants.period.AUTO) {
      this.setState({ period_color: "red" });
    }
  }

  start_match() {
    if (!this.state.match_started) {
      this.setState({ start_dialog: true });
    }
  }

  period_buttons() {
    if (this.state.period == constants.period.TELE) {
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
          <Button
            title="DEFENDED"
            raised
            buttonStyle={{}}
            onPress={() => this._otherDialogPressed(constants.actions.DEFENDED)}
          />
          <Button
            title="GOT DEFENDED"
            raised
            buttonStyle={{ backgroundColor: "black" }}
            onPress={() =>
              this._otherDialogPressed(constants.actions.GOT_DEFENDED)
            }
          />
          <Button
            title="DEAD"
            raised
            buttonStyle={{ backgroundColor: "red" }}
            onPress={() => this._otherDialogPressed(constants.actions.DIED)}
          />
          <Button
            title="DROPPED"
            raised
            buttonStyle={{ backgroundColor: "purple" }}
            onPress={() => this._otherDialogPressed(constants.actions.DROPPED)}
          />
        </View>
      );
    } else if (this.state.period == constants.period.AUTO) {
      cargo_dialog = this.state.cargo_dialog;
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
          <Button
            title="DEAD"
            raised
            buttonStyle={{ backgroundColor: "black" }}
            onPress={() => this._otherDialogPressed(constants.actions.DIED)}
          />
          <Button
            title="TELE"
            raised
            titleStyle={{ color: "white" }}
            buttonStyle={{
              backgroundColor: "blue",
              width: 100,
              paddingBottom: 10,
              paddingTop: 10
            }}
            onPress={() =>
              this.setState({
                auto_dialog: true
              })
            }
          />
          <Button
            title="DROPPED"
            raised
            buttonStyle={{ backgroundColor: "purple" }}
            onPress={() => this._otherDialogPressed(constants.actions.DROPPED)}
          />
        </View>
      );
    } else {
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

  renderCargoShip() {
    if (this.state.flip == "row") {
      return (
        <View style={styles.cargo_ship_top_buttons}>
          <TouchableOpacity
            style={[
              styles.ship_hatch_button,
              {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20
              }
            ]}
            onPress={() =>
              this._cargoDialogPressed(
                constants.object_type.HATCH,
                constants.locations.CARGO_SHIP
              )
            }
          >
            <Text style={styles.hatch_button_text}>HATCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ship_cargo_button}
            onPress={() =>
              this._cargoDialogPressed(
                constants.object_type.CARGO,
                constants.locations.CARGO_SHIP
              )
            }
          >
            <Text style={styles.cargo_button_text}>CARGO</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.cargo_ship_top_buttons}>
          <TouchableOpacity
            style={styles.ship_cargo_button}
            onPress={() =>
              this._cargoDialogPressed(
                constants.object_type.CARGO,
                constants.locations.CARGO_SHIP
              )
            }
          >
            <Text style={styles.cargo_button_text}>CARGO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ship_hatch_button,
              {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20
              }
            ]}
            onPress={() =>
              this._cargoDialogPressed(
                constants.object_type.HATCH,
                constants.locations.CARGO_SHIP
              )
            }
          >
            <Text style={styles.hatch_button_text}>HATCH</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _startDialogConfirmed = data => {
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState(state => {
      const start_dialog = false;
      const match_started = true;
      let sp = data.position;
      let sl = data.level;
      let has_object = data.object == 0;
      let period = constants.period.AUTO;

      return {
        start_dialog,
        match_started,
        timer,
        period,
        period_color: "yellow",
        has_object,
        match_data: {
          ...state.match_data,
          sp,
          sl
        }
      };
    });
  };

  _autoDialogConfirmed = data => {
    this.setState(state => {
      let period = constants.period.TELE;
      let period_color = "green";
      hs = data.index;

      return {
        period,
        period_color,
        match_data: {
          ...state.match_data,
          a: {
            ...state.match_data.a,
            hs
          }
        },
        auto_dialog: false
      };
    });
  };

  _rocketDialogPressed(object_type, location) {
    if (this.state.period == constants.period.NOT_STARTED) {
      this.refs.toast.show("Match has not started");
      return;
    }

    if (!this.state.has_object) {
      this.refs.toast.show("Robot does not have a game object");
      return;
    }

    this.setState({
      rocket_dialog: {
        object_type: object_type,
        location: location,
        visible: true
      }
    });
  }

  _cargoDialogPressed(object_type, location) {
    if (this.state.period == constants.period.NOT_STARTED) {
      this.refs.toast.show("Match has not started");
      return;
    }

    if (!this.state.has_object) {
      this.refs.toast.show("Robot does not have a game object");
      return;
    }

    this.setState({
      cargo_dialog: {
        object_type: object_type,
        location: location,
        visible: true
      }
    });
  }

  _pickupDialogPressed(location) {
    if (this.state.period == constants.period.NOT_STARTED) {
      this.refs.toast.show("Match has not started");
      return;
    }

    if (this.state.has_object) {
      this.refs.toast.show("Robot already has a game object");
      return;
    }

    this.setState({
      pickup_dialog: {
        location: location,
        visible: true
      }
    });
  }

  _otherDialogPressed(action) {
    if (this.state.period == constants.period.NOT_STARTED) {
      this.refs.toast.show("Match has not started");
      return;
    }

    title = "";
    text = "";

    switch (action) {
      case constants.actions.DROPPED:
        title = "DROPPED";
        text = "Robot dropped game object?";
        break;
      case constants.actions.DIED:
        title = "DIED";
        text = "Robot died?";
        break;
      case constants.actions.DEFENDED:
        title = "DEFENDED";
        text = "Robot played defence?";
        break;
      case constants.actions.GOT_DEFENDED:
        title = "GOT DEFENDED";
        text = "Robot got defended?";
        break;
    }

    this.setState({
      other_dialog: {
        action: action,
        visible: true,
        title,
        text
      }
    });
  }

  _endDialogPressed() {
    if (this.state.period == constants.period.NOT_STARTED) {
      this.refs.toast.show("Match has not started");
      return;
    }

    this.setState({ end_dialog: true });
  }

  _dialogConfirmed = data => {
    this.setState(state => {
      const a = data.action;
      const l = data.location;
      const t = state.counter;
      const match_data = state.match_data;
      has_object = state.has_object;
      if (state.period == constants.period.AUTO) {
        match_data.a.a.push({
          a,
          l,
          t
        });
      } else {
        match_data.t.a.push({
          a,
          l,
          t
        });
      }

      if (data.action <= constants.actions.DROPPED) {
        has_object = false;
      } else if (data.action == constants.actions.PICKUP) {
        has_object = true;
      }

      switch (data.location) {
        case constants.locations.CARGO_SHIP:
          return {
            match_data,
            has_object,
            cargo_dialog: { ...state.cargo_dialog, visible: false }
          };
        case constants.locations.RIGHT_ROCKET:
          return {
            match_data,
            has_object,
            rocket_dialog: { ...state.rocket_dialog, visible: false }
          };
        case constants.locations.LEFT_ROCKET:
          return {
            match_data,
            has_object,
            rocket_dialog: { ...state.rocket_dialog, visible: false }
          };
        default:
          return {
            match_data,
            has_object,
            pickup_dialog: { ...state.pickup_dialog, visible: false },
            other_dialog: { ...state.other_dialog, visible: false }
          };
      }
    });
  };

  _endDialogConfirmed = data => {
    this.setState(
      state => {
        const t = state.counter;
        let l = [];
        data.level.map(level => {
          switch (level) {
            case 1:
              if (data.level_one == "climbed") {
                l.push("1c");
              } else {
                l.push("1a");
              }
              break;
            case 2:
              if (data.level_two == "climbed") {
                l.push("2c");
              } else {
                l.push("2a");
              }
              break;
            case 3:
              if (data.level_three == "climbed") {
                l.push("3c");
              } else {
                l.push("3a");
              }
              break;
          }
        });

        return {
          match_data: {
            ...state.match_data,
            e: {
              l,
              t,
              c: data.text
            }
          },
          end_dialog: false
        };
      },
      () => {
        this.props.addMatch(this.state.match_data);
        console.log("Finished Scouting Match: " + this.state.match_data.mn);
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      }
    );
  };

  _renderBasketball() {
    if (this.state.has_object) {
      return (
        <Icon
          name="ios-basketball"
          color="orange"
          type="ionicon"
          raised
          reverse
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { cargo_dialog, rocket_dialog, pickup_dialog, other_dialog } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: this.state.flip }}>
        <View style={styles.hab_buttons}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.feeder}
              onPress={() =>
                this._pickupDialogPressed(constants.locations.RIGHT_FEEDER)
              }
            >
              <Text style={styles.feeder_text}>FEEDER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cargo_depot}
              onPress={() =>
                this._pickupDialogPressed(constants.locations.RIGHT_DEPOT)
              }
            >
              <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.end_game}
              onPress={() => this._endDialogPressed()}
            >
              <Text style={styles.end_game_text}>END GAME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cargo_depot}
              onPress={() =>
                this._pickupDialogPressed(constants.locations.LEFT_DEPOT)
              }
            >
              <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.feeder}
              onPress={() =>
                this._pickupDialogPressed(constants.locations.LEFT_FEEDER)
              }
            >
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
                  onPress={() =>
                    this._rocketDialogPressed(
                      constants.object_type.HATCH,
                      constants.locations.RIGHT_ROCKET
                    )
                  }
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.ship_cargo_button,
                    { borderBottomRightRadius: 20 }
                  ]}
                  onPress={() =>
                    this._rocketDialogPressed(
                      constants.object_type.CARGO,
                      constants.locations.RIGHT_ROCKET
                    )
                  }
                >
                  <Text style={styles.hatch_button_text}>CARGO</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 25, backgroundColor: "white" }} />
            </View>
            <View
              style={[styles.floor_section, { flexDirection: this.state.flip }]}
            >
              <TouchableOpacity
                style={styles.pickup_button}
                onPress={() =>
                  this._pickupDialogPressed(constants.locations.RIGHT_FLOOR)
                }
              >
                <Text>FLOOR PICKUP</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cargo_ship_section}>
              <View style={{ flex: 1, flexDirection: this.state.flip }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this._renderBasketball()}
                </View>
                <View style={styles.cargo_ship}>
                  <View style={{ flex: 66, flexDirection: "column" }}>
                    {this.renderCargoShip()}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[styles.floor_section, { flexDirection: this.state.flip }]}
            >
              <TouchableOpacity
                style={styles.pickup_button}
                onPress={() =>
                  this._pickupDialogPressed(constants.locations.LEFT_FEEDER)
                }
              >
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
                  onPress={() =>
                    this._rocketDialogPressed(
                      constants.object_type.HATCH,
                      constants.locations.LEFT_ROCKET
                    )
                  }
                >
                  <Text style={styles.hatch_button_text}>HATCH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.ship_cargo_button,
                    { borderTopRightRadius: 20 }
                  ]}
                  onPress={() =>
                    this._rocketDialogPressed(
                      constants.object_type.CARGO,
                      constants.locations.LEFT_ROCKET
                    )
                  }
                >
                  <Text style={styles.hatch_button_text}>CARGO</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 25, backgroundColor: "white" }} />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.action_section,
            { backgroundColor: this.state.period_color }
          ]}
        >
          <View
            style={{ flex: 15, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              title="BACK"
              buttonStyle={{ backgroundColor: "#c0c0c0" }}
              onPress={() => this.props.navigation.goBack()}
              icon={
                <Icon
                  name="arrow-back"
                  color="white"
                  style={{ paddingRight: 10 }}
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

        <AutoDialog
          visible={this.state.auto_dialog}
          cancelPressed={() => this.setState({ auto_dialog: false })}
          okPressed={this._autoDialogConfirmed}
        />

        <CargoShipDialog
          object_type={this.state.cargo_dialog.object_type}
          visible={this.state.cargo_dialog.visible}
          location={this.state.cargo_dialog.location}
          cancelPressed={() =>
            this.setState({ cargo_dialog: { ...cargo_dialog, visible: false } })
          }
          okPressed={this._dialogConfirmed}
        />

        <RocketDialog
          object_type={this.state.rocket_dialog.object_type}
          visible={this.state.rocket_dialog.visible}
          location={this.state.rocket_dialog.location}
          cancelPressed={() =>
            this.setState({
              rocket_dialog: { ...rocket_dialog, visible: false }
            })
          }
          okPressed={this._dialogConfirmed}
        />

        <PickupDialog
          location={this.state.pickup_dialog.location}
          visible={this.state.pickup_dialog.visible}
          cancelPressed={() =>
            this.setState({
              pickup_dialog: { ...pickup_dialog, visible: false }
            })
          }
          okPressed={this._dialogConfirmed}
        />

        <OtherDialog
          action={this.state.other_dialog.action}
          title={this.state.other_dialog.title}
          text={this.state.other_dialog.text}
          visible={this.state.other_dialog.visible}
          cancelPressed={() =>
            this.setState({
              other_dialog: { ...other_dialog, visible: false }
            })
          }
          okPressed={this._dialogConfirmed}
        />

        <EndGameDialog
          visible={this.state.end_dialog}
          cancelPressed={() =>
            this.setState({
              end_dialog: false
            })
          }
          okPressed={this._endDialogConfirmed}
        />

        <Toast ref="toast" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

//make this component available to the app
export default connect(mapStateToProps)(DataInputScreen);
