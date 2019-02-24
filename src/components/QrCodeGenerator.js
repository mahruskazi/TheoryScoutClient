import React, { Component } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default class QrCodeGenerator extends Component {
  constructor(props) {
    data = props.navigation.state.params.data;
    super(props);
    this.state = {
      data
    };
  }

  render() {
    string = JSON.stringify(this.state.data);
    string = string.replace(/"(\w+)"\s*:/g, "$1:");
    console.log("DATA: " + string);
    obj = eval("(" + string + ")");
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <QRCode value={string} size={300} backgroundColor="white" ecl={"L"} />
      </View>
    );
  }
}
