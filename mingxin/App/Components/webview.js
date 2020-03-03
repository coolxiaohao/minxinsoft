import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  WebView,
  BackHandler
} from 'react-native';


const {width,height} = Dimensions.get('window');

export default class mingxin extends Component {
  static navigationOptions = {
      headerBackTitle:null,
      headerStyle:{
        height: 40
      },
  };

  constructor(props) {
      super(props);
      this.state = {

      };
  }
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }
  onBackAndroid = () => {
      this.props.navigation.goBack()
       return true;
   }
  componentDidMount(){
      console.log(this.props.navigation.state.params.url);
  }

  render() {
    return (
      <View style={styles.container}>
          <WebView
            style={{width:width,height:height-20,backgroundColor:'gray'}}
            source={{uri:this.props.navigation.state.params.url,method: 'GET'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={false}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width:width,
  },
});
