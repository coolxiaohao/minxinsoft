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
          设置
        </Text>
        <Text style={styles.titleStyles}>SET UP</Text>
        <View style={styles.formStyles}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.routerStyles} onPress={()=>this.props.navigation.navigate('Login')}>登录></Text><Text style={styles.routerStyles}>设置</Text>
            </View>
            <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('Database')}}>数据库设置</Text>
            <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('Systemdefault')}}>设置系统默认</Text>
        </View>
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
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 60,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginbgStyles: {
    resizeMode: 'cover',
    position:'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: height+20,
  },
  nameStyles: {
    fontSize: 40,
    textAlign: 'center',
    margin: 0,
    color: 'white'
  },
  titleStyles: {
    fontSize: 18,
    textAlign: 'center',
    margin: 0,
    color: 'white'
  },
  formStyles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 60,
    height: height / 3 + 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    marginTop: 40
  },
  routerStyles: {
    color: 'white',
    fontSize: 16
  },
  buttonStyles: {
    color: 'white',
    fontSize: 20,
    fontWeight: "100",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#87caf5',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1
  }
});
