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

import UtilsNet from '../utils/utils'

const {width,height} = Dimensions.get('window');


export default class mingxin extends Component {
  static defaultProps = {

  }

  constructor(props) {
      super(props);
      this.state = {
          user: '',
          passWord: '',
      };
  }

  componentDidMount(){

  }

  render() {
    const  {navigate,state,goBack,} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>{state.params.value}</Text>
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
});
