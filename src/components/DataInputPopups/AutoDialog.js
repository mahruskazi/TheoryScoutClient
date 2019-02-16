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

export default class AutoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      action: null,
    };

    this.updateButtonIndex = this.updateButtonIndex.bind(this);
  }

  updateButtonIndex(index) {
    this.setState({ index });
  }

  render() {
    const buttons = ["NO", "YES"];
    const { index } = this.state;
    return (
      <View>
        <Dialog
          visible={this.props.visible}
          onTouchOutside={() => {
            this.props.cancelPressed();
          }}
          actionsBordered
          dialogStyle={{ width: 500 }}
          dialogTitle={
            <DialogTitle
              title={"Starting TELE"}
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
            <Text>Did this team get off the platform?</Text>
            <ButtonGroup
              onPress={this.updateButtonIndex}
              selectedIndex={index}
              buttons={buttons}
              containerStyle={{ height: 50 }}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
