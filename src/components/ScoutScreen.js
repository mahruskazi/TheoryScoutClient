import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Button, ThemeProvider } from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';

export default class ScoutScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Scout',
        
    };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to {'\n'} Scouting App
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          {Platform.OS === 'ios' ? (
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          ) : (
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Cmd+M or shake for dev menu
            </Text>
          )}

        </View>

        <Container>
            <Form>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Match Number</Label>
                <Input keyboardType="numeric"/>
              </Item>
              <Item floatingLabel>
                <Label>Team Number</Label>
                <Input/>
              </Item>
            </Form>

          <View style={styles.toggle}>
          <Text style={styles.alliance}>
            {'\n'} Alliance
          </Text>
          <SwitchToggle
            containerStyle={{
              marginTop: 16,
              width: 108,
              height: 48,
              borderRadius: 25,
              backgroundColor: '#ccc',
              padding: 5,
            }}
            circleStyle={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: 'white', // rgb(102,134,205)
            }}
            switchOn={this.state.switchOn1}
            onPress={this.onPress1}
            circleColorOff='red'
            circleColorOn='blue'
            duration={500}
        />
        </View>
          
        <View>
            <Button
              //size={5}
              type = "solid"
              onPress={this._onPressButton}
              title="Continue"
            />
          </View>

        </Container>

        
      </ScrollView>
    );
  }
  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  };
}

const styles = StyleSheet.create({
  toggle: {
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50
  },
  alliance: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    paddingBottom: 10
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});