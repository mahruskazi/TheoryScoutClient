import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";
import { createFilter } from "react-native-search-filter";
import { connect } from 'react-redux'

const KEYS_TO_FILTERS = ["name", "key"];

class EventPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      searchTerm: "",
      selected_event: null
    };
  }

  componentWillMount() {
      
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const { events, searchTerm } = this.state;
    const filteredEvents = events.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    const max_items = searchTerm.length > 0 ? 3 : 0;
    const items_to_show =
      filteredEvents.length > max_items ? max_items : filteredEvents.length;
    return (
      <View>
        <Dialog
          visible={this.props.visible}
          onTouchOutside={() => {
            this.props.cancelPressed();
          }}
          actionsBordered
          dialogStyle={{ width: 350 }}
          dialogTitle={
            <DialogTitle
              title={"Select an event"}
              style={{
                backgroundColor: "#F7F7F8"
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.props.cancelPressed();
                }}
                textStyle={{ fontSize: 15, color: "#008ae6" }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={() => {
                    this.props.okPressed(this.state);
                }}
                textStyle={{ fontSize: 15, color: "#008ae6" }}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>Enter event name or key</Text>
            <TextInput
              onChangeText={term => {
                this.searchUpdated(term);
              }}
              placeholder="Type a message to search"
              value={searchTerm}
            />
            <View>
              {filteredEvents.slice(0, items_to_show).map(event => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        searchTerm: event.name,
                        selected_event: event
                      })
                    }
                    key={event.key}
                    style={{
                      height: 40,
                      justifyContent: "center",
                      borderBottomWidth: StyleSheet.hairlineWidth
                    }}
                  >
                    <Text>{event.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      events: state.events.events,
  }
}

//make this component available to the app
export default connect(mapStateToProps)(EventPopup);
