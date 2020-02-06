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
        dayCounts:'',
        monthsCounts:'',
        names:[],
        showgonghao:true,
      };
  }
  getName(val){
    if(val.id==116){
      this.setState({
        saoGongHName: val.name
      })
    }
    if(val.id==68){
      this.setState({
        saoyiSName: val.name
      })
    }
    if(val.id==122){
      this.setState({
        dayName: val.name
      })
    }
    if(val.id==123){
      this.setState({
        monthName: val.name
      })
    }
    if(val.id==120){
      this.setState({  // 此员工号不存在
        errorMessage: val.name
      })
    }
    if(val.id==118){ // 该员工已离职
      this.setState({
        errorMessageName: val.name
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
  read(){
        AsyncStorage.getItem('userInfo',(error,result)=>{
            if (!error) {
              this.setState({
                names: JSON.parse(result)
              })
              //console.error(this.state.names.user_token)
              //this.state.names = JSON.parse(result)
            }
        })
        AsyncStorage.getItem('systemDefault',(error,result)=>{
          var res = JSON.parse(result);
          if(result != null){
            this.setState({
              saveYuan: res[0].saveYuan,
              showgonghao: !res[0].saveYuan,
            })
            if(res[0].saveYuan){
              this.getData(this.state.names.userno)
            }
          }else{
            this.setState({
              saveYuan: false,
            })
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
              if(val.id == 7){
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
  componentDidMount(){
    AsyncStorage.getItem('dataBase',(error,result)=>{
      var res = JSON.parse(result)
      console.log(res)
      if(res != null){
        urls = 'http://' + res[0].ipValue + ':' +res[0].serviceportValue
      }else{
        return
      }
    })
    this.setState({
      ReceiveCode:'',
      dayCounts:'',
      monthsCounts:''
    })
    this.read();
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
            <Text style={styles.textStyles}>{this.state.saoGongHName}:</Text>
            <TextInput
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              editable= {this.state.showgonghao}
              onChangeText={(e) => this.setState({ReceiveCode:e})}
              value={this.state.saveYuan ? this.state.names.userno : this.state.ReceiveGongHao}
              onEndEditing={(event) => (
                this.getData(event.nativeEvent.text)
            )}
            />
            {
              this.state.saveYuan ?
              <Text style={{width:32,height:36}}></Text> :
              <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getData(e)}})}>
                <Image style={{width:20,height:20}} source={{uri:'saomab'}} />
                <Text style={{fontSize: 8,color: '#000000'}} >{this.state.saoyiSName}</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.dayName}:</Text>
            <TextInput
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                editable= {false}
                value={this.state.dayCounts}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.monthName}:</Text>
            <TextInput
                editable={false}
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                value={this.state.monthsCounts}
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
  getData(e){
    _that = this;
    if (e=='') {return } ;
    this.setState({
      loaded:true,
      ReceiveCode:e
    })
    var timestamp = Date.parse(new Date())/1000;
    const url= urls + "/index.php/api/index/chafei?&yuangonghao="+e+"&riqi="+timestamp;
    console.log(url)
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
        console.log(json)
        if (json.state === 'success') {
          if(json.data[0].r08a029 == 1){
            this.refs.toast.show(this.state.errorMessageName,3000);
            //alert(this.state.errorMessageName)
            _that.setState({
              ReceiveGongHao: '',
              loaded:false,
            })
           }else{
             this.setState({
               //ReceiveCode:'',
               loaded:false,
               dayCounts: json.data[0].zhongfeishu,
               monthsCounts: json.data[0].shijishuliang
             });
           }
           //console.error(goodsc);
        }else if(json.state == 'error'){
          this.setState({
            loaded:false,
            dayCounts: '',
            monthsCounts: ''
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
  titleStyles: {
    fontSize: 18,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },

});
