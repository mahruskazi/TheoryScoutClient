import React, { Component } from "react";
import { View, Text } from "react-native";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";
import { ButtonGroup } from "react-native-elements";
import constants from "../../constants/DataInputConstants";

export default class CargoShipDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      action: 0,
      object_type: 0,
      location: 0,
      button_color: 'green'
    };

    this.updateButtonIndex = this.updateButtonIndex.bind(this);
  }

  reset() {
    this.setState({index: 0, button_color: 'green'})
}

  async updateButtonIndex(index) {
    action = null;
    if (index == 0) {
      button_color = 'green'
      action =
        this.props.object_type == constants.object_type.CARGO
          ? constants.actions.SHIP_SCORE_CARGO
          : constants.actions.SHIP_SCORE_HATCH;
    } else {
      button_color = 'red'
      action =
        this.props.object_type == constants.object_type.CARGO
          ? constants.actions.SHIP_MISSED_CARGO
          : constants.actions.SHIP_MISSED_HATCH;
    }
    await this.promisedSetState({ index, action, button_color });
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
        this.setState(newState, () => {
            resolve()
        });
    });
  }

  async final_action(location) {
    await this.updateButtonIndex(this.state.index)
    this.props.okPressed({ location, action: this.state.action });
    this.reset();
  }

  render() {
    const buttons = ["SCORED", "MISSED"];
    const { index } = this.state;
    const { object_type, location } = this.props;
    const name = object_type == constants.object_type.CARGO ? "CARGO" : "HATCH";
    return (
      <View>
        <Dialog
          visible={this.props.visible}
          onTouchOutside={() => {
            this.props.cancelPressed();
            this.reset();
          }}
          actionsBordered
          dialogStyle={{ width: 500 }}
          dialogTitle={
            <DialogTitle
              title={name + " Selected"}
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
                  this.reset();
                }}
                textStyle={{ fontSize: 15, color: "#008ae6" }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={() => {
                  this.final_action(location)
                }}
                textStyle={{ fontSize: 15, color: "#008ae6" }}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>What did this team do?</Text>
            <ButtonGroup
              onPress={this.updateButtonIndex}
              selectedIndex={index}
              buttons={buttons}
              containerStyle={{ height: 50 }}
              selectedButtonStyle={{backgroundColor: this.state.button_color}}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
