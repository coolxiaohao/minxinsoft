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
  AsyncStorage,
  BackHandler,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';



const {width,height} = Dimensions.get('window');

import utils from '../../utils/utils'
var urls = '';
import loadingImage from '../../img/loading.gif'
import Toast from '../../Components/Toast'
import Modals from "react-native-modal";
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
          choseAll: true,
          isShuliang: false,
          shuLiang: '',
          hangShu:'',
          isHangshu: false,
          isResaoma: false,
          isChaoshu: false,
          isChaoDjs: false,
          ishuoqu: false,
          ishuoquK: false,
          saveYuan: false,
          loaded: false,
          names:[],
      };
  }
  getName(val){
    if(val.id==51){
      this.setState({
        titleName: val.name
      })
    }
    if(val.id==60){
      this.setState({
        allName: val.name
      })
    }
    if(val.id==61){
      this.setState({
        zongshuName: val.name
      })
    }
    if(val.id==62){
      this.setState({
        hangshuName: val.name
      })
    }
    if(val.id==63){
      this.setState({
        resaomaName: val.name
      })
    }
    if(val.id==64){
      this.setState({
        chaoshuName: val.name
      })
    }
    if(val.id==65){
      this.setState({
        saveBtn: val.name
      })
    }
    if(val.id==53){
      this.setState({
        cancelBtn: val.name
      })
    }
    if(val.id==99){
      this.setState({
        successMessage: val.name
      })
    }
    if(val.id==111){
      this.setState({
        errorMessage: val.name
      })
    }
    if(val.id==109){
      this.setState({
        message1: val.name
      })
    }
    if(val.id==110){
      this.setState({
        message2: val.name
      })
    }
    if(val.id==130){
      this.setState({
        message130: val.name
      })
    }
    if(val.id==1000){
      this.setState({
        message1000: val.name
      })
    }
    if(val.id==1001){
      this.setState({
        message1001: val.name
      })
    }
    if(val.id==1006){
      this.setState({
        message1006: val.name
      })
    }
    //是否超单据数
    if(val.id==1009){
      this.setState({
        messageCDJS: val.name
      })
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userInfo',(error,result)=>{
        if (!error) {
          this.setState({
            names: JSON.parse(result)
          })
          //console.error(this.state.names.user_token)
          //this.state.names = JSON.parse(result)
        }
    })
    AsyncStorage.getItem('dataBase',(error,result)=>{
      var res = JSON.parse(result)
      console.log(res)
      if(res != null){
        urls = 'http://' + res[0].ipValue + ':' +res[0].serviceportValue
      }else{
        return
      }
    })
      AsyncStorage.getItem('systemDefault',(error,result)=>{
        console.log(JSON.parse(result))
        var res = JSON.parse(result);
        //console.error(res[0].choseAll)
        if(result != null){
          this.setState({
            choseAll: res[0].choseAll,
            isShuliang: res[0].isShuliang,
            shuLiang: res[0].shuLiang,
            hangShu:res[0].hangShu,
            isHangshu: res[0].isHangshu,
            isResaoma: res[0].isResaoma,
            isChaoshu: res[0].isChaoshu,
            isChaoDjs: res[0].isChaoDjs,
            ishuoqu: res[0].ishuoqu,
            ishuoquK: res[0].ishuoquK,
            saveYuan: res[0].saveYuan,
          })
        }else{

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
  changeAll(){
    let self = this;
    self.setState({choseAll:!self.state.choseAll});
    if(!self.state.choseAll){
      self.setState({
        isShuliang: false,
        isHangshu: false,
        isResaoma: false,
        isChaoshu: false,
        isChaoDjs: false,
        ishuoqu: false,
        ishuoquK: false,
        saveYuan: false,
      })
    }
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
        <ScrollView style={{flex:1,paddingTop:20}}>
          <Text style={styles.nameStyles}>
            {this.state.titleName}
          </Text>
          <View style={styles.formStyles}>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.choseAll ? styles.radioBtns:'']} onPress={
                  this.changeAll.bind(this)
              }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.allName}</Text>
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.isShuliang ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({isShuliang:!this.state.isShuliang});
                  if(!this.state.isShuliang) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.zongshuName}</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   keyboardType='numeric'
                   value={`${this.state.shuLiang}`}
                   onChange = {(e)=>this.setState({shuLiang: e.nativeEvent.text}) }
                 />
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.isHangshu ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({isHangshu:!this.state.isHangshu});
                  if(!this.state.isHangshu) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.hangshuName}</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   keyboardType='numeric'
                   value={`${this.state.hangShu}`}
                   onChange = {(e)=>this.setState({hangShu: e.nativeEvent.text}) }
                 />
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.isResaoma ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({isResaoma:!this.state.isResaoma});
                  if(!this.state.isResaoma) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.resaomaName}</Text>
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.isChaoshu ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({isChaoshu:!this.state.isChaoshu});
                  if(!this.state.isChaoshu) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.chaoshuName}</Text>
              </View>
            <View style={styles.rowStyles}>
              <TouchableOpacity style={[styles.radioBtn,this.state.isChaoDjs ? styles.radioBtns:'']} onPress={()=>{
                this.setState({isChaoDjs:!this.state.isChaoDjs});
                if(!this.state.isChaoDjs) {
                  this.setState({
                    choseAll: false
                  })
                }
              }
              }></TouchableOpacity>
              <Text style={styles.userStyles}>{this.state.messageCDJS}</Text>
            </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.ishuoqu ? styles.radioBtns:'']} onPress={()=>{
                  if(!this.state.ishuoquK){
                    this.setState({ishuoqu:!this.state.ishuoqu});
                  }
                  if(!this.state.ishuoqu) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.message1000}</Text>
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.ishuoquK ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({ishuoquK:!this.state.ishuoquK});
                  if(!this.state.ishuoquK) {
                    this.setState({
                      choseAll: false,
                      ishuoqu: true
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.message1001}</Text>
              </View>
              <View style={styles.rowStyles}>
                <TouchableOpacity style={[styles.radioBtn,this.state.saveYuan ? styles.radioBtns:'']} onPress={()=>{
                  this.setState({saveYuan:!this.state.saveYuan});
                  if(!this.state.saveYuan) {
                    this.setState({
                      choseAll: false
                    })
                  }
                }
                }></TouchableOpacity>
                <Text style={styles.userStyles}>{this.state.message1006}</Text>
              </View>
              <View style={styles.btnStyles}>
                <Text style={styles.buttonStyles} onPress={()=>{this.saveData()}}>{this.state.saveBtn}</Text>
                <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.goBack()}}>{this.state.cancelBtn}</Text>
              </View>
          </View>
        </ScrollView>
        {/* <Modal
             animationType='fade'
             transparent={true}
             visible={this.state.loaded}
             onShow={() => {}}
             onRequestClose={() => {}} >
             <TouchableOpacity onPress={()=>{this.setState({loaded:false})}} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                <View style={{width: 100,height: 100,backgroundColor: '#ffffff',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                  <Image source={loadingImage} style={{width:30,height:30,alignSelf:'center',marginBottom: 10}}></Image>
                  <Text>Loading...</Text>
                </View>
             </TouchableOpacity>
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
  saveData(){
    this.setState({
      loaded: true
    })
    console.log(this.state.choseAll)
    if(this.state.choseAll){
      this.setState ({
          isShuliang: false,
          shuLiang: '',
          hangShu:'',
          isHangshu: false,
          isResaoma: false,
          isChaoshu: false,
          isChaoDjs: false,
          ishuoqu: false,
          ishuoquK: false,
          saveYuan: false,
      });
    }else{
      if(this.state.isShuliang && this.state.shuLiang == ''){
        alert(this.state.message1)
        return
      }
      if(this.state.isHangshu && this.state.hangShu == ''){
        alert(this.state.message2)
        return
      }
      if(!this.state.isShuliang && !this.state.isHangshu &&
        !this.state.isResaoma && !this.state.isChaoshu && !this.state.isChaoDjs &&
        !this.state.ishuoqu && !this.state.ishuoquK &&
        !this.state.saveYuan
      ){
        this.state.choseAll = true;
      }
    }
    var systemDefault=[];
    systemDefault.push(
      {
        'choseAll':this.state.choseAll,
        'isShuliang':this.state.isShuliang,
        'shuLiang':this.state.shuLiang,
        'hangShu':this.state.hangShu,
        'isHangshu':this.state.isHangshu,
        'isResaoma':this.state.isResaoma,
        'isChaoshu':this.state.isChaoshu,
        'isChaoDjs':this.state.isChaoDjs,
        'ishuoqu': this.state.ishuoqu,
        'ishuoquK': this.state.ishuoquK,
        'saveYuan': this.state.saveYuan,
      }
    );
    //console.error(systemDefault)
    let url = urls + '/Api/index/saveset?nonumcheck='+this.state.choseAll+'&allnum='+
    this.state.isShuliang+'&allnum_val='+this.state.shuLiang+'&rownum_val='+this.state.hangShu+'&rownum='+this.state.isHangshu+
    '&chongfusao='+this.state.isResaoma+'&chaoshu='+this.state.isChaoshu+'&chaodanjushu='+this.state.isChaoDjs+'&huoqukongbai_set='+this.state.ishuoqu+
    '&checkhuoqukucun_set='+this.state.ishuoquK+'&employee_number='+this.state.saveYuan+'&user_token='+this.state.names.user_token;
    console.log(url)
    return Promise.race([
        fetch(url),
        new Promise(function(resolve,reject){
            setTimeout(()=> reject(new Error('Network request timeout!')),10000)
        })])
      .then((response) => {
        if(response.ok){
          //console.error(response)
           return response.json();
        }else{
          this.setState({
            loaded:false
          })
        }
      })
      .then((json) => {
        console.log(json);

      if(json.state == 'success'){
        this.setState({
          loaded:false
        })
        AsyncStorage.setItem('systemDefault',JSON.stringify(systemDefault),(error)=>{
          if (error) {

          } else  {
              this.refs.toast.show(this.state.successMessage,3000);
              setTimeout(()=>{
                this.props.navigation.goBack()
              },1000)
          }
        })

      }else if(json.state == 'error'){
        this.setState({
          loaded:false
        })
        this.refs.toast.show(this.state.errorMessage,3000);
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 20
  },
  radioBtns: {
    backgroundColor: 'blue',
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width - 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  btnStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  nameStyles: {
    fontSize: 26,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },
  titleStyles: {
    fontSize: 18,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },
  formStyles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    height: height / 2 + 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    marginTop: 10
  },
  routerStyles: {
    color: '#000000',
    fontSize: 16
  },
  userStyles: {
    fontSize: 18,
    color: '#000000',
    marginRight: 5
  },
  inputStyles: {
    borderRadius: 14,
    backgroundColor: 'white',
    width: 100,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 14,
    paddingRight: 0,
    borderWidth:1,
    borderColor: 'gray',
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
  }
});
