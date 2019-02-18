import React, { Component } from "react";
import { View, Text, NetInfo, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    };

    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
      console.log("Devices is " + (isConnected ? "online" : "offline"));
    });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange(isConnected) {
    console.log("Device is " + (isConnected ? "online" : "offline"));
    this.setState({ isConnected });
    this.props.onConnectionChange(isConnected);
  }

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width
  },
  offlineText: { color: "#fff" }
});

export default OfflineNotice;
