import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";
import { ButtonGroup } from "react-native-elements";
import ButtonComponent, {
  RectangleButton
} from "react-native-button-component";

export default class EndGameDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: [],
      level_one: "disabled",
      level_two: "disabled",
      level_three: "disabled",
      text: ""
    };

    this.levelOnePressed = this.levelOnePressed.bind(this);
    this.levelTwoPressed = this.levelTwoPressed.bind(this);
    this.levelThreePressed = this.levelThreePressed.bind(this);
  }

  levelOnePressed() {
    level = this.state.level;
    level_one = this.state.level_one;
    if (level_one == "disabled") {
      level.push(1);
      level_one = "climbed";
    } else if (level_one == "climbed") {
      level_one = "attempted";
    } else {
      level = [];
      this.state.level.map(l => {
        if (l != 1) {
          level.push(l);
        }
      });
      level_one = "disabled";
    }

    this.setState({ level_one, level });
  }

  levelTwoPressed() {
    level = this.state.level;
    level_two = this.state.level_two;
    if (level_two == "disabled") {
      level.push(2);
      level_two = "climbed";
    } else if (level_two == "climbed") {
      level_two = "attempted";
    } else {
      level = [];
      this.state.level.map(l => {
        if (l != 2) {
          level.push(l);
        }
      });
      level_two = "disabled";
    }

    this.setState({ level_two, level });
  }

  levelThreePressed() {
    level = this.state.level;
    level_three = this.state.level_three;
    if (level_three == "disabled") {
      level.push(3);
      level_three = "climbed";
    } else if (level_three == "climbed") {
      level_three = "attempted";
    } else {
      level = [];
      this.state.level.map(l => {
        if (l != 3) {
          level.push(l);
        }
      });
      level_three = "disabled";
    }

    this.setState({ level_three, level });
  }

  render() {
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
              title={"End Game"}
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
            <Text>Select a ending level</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <RectangleButton
                style={{ width: 120 }}
                type="primary"
                states={{
                  disabled: {
                    backgroundColors: ["#6A6AD5", "#6F86D9"],
                    text: "Level 1",
                    onPress: this.levelOnePressed
                  },
                  climbed: {
                    backgroundColors: ["#4DC7A4", "#66D37A"],
                    text: "Climbed",
                    onPress: this.levelOnePressed
                  },
                  attempted: {
                    backgroundColors: ["#ffc266", "#ff9900"],
                    text: "Attempted",
                    onPress: this.levelOnePressed
                  }
                }}
                buttonState={this.state.level_one}
              />
              <RectangleButton
                style={{ width: 120 }}
                type="primary"
                states={{
                  disabled: {
                    backgroundColors: ["#6A6AD5", "#6F86D9"],
                    text: "Level 2",
                    onPress: this.levelTwoPressed
                  },
                  climbed: {
                    backgroundColors: ["#4DC7A4", "#66D37A"],
                    text: "Climbed",
                    onPress: this.levelTwoPressed
                  },
                  attempted: {
                    backgroundColors: ["#ffc266", "#ff9900"],
                    text: "Attempted",
                    onPress: this.levelTwoPressed
                  }
                }}
                buttonState={this.state.level_two}
              />
              <RectangleButton
                style={{ width: 120 }}
                type="primary"
                states={{
                  disabled: {
                    backgroundColors: ["#6A6AD5", "#6F86D9"],
                    text: "Level 3",
                    onPress: this.levelThreePressed
                  },
                  climbed: {
                    backgroundColors: ["#4DC7A4", "#66D37A"],
                    text: "Climbed",
                    onPress: this.levelThreePressed
                  },
                  attempted: {
                    backgroundColors: ["#ffc266", "#ff9900"],
                    text: "Attempted",
                    onPress: this.levelThreePressed
                  }
                }}
                buttonState={this.state.level_three}
              />
            </View>
            <Text>Order {JSON.stringify(this.state.level)}</Text>
            <Input
              placeholder="Extra comments"
              multiline={true}
              onChangeText={text => this.setState({ text })}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
