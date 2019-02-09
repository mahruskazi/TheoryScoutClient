import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/WelcomeScreen.style'
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base'

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome_container}>
            <Text style={styles.title}>Welcome to Theory Scout!</Text>
            <Image style={ styles.image }source={require('../assets/shadow_scout.png')}/>
        </View>
        <View stlye={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
            <Animatable.View stlye={styles.button_container}
                animation="slideInUp"
                duration={500}
                iterationCount={1}
                style={styles.button_container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <View style={styles.button}>
                        <Text style={{fontSize: 15, color: 'black', paddingRight: 10}}>CONTINUE</Text>
                        <Icon name='arrow-forward'/>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </View>
      </View>
    );
  }
}
