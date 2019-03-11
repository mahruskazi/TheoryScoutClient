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

export default class RocketDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outcome: 0,
      action: 0,
      object_type: 0,
      location: 0,
      level: 0,
      button_color: 'green'
    };

    this.updateOutcomeIndex = this.updateOutcomeIndex.bind(this);
    this.updateLevelIndex = this.updateLevelIndex.bind(this);
  }

  reset() {
      this.setState({outcome: 0, level: 0, button_color: 'green'})
  }

  async updateOutcomeIndex(outcome) {
    action = this.get_action(outcome, this.state.level, this.props.object_type);
    button_color = outcome == 0 ? 'green' : 'red'; 
    await this.promisedSetState({ outcome, action, button_color });
  }

  async updateLevelIndex(level) {
    action = this.get_action(this.state.outcome, level, this.props.object_type);
    await this.promisedSetState({ level, action });
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
        this.setState(newState, () => {
            resolve()
        });
    });
  }

  async final_action(location) {
    await this.updateOutcomeIndex(this.state.outcome)
    await this.updateLevelIndex(this.state.level)
    this.props.okPressed({ location, action: this.state.action });
    this.reset();
  }

  get_action(outcome, level, object_type) {
    if (object_type == constants.object_type.CARGO) {
      if (outcome == 0) {
        // SCORE
        switch (level) {
          case 0:
            return constants.actions.ROCKET_SCORE_CARGO_LOW;
          case 1:
            return constants.actions.ROCKET_SCORE_CARGO_MID;
          case 2:
            return constants.actions.ROCKET_SCORE_CARGO_HIGH;
        }
      } else {
        // MISSED
        switch (level) {
          case 0:
            return constants.actions.ROCKET_MISSED_CARGO_LOW;
          case 1:
            return constants.actions.ROCKET_MISSED_CARGO_MID;
          case 2:
            return constants.actions.ROCKET_MISSED_CARGO_HIGH;
        }
      }
    } else {
      // HATCH
      if (outcome == 0) {
        // SCORE
        switch (level) {
          case 0:
            return constants.actions.ROCKET_SCORE_HATCH_LOW;
          case 1:
            return constants.actions.ROCKET_SCORE_HATCH_MID;
          case 2:
            return constants.actions.ROCKET_SCORE_HATCH_HIGH;
        }
      } else {
        // MISSED
        switch (level) {
          case 0:
            return constants.actions.ROCKET_MISSED_HATCH_LOW;
          case 1:
            return constants.actions.ROCKET_MISSED_HATCH_MID;
          case 2:
            return constants.actions.ROCKET_MISSED_HATCH_HIGH;
        }
      }
    }
  }

  render() {
    const buttons = ["SCORED", "MISSED"];
    const starting_level = ["LOW", "MID", "HIGH"];
    const { outcome, level, action } = this.state;
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
              onPress={this.updateOutcomeIndex}
              selectedIndex={outcome}
              buttons={buttons}
              containerStyle={{ height: 50 }}
              selectedButtonStyle={{backgroundColor: this.state.button_color}}
            />
            <Text>Select a level</Text>
            <ButtonGroup
              onPress={this.updateLevelIndex}
              selectedIndex={level}
              buttons={starting_level}
              containerStyle={{ height: 50 }}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
