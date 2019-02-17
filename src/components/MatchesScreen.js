import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'

class MatchesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Matches: {JSON.stringify(this.props.matches)} </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      matches: state.matches,
  }
}

//make this component available to the app
export default connect(mapStateToProps)(MatchesScreen);
