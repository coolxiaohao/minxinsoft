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
import RNCamera from 'react-native-camera';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var LRMargin = (width-200)/2;
var codeHeight = Platform.OS == 'ios' ? (height-264)/3:(height-244)/3;

let viewMinX =(width-200)/2;
let viewMinY =(height-200)/2;
let isShowCode = false;

export default class CodeReading extends React.Component {
    static defaultProps = {
      cornerColor: '#22ff00',
      cornerBorderWidth: 4,
      cornerBorderLength: 24,
    };
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            show:true,
            anim: new Animated.Value(0),
            camera: {
                aspect: RNCamera.constants.Aspect.fill,
                FlashMode: RNCamera.constants.FlashMode.auto
            },
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
        isShowCode = false
        InteractionManager.runAfterInteractions(()=>{
            this.startAnimation()
        });
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
    startAnimation(){
        if(this.state.show){
            this.state.anim.setValue(0)
            Animated.timing(this.state.anim,{
                toValue:1,
                duration:1500,
                easing:Easing.linear,
            }).start(()=>this.startAnimation());
        }
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
    //扫描二维码方法
    barcodeReceived = (e) =>{
      //console.log(e.bounds)
      if(isShowCode){return}
      let x = Number (e.bounds.origin.x );
      let y = Number (e.bounds.origin.y);
      console.log(x,y,viewMinX,viewMinY-64,width/2 + 100,height/2 + 36)
      if ((x > viewMinX && y > viewMinY - 100) &&( x < (width/2 + 100) && (y < height/2))){
          if (!isShowCode){
              isShowCode = true;
              this.back(e.data)
          }
      }
        // if(this.state.show){
        //     this.state.show = false;
        //     if (e) {
        //         this.back(e.data);
        //     } else {
        //         alert(
        //             '错误提示',
        //             '扫码出错',
        //             [
        //                 {text: '重新扫码', onPress: () => {this.state.show = true; this.startAnimation()}},
        //                 {text: '返回', onPress: () => console.log('back')},
        //             ],
        //             { cancelable: false }
        //         )
        //     }
        // }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                <RNCamera
                    ref={(cam) => {
                        this.camera = cam;
                      }}
                    style={styles.preview}
                    //={this.state.camera.aspect}
                    flashMode={this.state.camera.FlashMode}
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                >
                    <View style = {{height: codeHeight,width:width,backgroundColor:'rgba(0,0,0,0.5)',}}>
                    </View>
                    <View style={{flexDirection:'row',}}>
                        <View style={styles.itemStyle}/>
                        <Animated.View style={[styles.animatiedStyle, {
                            transform: [{
                                translateY: this.state.anim.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [0,200]
                                    })
                                }]
                            }]}>
                            <Image style={ {resizeMode: 'contain', width: 200}}
                                   source={{uri:'scanbar'}}/>
                        </Animated.View>
                        <View style={{
                            borderColor: this.props.cornerColor,
                            width: this.props.cornerBorderLength,
                            height: this.props.cornerBorderLength,
                            position: 'absolute',top: 0,left: viewMinX,
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderTopWidth:this.props.cornerBorderWidth,
                        }}/>

                        <View style={{
                            borderColor: this.props.cornerColor,
                            width: this.props.cornerBorderLength,
                            height: this.props.cornerBorderLength,
                            position: 'absolute',top: 176,left: viewMinX,
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderBottomWidth:this.props.cornerBorderWidth,
                        }}/>

                        <View style={{
                            borderColor:this.props.cornerColor,
                            width: this.props.cornerBorderLength,
                            height: this.props.cornerBorderLength,
                            position: 'absolute',top: 0,right: viewMinX,
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderTopWidth:this.props.cornerBorderWidth,
                        }}/>

                        <View style={{
                            borderColor: this.props.cornerColor,
                            width: this.props.cornerBorderLength,
                            height: this.props.cornerBorderLength,
                            position: 'absolute',top: 176,right: viewMinX,
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderBottomWidth:this.props.cornerBorderWidth,
                        }}/>
                        <View style={styles.itemStyle}/>
                    </View>
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
                        <Text style={styles.textStyle}>{this.state.codeinfoName}</Text>
                    </View>
                </RNCamera>
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
}

const styles = StyleSheet.create({
    itemStyle:{
        backgroundColor:'rgba(0,0,0,0.5)',
        width:LRMargin,
        height:200
    },
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
    },
    preview: {
        flex: 1,
    },
    rectangle: {
        height: 200,
        width: 200,
    }
});
