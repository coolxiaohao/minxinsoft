import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  BackHandler
} from 'react-native';


import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'
var urls = '';
const {width,height} = Dimensions.get('window');
import Toast from '../../Components/Toast'
import Modals from 'react-native-modal'
export default class mingxin extends Component {
  static defaultProps = {

  }
  static navigationOptions = {
      headerBackTitle:null,
      headerStyle:{
        height: 40
      },
  };
  constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        ReceiveCode:'',
        results:[]
      };
  }
  getName(val){
    if(val.id==69){
      this.setState({
        dutiaomaName: val.name
      })
    }
    if(val.id==68){
      this.setState({
        saoyiSName: val.name
      })
    }
    if(val.id==112){
      this.setState({
        daihaoName: val.name
      })
    }
    if(val.id==113){
      this.setState({
        mingcName: val.name
      })
    }
    if(val.id==114){
      this.setState({
        colorName: val.name
      })
    }
    if(val.id==115){
      this.setState({
        sizeName: val.name
      })
    }
    if(val.id==70){
      this.setState({
        kucunName: val.name
      })
    }
    if(val.id==98){
      this.setState({
        errorMessage: val.name
      })
    }
    if(val.id==101){
      this.setState({
        successMessage: val.name
      })
    }
    if(val.id==129){
      this.setState({
        message129: val.name
      })
    }
    if(val.id==130){
      this.setState({
        message130: val.name
      })
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('dataBase',(error,result)=>{
      var res = JSON.parse(result)
      console.log(res)
      if(res != null){
        urls = 'http://' + res[0].ipValue + ':' +res[0].serviceportValue
      }else{
        console.log(error)
        return
      }
    })
    AsyncStorage.getItem('langArr',(error,result)=>{
      var res = JSON.parse(result)
      //console.log(res)
      if(result != null){
        var newArr = []
        res.map((val)=>{
          if(val.pid == 46){
            return newArr.push(val)
          }
          if(val.id == 5){
            this.setState({
              titleName: val.name
            })
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
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }
  onBackAndroid = () => {
      this.props.navigation.goBack()
       return true;
   }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingVertical: 0,}}>
          <Text style={styles.nameStyles}>
            {this.state.titleName}
          </Text>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.dutiaomaName}:</Text>
            <TextInput
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              onChangeText={(e) => this.setState({ReceiveCode:e})}
              value={this.state.ReceiveCode}
              onEndEditing={(event) => (
                this.getData(event.nativeEvent.text)
              )}

            />
            <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getData(e)}})}>
              <Image style={{width:20,height:20}} source={{uri:'saomab'}} />
              <Text style={{fontSize: 8,color: '#000000'}} >{this.state.saoyiSName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.daihaoName}:</Text>
            <TextInput
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                editable= {false}
                value={this.state.results.huopindaihao}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.mingcName}:</Text>
            <TextInput
                editable={false}
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                value={this.state.results.huopinmingcheng}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.colorName}:</Text>
            <TextInput
                editable={false}
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                value={this.state.results.yanse}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.sizeName}:</Text>
            <TextInput
                editable={false}
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                value={this.state.results.chima}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.kucunName}:</Text>
            <TextInput
                editable={false}
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                value={this.state.results.kuncunshu}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
        </ScrollView>
        {/* <Modal
             animationType='fade'
             transparent={true}
             visible={this.state.loaded}
             onShow={() => {}}
             onRequestClose={() => {}} >
             <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                <View style={{width: 100,height: 100,backgroundColor: '#ffffff',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                  <Image source={loadingImage} style={{width:30,height:30,alignSelf:'center',marginBottom: 10}}></Image>
                  <Text>Loading...</Text>
                </View>
             </View>
          </Modal> */}
          <Modals
             isVisible={this.state.loaded}
             onBackButtonPress={()=>this.setState({loaded:false})}
             backdropOpacity={0.5}
             style={{margin:0,padding:0}}
             animationIn='fadeIn'
            animationOut='fadeOut'
             >
               <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                  <View style={{width: 100,height: 100,backgroundColor: '#ffffff',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                    <Image source={loadingImage} style={{width:30,height:30,alignSelf:'center',marginBottom: 10}}></Image>
                    <Text>Loading...</Text>
                  </View>
               </View>
          </Modals>
          <Toast ref="toast" position='bottom'/>
      </View>
    );
  }

  //获取条形码
  getData(e){
    _that = this;
    if (e=='') {return } ;
    this.setState({
      loaded:true,
      ReceiveCode:e
    })

    const url= urls + "/index.php/api/index/kucunchaxun?tiaoxingma="+e;

    return Promise.race([
        fetch(url),
        new Promise(function(resolve,reject){
            setTimeout(()=> reject(new Error('Network request timeout!')),10000)
        })])
      .then((response) => {
        if(response.ok){
          //alert(e);
           return response.json();
        }else{
          this.setState({
          loaded:false
        })
        }
      })
      .then((json) => {
        if (json.state == 'success') {
          this.setState({
            loaded:false,
            results: json.data[0]
          })
          this.refs.toast.show(this.state.successMessage,3000);
          //ToastAndroid.show(this.state.successMessage,ToastAndroid.SHORT);
        }else if(json.state == 'error'){
          this.setState({
            loaded:false,
            results:[]
          })
          if(json.msgcode == '004'){
            this.refs.toast.show(this.state.message129,3000);
            //alert(this.state.message129)
          }else{
            this.refs.toast.show(json.message,3000);
            //alert(json.message)
          }
        }

      })
      .catch((error) => {
        this.setState({
          loaded:false
        })
        this.refs.toast.show(this.state.message130,3000);
        //alert(this.state.message130)
      });

  }
}



const styles = StyleSheet.create({
  scanStyles:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 40,
    flex:0.2
  },
  formStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width - 40,
    marginTop: 10,
    marginBottom: 10,
  },
  textStyles:{
    color: '#000000',
    fontSize: 18,
    marginRight: 10,
    flex:0.6,
    textAlign:'right'
  },
  inputStyles:{
    width: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    paddingLeft: 20,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    flex:1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  nameStyles: {
    fontSize: 26,
    textAlign: 'center',
    margin: 0,
    color: '#000000',
    marginTop: 20
  },

});
