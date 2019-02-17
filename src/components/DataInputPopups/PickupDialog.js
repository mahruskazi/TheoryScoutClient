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

export default class PickupDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
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
              title={"Pickup"}
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
                text="YES"
                bordered
                onPress={() => {
                  this.props.okPressed({
                    location,
                    action: constants.actions.PICKUP
                  });
                }}
                textStyle={{ fontSize: 15, color: "#008ae6" }}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>Robot picked up game object?</Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
