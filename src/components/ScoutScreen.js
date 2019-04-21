import React, { Component } from "react";
import { TextInput, Platform, Image, Text, View, Alert } from "react-native";
import { Container, Header, Content, Form, Item, Label } from "native-base";
import { Button, ButtonGroup, Input, Icon } from "react-native-elements";
import styles from "../styles/ScoutScreen.style";
import SwitchToggle from "react-native-switch-toggle";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";
import {
  getQualificationMatches,
  getTeamKeysForMatch
} from "../util/DataParser";

class ScoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      toggled: false,
      match_number: 1,
      name: "",
      alliance_color: "red",
      selected_team: (selected_team = getTeamKeysForMatch(
        this.props.event.matches,
        0,
        "red"
      )[0])
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    // Setting default team
    selected_team = getTeamKeysForMatch(
      this.props.event.matches,
      this.state.match_number,
      this.state.alliance_color
    )[0];
    this.setState({ selected_team });
  }

  onAlliancePress = () => {
    alliance_color = !this.state.toggled ? "blue" : "red";
    teams = getTeamKeysForMatch(
      this.props.event.matches,
      this.state.match_number,
      alliance_color
    );
    selected_team =
      teams.length == 0
        ? this.state.selected_team
        : teams[this.state.selectedIndex];
    this.setState({
      toggled: !this.state.toggled,
      alliance_color,
      selected_team
    });
  };

  buttonColor() {
    return this.state.toggled ? "#4286f4" : "#ff3333";
  }

  updateIndex(selectedIndex) {
    teams = getTeamKeysForMatch(
      this.props.event.matches,
      parseInt(this.state.match_number),
      this.state.alliance_color
    );
    selected_team = teams[selectedIndex];
    this.setState({ selectedIndex, selected_team });
  }

  onMatchChange(match_number) {
    teams = getTeamKeysForMatch(
      this.props.event.matches,
      parseInt(match_number),
      this.state.alliance_color
    );
    if (teams != undefined && teams.length > 0)
      selected_team = teams[this.state.selectedIndex];
    else
      selected_team = this.state.selected_team;
    this.setState({ match_number, selected_team });
  }

  team_selector() {
    console.log("Current selected team: " + this.state.selected_team);
    teams = getTeamKeysForMatch(
      this.props.event.matches,
      parseInt(this.state.match_number),
      this.state.alliance_color
    );
    disabled = false;
    if (teams.length == 0) {
      teams = ["NOT", "A", "MATCH"];
      disabled = true;
    }
    if (this.props.event.matches.length == 0) {
      return (
        <Input
          placeholder="Team number"
          keyboardType="number-pad"
          leftIconContainerStyle={{ marginRight: 5 }}
          onChangeText={selected_team => this.setState({ selected_team })}
          leftIcon={{ type: "ionicon", name: "logo-ionitron" }}
        />
      );
    } else {
      return (
        <ButtonGroup
          disabled={disabled}
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={teams}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={{ backgroundColor: this.buttonColor() }}
        />
      );
    }
  }

  _confirmedPressed = () => {
    teams = getTeamKeysForMatch(
      this.props.event.matches,
      parseInt(this.state.match_number),
      this.state.alliance_color
    );
    if (this.state.name.length == 0) {
      this.refs.toast.show("Please input a name");
      return;
    }
    if ((teams.length == 0 && this.props.event.matches.length != 0) || this.state.match_number.length == 0) {
      this.refs.toast.show("Enter a valid match number");
      return;
    }
    selected_team = this.state.selected_team;
    if (selected_team == undefined){
      selected_team = teams[this.state.selectedIndex]
    }
    props = {
      match_number: this.state.match_number,
      team_number: selected_team,
      alliance_color: this.state.alliance_color,
      scout_name: this.state.name,
      onGoBack: () => this.incrementMatchNumber()
    };
    console.log("SCOUTING: " + JSON.stringify(props));
    this.props.navigation.navigate("DataInput", props);
  };

  incrementMatchNumber() {
    new_match = parseInt(this.state.match_number) + 1;

    teams = getTeamKeysForMatch(
      this.props.event.matches,
      new_match,
      this.state.alliance_color
    );

    if (teams != undefined && teams.length > 0)
      selected_team = teams[this.state.selectedIndex];
    else
      selected_team = this.state.selected_team;
    this.setState({ selected_team, match_number: new_match });
  }

  render() {
    match_placeholder =
      getQualificationMatches(this.props.event.matches).length == 0
        ? "Match number"
        : "Match number (1 - " +
          getQualificationMatches(this.props.event.matches).length.toString() +
          ")";
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Scout Screen</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../assets/frc_deep_space.png")}
          />
          <Input
            placeholder="Input your name"
            leftIconContainerStyle={{ marginRight: 5 }}
            leftIcon={{ type: "ionicon", name: "md-person" }}
            onChangeText={name => this.setState({ name })}
          />
          <Input
            placeholder={match_placeholder}
            keyboardType="number-pad"
            leftIconContainerStyle={{ marginRight: 5 }}
            leftIcon={{ type: "ionicon", name: "logo-game-controller-a" }}
            onChangeText={match_number => this.onMatchChange(match_number)}
            value={this.state.match_number.toString()}
          />

          <Text style={{ marginTop: 10, fontSize: 15 }}>Alliance</Text>
          <SwitchToggle
            containerStyle={{
              width: 90,
              height: 40,
              borderRadius: 21,
              backgroundColor: "#ccc",
              padding: 5
            }}
            circleStyle={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "white" // rgb(102,134,205)
            }}
            switchOn={this.state.toggled}
            onPress={this.onAlliancePress}
            circleColorOff="#ff3333"
            circleColorOn="#4286f4"
            duration={250}
          />

          <View style={{ marginTop: 10 }} />
          {this.team_selector()}

          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Icon
              name="md-arrow-forward"
              type="ionicon"
              raised
              reverse
              color={this.buttonColor()}
              onPress={this._confirmedPressed}
            />
          </View>
        </View>
        <Toast ref="toast" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.events
  };
}

//make this component available to the app
export default connect(mapStateToProps)(ScoutScreen);
