import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';
import { ButtonGroup } from 'react-native-elements';

export default class StartMatchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        position: 0,
        level: 0
    };

    this.updatePositionIndex = this.updatePositionIndex.bind(this)
    this.updateLevelIndex = this.updateLevelIndex.bind(this)
  }

  updatePositionIndex (position) {
    this.setState({position})
  }

  updateLevelIndex (level) {
    this.setState({level})
  }

  render() {
    const starting_position = ['LEFT', 'CENTER', 'RIGHT']
    const starting_level = ['LEVEL 1', 'LEVEL 2']
    const { position, level } = this.state
    return (
      <View>
        <Dialog
            visible={this.props.visible}
            onTouchOutside={() => {this.props.cancelPressed()}}
            actionsBordered
            dialogStyle={{width: 500}}
            dialogTitle={
                <DialogTitle
                    title={"Start Match"}
                    style={{
                        backgroundColor: '#F7F7F8',
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
                        onPress={() => {this.props.cancelPressed()}}
                        textStyle={{fontSize: 15, color: '#008ae6'}}
                        key="button-1"
                    />
                    <DialogButton
                        text="OK"
                        bordered
                        onPress={() => {this.props.okPressed(this.state)}}
                        textStyle={{fontSize: 15, color: '#008ae6'}}
                        key="button-2"
                    />
                </DialogFooter>
            }>
            <DialogContent>
                <Text>Select a starting position</Text>
                <ButtonGroup
                    onPress={this.updatePositionIndex}
                    selectedIndex={position}
                    buttons={starting_position}
                    containerStyle={{height: 50}}
                />
                <Text>Select a starting level</Text>
                <ButtonGroup
                    onPress={this.updateLevelIndex}
                    selectedIndex={level}
                    buttons={starting_level}
                    containerStyle={{height: 50}}
                />
            </DialogContent>
        </Dialog>
      </View>
    );
  }
}
