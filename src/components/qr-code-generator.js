import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

//Simple usage, defaults for all but the value
export default class QRcodeGenerator extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

// 30px logo from base64 string with transparent background
render() {
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA';
  return (
    <View style={{flex: 1}}>
        <View style = {styles.view_style}>
            <Text style={styles.scan_text}>Scan QR Code to get the data</Text>
        </View>
        <View style = {styles.view_style}>
            <QRCode 
                value={JSON.stringify({
                    id: 928328,
                    name: 'Jane Doe',
                    insider: true,
                  })}
                logo={{uri: base64Logo}}
                logoSize={50}
                logoBackgroundColor='transparent'
                size={200}
                backgroundColor='#E1DFEB'
            />
        </View>
        <View style = {styles.view_style}></View>
    </View>
  );
}
}

// 20% (default) sized logo from local file string with white logo backdrop
// render() {
//   let logoFromFile = require('../assets/logo.png');
//   return (
//     <QRCode
//       value="Just some string value"
//       logo={logoFromFile}
//     />
//   );
// }
// }

// // get base64 string encode of the qrcode (currently logo is not included)
// getDataURL() {
//   this.svg.toDataURL(this.callback);
// }
// callback(dataURL) {
//   console.log(dataURL);
// }
// render() {
//   return (
//     <QRCode
//       value="Just some string value"
//       getRef={(c) => (this.svg = c)}
//     />
//   );
// }

const styles = StyleSheet.create({
    scan_text: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E1DFEB',
      //paddingBottom: 50
    },
    view_style: {
        flex: 1, 
        backgroundColor: '#E1DFEB', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});