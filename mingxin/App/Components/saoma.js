import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    InteractionManager,
    Animated,
    Easing,
    Platform,
    Image,
    Alert,
    AsyncStorage,
    BackHandler
} from 'react-native';
import Barcode from 'react-native-smart-barcode'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class CodeReading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:true,
        };
    }
    getName(val){
      if(val.id==102){
        this.setState({
          barcodeName: val.name
        })
      }
      if(val.id==81){
        this.setState({
          codeinfoName: val.name
        })
      }
    }
    componentDidMount(){
        AsyncStorage.getItem('langArr',(error,result)=>{
          var res = JSON.parse(result)
          //console.log(res)
          if(result != null){
            var newArr = []
            res.map((val)=>{
              if(val.pid == 46){
                return newArr.push(val)
              }
            })
            //console.log(newArr)
            newArr.forEach((val,index)=>{
              this.getName(val)
            })
          }else{
            console.log(error)
          }
        })
    }
    componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
      this.state.show = false;
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        this.props.navigation.goBack()
         return true;
     }
    back =(e)=>{ //把属性传递过来，然后进行使用
        this.props.navigation.state.params.callBack(e) //回调传值
        this.props.navigation.goBack() //点击POP上一个页面得方法
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                <Barcode style={{flex: 1,}}
                  ref={ component => this._barCode = component }
                  onBarCodeRead={this._onBarCodeRead}/>
            </View>
        );
    }


    // 导航条
    renderNavBar(){
        return(
            <View style={styles.navBarStyle}>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack()}}
                    style={styles.leftViewStyle}>
                    <Image source={{uri: 'wechatback'}}
                           style={{height:20,width:20}} />
                </TouchableOpacity>
                <Text style={[styles.navTitleStyle,{marginTop:Platform.OS == 'ios'?12:0,fontSize:20}]}>
                    {this.state.barcodeName}
                </Text>
            </View>
        )
    }
    _onBarCodeRead = (e) => {
        console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan()
        this.back(e.nativeEvent.data.code);
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
}

const styles = StyleSheet.create({
    textStyle:{
        color:'#fff',
        marginTop:20,
        fontWeight:'bold',
        fontSize:16
    },
    navTitleStyle: {
        color:'white',
        fontWeight:'bold',
    },
    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'gray',
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        justifyContent:'center'
    },

    leftViewStyle:{
        // 绝对定位
        // 设置主轴的方向
        flexDirection:'row',
        position:'absolute',
        left:10,
        bottom:Platform.OS == 'ios' ? 15:12,
        alignItems:'center',
        width:30
    },
    animatiedStyle:{
        height:2,
        backgroundColor:'#00FF00',
        position:'relative'
    },
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
});
