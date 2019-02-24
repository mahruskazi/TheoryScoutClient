import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/DataInputScreen.style";
import constants from "../constants/DataInputConstants";
import { Button, Icon } from "react-native-elements";

export default class DataInputLeft extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  componentWillUnmount() {
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
            onPress={() => this.props.otherDialogPressed(constants.actions.DEFENDED)}
          />
          <Button
            title="GOT DEFENDED"
            raised
            buttonStyle={{ backgroundColor: "black" }}
            onPress={() =>
              this.props.otherDialogPressed(constants.actions.GOT_DEFENDED)
            }
          />
          <Button
            title="DEAD"
            raised
            buttonStyle={{ backgroundColor: "red" }}
            onPress={() => this.props.otherDialogPressed(constants.actions.DIED)}
          />
          <Button
            title="DROPPED"
            raised
            buttonStyle={{ backgroundColor: "purple" }}
            onPress={() => this.props.otherDialogPressed(constants.actions.DROPPED)}
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
            onPress={() => this.props.otherDialogPressed(constants.actions.DIED)}
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
            onPress={() => this.props.otherDialogPressed(constants.actions.DROPPED)}
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

  render() {
    return (
      <View>
        <View style={styles.hab_buttons}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.feeder}
              onPress={() =>
                this.props.pickupDialogPressed(constants.locations.RIGHT_FEEDER)
              }
            >
              <Text style={styles.feeder_text}>FEEDER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cargo_depot}
              onPress={() =>
                this.props.pickupDialogPressed(constants.locations.RIGHT_DEPOT)
              }
            >
              <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.end_game}
              onPress={() => this.props.endDialogPressed()}
            >
              <Text style={styles.end_game_text}>END GAME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cargo_depot}
              onPress={() =>
                this.props.pickupDialogPressed(constants.locations.LEFT_DEPOT)
              }
            >
              <Text style={styles.cargo_depot_text}>CARGO DEPOT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.feeder}
              onPress={() =>
                this.props.pickupDialogPressed(constants.locations.LEFT_FEEDER)
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
                    this.props.rocketDialogPressed(
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
                    this.props.rocketDialogPressed(
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
            <View style={styles.floor_section}>
              <TouchableOpacity
                style={styles.pickup_button}
                onPress={() =>
                  this.props.pickupDialogPressed(constants.locations.RIGHT_FLOOR)
                }
              >
                <Text>FLOOR PICKUP</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cargo_ship_section}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this.renderBasketball()}
                </View>
                <View style={styles.cargo_ship}>
                  <View style={{ flex: 66, flexDirection: "column" }}>
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
                          this.props.cargoDialogPressed(
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
                          this.props.cargoDialogPressed(
                            constants.object_type.CARGO,
                            constants.locations.CARGO_SHIP
                          )
                        }
                      >
                        <Text style={styles.cargo_button_text}>CARGO</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.floor_section}>
              <TouchableOpacity
                style={styles.pickup_button}
                onPress={() =>
                  this.props.pickupDialogPressed(constants.locations.LEFT_FEEDER)
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
                    this.props.rocketDialogPressed(
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
                    this.props.rocketDialogPressed(
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
              onPress={() => this.props.goBack()}
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
      </View>
    );
  }
}
