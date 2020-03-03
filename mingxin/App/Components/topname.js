import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  TextInput,
  ToastAndroid
} from 'react-native';



const {width,height} = Dimensions.get('window');


export default class mingxin extends Component {
  static defaultProps = {
      titleName: '',
      titleEnName:''
  }

  constructor(props) {
      super(props);
      this.state = {

      };
  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.loginbgStyles}
               source={{uri:'loginbg'}}/>
        <Text style={styles.nameStyles}>
          {this.props.titleName}
        </Text>
        <Text style={styles.titleStyles}>{this.props.titleEnName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  loginbgStyles: {
    resizeMode: 'cover',
    position:'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: height,
  },
  nameStyles: {
    fontSize: 30,
    textAlign: 'center',
    margin: 0,
    color: 'white'
  },
  titleStyles: {
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
    color: 'white'
  },
});
