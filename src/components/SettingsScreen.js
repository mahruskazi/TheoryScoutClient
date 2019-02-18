import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import styles from "../styles/SettingsScreen.style";
import EventPopup from "./SettingsPopups/EventPopup";
import OfflineNotice from "../util/OfflineNotice";
import Toast from "react-native-easy-toast";
import { connect } from 'react-redux'

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: this.props.events.selected_event.name,
      event_dialog: false,
      selected_event: null,
      isConnected: true
    };
  }

  _eventDialogPressed() {
    if(!this.state.isConnected){
      this.refs.toast.show("Connect to the internet");
      return;
    }
    this.props.updateEvents().then(() => {
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
  };

  render() {
      console.log("Loading: " + this.props.events.fetching)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Settings</Text>
        </View>
        <OfflineNotice 
            onConnectionChange={isConnected => this.setState({isConnected})}
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
          <EventPopup
            visible={this.state.event_dialog}
            cancelPressed={() => this.setState({ event_dialog: false })}
            okPressed={this._eventDialogConfirmed}
          />
        </View>
        <Toast ref="toast" />
        <ActivityIndicator size="large" color="#292F6D" animating={this.props.events.fetching}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        events: state.events,
    }
}
  
  //make this component available to the app
export default connect(mapStateToProps)(SettingsScreen);
