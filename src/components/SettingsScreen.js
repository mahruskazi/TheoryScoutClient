import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, AsyncStorage } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import styles from "../styles/SettingsScreen.style";
import EventPopup from "./SettingsPopups/EventPopup";
import DeletePopup from "./SettingsPopups/DeletePopup";
import OfflineNotice from "../util/OfflineNotice";
import Toast from "react-native-easy-toast";
import { connect } from "react-redux";

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: this.props.events.selected_event.name,
      event_dialog: false,
      delete_dialog: false,
      selected_event: null,
      isConnected: true,
      leftRed: true,
    };
  }

  _eventDialogPressed() {
    if (!this.state.isConnected) {
      this.refs.toast.show("Connect to the internet");
      return;
    }
    this.props.updateEvents().then(() => {
      console.log("Show popup")
      this.setState({ event_dialog: true });
    });
  }

  _eventDialogConfirmed = data => {
    if (data.selected_event == null) {
      this.refs.toast.show("Please select an event");
      return;
    }

    this.setState({
      event_name: data.searchTerm,
      selected_event: data.selected_event,
      event_dialog: false
    });
    this.props.updateCurrentEvent(data.selected_event.key, data.searchTerm);
    this.props.updateTeams(data.selected_event.key);
    this.props.updateMatches(data.selected_event.key);
  };

  _deleteDialogConfirmed = () => {
    this.setState({
      delete_dialog: false
    });
    this.props.deleteMatches();
  };

  render_checkmark_top() {
    if (this.state.leftRed) {
      return (
        <View style={{ position: "absolute" }}>
          <Icon
            name="md-checkmark-circle-outline"
            type="ionicon"
            color="#00cc44"
            reverse
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render_checkmark_bottom() {
    if (!this.state.leftRed) {
      return (
        <View style={{ position: "absolute" }}>
          <Icon
            name="md-checkmark-circle-outline"
            type="ionicon"
            color="#00cc44"
            reverse
          />
        </View>
      );
    } else {
      return null;
    }
  }

  orientationSettingChanged(state) {
    this.setState({leftRed: state});

    this.props.setOrientation(state);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Settings</Text>
        </View>
        <OfflineNotice
          onConnectionChange={isConnected => this.setState({ isConnected })}
        />
        <View style={styles.settings_container}>
          <Text style={styles.heading_text}>Selected Event</Text>
          <TouchableOpacity
            style={styles.select_event_button}
            onPress={() => this._eventDialogPressed()}
          >
            <Text style={styles.event_text}>{this.state.event_name}</Text>
            <Icon name="md-calendar" type="ionicon" color="#e65c00" reverse />
          </TouchableOpacity>

          <Text style={styles.heading_text}>Delete Matches</Text>
          <TouchableOpacity
            style={styles.select_event_button}
            onPress={() => {
              this.setState({ delete_dialog: true });
            }}
          >
            <Text style={styles.event_text}>Click here to delete match data</Text>
            <Icon name="md-trash" type="ionicon" color="#e65c00" reverse />
          </TouchableOpacity>

          <Text style={styles.heading_text}>Datainput Orientation</Text>
          <TouchableOpacity
            style={[styles.input_orientation, { marginTop: 10 }]}
            onPress={() => this.orientationSettingChanged(true)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "black"
              }}
            >
              <View
                style={{ backgroundColor: "#ff3333", flex: 1, opacity: this.state.leftRed ? 0.3 : 1 }}
              />
              <View
                style={{ backgroundColor: "#4286f4", flex: 1, opacity: this.state.leftRed ? 0.3 : 1 }}
              />
            </View>
            { this.render_checkmark_top() }
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.input_orientation, { marginTop: 10 }]}
            onPress={() => this.orientationSettingChanged(false)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "black"
              }}
            >
              <View
                style={{ backgroundColor: "#4286f4", flex: 1, opacity: this.state.leftRed ? 1 : 0.3 }}
              />
              <View
                style={{ backgroundColor: "#ff3333", flex: 1, opacity: this.state.leftRed ? 1 : 0.3 }}
              />
            </View>
            { this.render_checkmark_bottom() }
          </TouchableOpacity>

          <EventPopup
            visible={this.state.event_dialog}
            cancelPressed={() => this.setState({ event_dialog: false })}
            okPressed={this._eventDialogConfirmed}
          />

          <DeletePopup
            visible={this.state.delete_dialog}
            cancelPressed={() => this.setState({ delete_dialog: false })}
            okPressed={this._deleteDialogConfirmed}
          />
        </View>
        <Toast ref="toast" />
        <ActivityIndicator
          size="large"
          color="#292F6D"
          animating={this.props.events.fetching}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

//make this component available to the app
export default connect(mapStateToProps)(SettingsScreen);
