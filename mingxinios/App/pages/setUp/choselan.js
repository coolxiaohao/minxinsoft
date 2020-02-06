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
  Picker,
  AsyncStorage,
  Modal,
  BackHandler
} from 'react-native';

import utils from '../../utils/utils'
var urls = '';
import loadingImage from '../../img/loading.gif'
const {width,height} = Dimensions.get('window');
import Toast from '../../Components/Toast'
import Modals from 'react-native-modal'
export default class mingxin extends Component {
  static navigationOptions = {
      headerBackTitle:null,
      headerStyle:{
        height: 40
      }
  };

  constructor(props) {
      super(props);
      this.state = {
          dropdown: '',
          loading:false,
          cangkuname:[],
          choseValue:'cn',
          titleName:'语言选择',
          sureBtn:'确定',
          backBtn:'返回',
          names:[]
      };
  }
  getName(val){
    if(val.id==88){
      this.setState({
        titleName: val.name
      })
    }
    if(val.id==66){
      this.setState({
        sureBtn: val.name
      })
    }
    if(val.id==67){
      this.setState({
        backBtn: val.name
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
  getLan(){
    AsyncStorage.getItem('langArr',(error,result)=>{
      var res = JSON.parse(result)
      //console.error(res)
      if(result != null){
        var newArr = []
        var lanArr = ''
        res.map((val)=>{
          if(val.pid == 46){
            return newArr.push(val)
          }
          if(val.id == 82){
            return lanArr = val.lang
          }
        })
        //console.log(lanArr)
        newArr.forEach((val,index)=>{
          this.getName(val)
        })
        this.setState({
          cangkuname: lanArr
        })
      }else{
        console.log(error)
      }
    })
  }
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    AsyncStorage.getItem('userInfo',(error,result)=>{
        if (result != null) {
          this.setState({
            names: JSON.parse(result)
          })
        }
    })
    this.getLan();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }
  onBackAndroid = () => {
      this.props.navigation.goBack()
       return true;
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
    this.setState ({
        dropdown: '',
        cangkuname: '',
        choseValue:''
    });
    //this.getMenus();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.nameStyles}>
          {this.state.titleName}
        </Text>
        <View style={styles.formStyles}>
          <Picker style={styles.picker}
            mode={'dropdown'}
            selectedValue={this.state.dropdown}
            itemStyle={styles.itempicker}
            onValueChange={(value)=>this.setState({dropdown:value})}>
            {this.rendergoods()}
          </Picker>
          <View style={styles.btnStyles}>
            <Text style={styles.buttonStyles} onPress={()=>{this.getMenus()}}>{this.state.sureBtn}</Text>
            <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.goBack()}}>{this.state.backBtn}</Text>
          </View>
        </View>
        {/* <Modal
             animationType='fade'
             transparent={true}
             visible={this.state.loading}
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
             isVisible={this.state.loading}
             onBackButtonPress={()=>this.setState({loading:false})}
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
  getMenus(){
    _that = this;
    if(this.state.cangkuname==''){
      this.refs.toast.show('请选择语言',3000);
      return
    }
    if(this.state.dropdown==''){
      this.state.dropdown = 'cn'
    }
    this.setState({
      loading:true
    })
    let uid = '';
    if(this.state.names != ''){
      uid = this.state.names.userno
    }
    var url=urls+"/index.php/Api/index/ability?code="+this.state.dropdown+'&uid='+uid;
    return Promise.race([
        fetch(url),
        new Promise(function(resolve,reject){
            setTimeout(()=> reject(new Error('Network request timeout!')),10000)
        })])
      .then((response) => {
        if(response.ok){
           return response.json();
        }else{
          this.setState({
            loading:false
          })
        }
      })
      .then((json) => {
        if(json.state == 'success'){
          this.setState({
            loading:false
          })
          AsyncStorage.setItem('langArr',JSON.stringify(json.data),(error)=>{
              if (error) {

              } else  {
                this.getLan();
                if(_that.state.names!=''){
                  if (this.props.navigation.state.params.callBack) {
                    this.props.navigation.state.params.callBack(this.state.dropdown)
                  }
                  this.props.navigation.navigate('Home')
                }else{
                  if (this.props.navigation.state.params.callback) {
                    this.props.navigation.state.params.callback(this.state.dropdown)
                  }
                  this.props.navigation.navigate('Login')
                }
              }
          });
        }else if(json.state == 'error'){
          this.setState({
            loaded:false
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
          loading:false
        })
        this.refs.toast.show(this.state.message130,3000);
        //alert(this.state.message130)
      });
  }

  rendergoods(){
    var goodscount=[];
    if(this.state.cangkuname.length <= 0){
      goodscount.push(
        <Picker.Item key={0} color='#999999' label="null" value="0" />
      )
    }else{
      for(var i=0;i<this.state.cangkuname.length;i++){
        goodscount.push(
           <Picker.Item key={i} color='#999999' label={this.state.cangkuname[i].lang} value={this.state.cangkuname[i].code} />
        );
     }
    }
    return goodscount;
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
  nameStyles: {
    fontSize: 30,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },
  formStyles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 60,
    height: height / 3 + 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    marginTop: 40,
    borderWidth:1,
    borderColor: 'gray',
    position:'relative'
  },
  btnStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonStyles: {
    backgroundColor: 'white',
    color: '#000000',
    fontSize: 20,
    fontWeight: "100",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    borderWidth:1,
    borderColor: 'gray',
  },
  pickers: {
    backgroundColor: '#ffffff',
    //color: '#999999',
    width: 150,
    height: 36,
    borderRadius: 20,
    borderWidth:1,
    borderColor: 'gray',
  },
  picker:{
    justifyContent:'center',
    // height: 216,//Picker 默认高度
    width: 150,
  },
  itempicker:{
    fontSize:19,
    height:161
  }
});
