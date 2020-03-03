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
  Modal,
  BackHandler,
  ScrollView
} from 'react-native';



const {width,height} = Dimensions.get('window');

import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'
var urls = utils.url;
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
          titleName:'数据库设置',
          passWordName: '密码',
          ipName: '数据库IP',
          dataName:'数据库名称',
          loginName:'登录名',
          serviceportName:'服务器端口',
          message154:'数据库端口',
          changBtn:'确定',
          cancelBtn:'取消',
          message111:'保存失败',
          message132:'数据库连接失败',
          message130:'网络错误或服务器正在维护',
          message173:'请输入每一个内容',
          saveSuccessName:'保存成功',
          passWord: '13924349602',
          ipValue: 'mingxinsoft.cn',
          dataBaseName:'Jm5berp',
          loginValue:'sa',
          portValue:'1433',
          serviceportValue:'86',
          loaded: false
      };
  }
  getName(val){
    if(val.id==50){
      this.setState({
        titleName: val.name
      })
    }
    if(val.id==54){
      this.setState({
        ipName: val.name
      })
    }
    if(val.id==56){
      this.setState({
        dataName: val.name
      })
    }
    if(val.id==57){
      this.setState({
        loginName: val.name
      })
    }
    if(val.id==58){
      this.setState({
        passWordName: val.name
      })
    }
    if(val.id==311){
      this.setState({
        serviceportName: val.name
      })
    }
    if(val.id==59){
      this.setState({
        changBtn: val.name
      })
    }
    if(val.id==67){
      this.setState({
        cancelBtn: val.name
      })
    }
    if(val.id==111){
      this.setState({
        message111: val.name
      })
    }
    if(val.id==154){
      this.setState({
        message154: val.name
      })
    }
    if(val.id==132){
      this.setState({
        message132: val.name
      })
    }
    if(val.id==130){
      this.setState({
        message130: val.name
      })
    }
    if(val.id==99){
      this.setState({
        saveSuccessName: val.name
      })
    }
    if(val.id==295){
      this.setState({
        message173: val.name
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
    AsyncStorage.getItem('dataBase',(error,result)=>{
      var res = JSON.parse(result)
      //console.log(res)
      if(res != null){
        this.setState ({
            passWord: res[0].passWord,
            ipValue: res[0].ipValue,
            dataBaseName:res[0].dataBaseName,
            loginValue:res[0].loginValue,
            portValue:res[0].portValue,
            serviceportValue: res[0].serviceportValue,
        });
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
        <View  style={styles.container}>
          <ScrollView style={{flex:1,paddingTop:20}}>
          <Text style={styles.nameStyles}>
            {this.state.titleName}
          </Text>
          <View style={styles.formStyles}>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>{this.state.ipName}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({ipValue: e.nativeEvent.text})}
                   value={`${this.state.ipValue}`}
                 />
              </View>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>{this.state.dataName}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({dataBaseName: e.nativeEvent.text})}
                   value={`${this.state.dataBaseName}`}
                 />
              </View>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>{this.state.serviceportName}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({serviceportValue: e.nativeEvent.text})}
                   value={`${this.state.serviceportValue}`}
                 />
              </View>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>{this.state.message154}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({portValue: e.nativeEvent.text})}
                   value={`${this.state.portValue}`}
                 />
              </View>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>{this.state.loginName}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({loginValue: e.nativeEvent.text})}
                   value={`${this.state.loginValue}`}
                   autoCapitalize='none'
                 />
              </View>
              <View style={styles.rowStyles}>
                <Text style={styles.userStyles}>   {this.state.passWordName}:</Text>
                <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   onChange = {(e)=>this.setState({passWord: e.nativeEvent.text})}
                   secureTextEntry={true}
                   value={`${this.state.passWord}`}
                 />
              </View>
              <View style={styles.btnStyles}>
                <Text style={styles.buttonStyles} onPress={()=>{this.change()}}>{this.state.changBtn}</Text>
                <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.goBack()}}>{this.state.cancelBtn}</Text>
              </View>
          </View>
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
            <Toast ref="toast" position='center'/>
          </ScrollView>
    </View>
    );
  }
  change(){
    _that = this;
    if(this.state.ipValue == '' || this.state.dataBaseName == '' || this.state.loginValue == '' || this.state.passWord == '' || this.state.portValue == '' || this.state.serviceportValue == ''){
      alert(this.state.message173)
      return
    }
    const url= 'http://'+ this.state.ipValue + ':' + this.state.serviceportValue + "/index.php/api/index/db_update?host="+this.state.ipValue+"&name="+this.state.dataBaseName+"&user="+this.state.loginValue+"&pwd="+this.state.passWord+"&port="+this.state.portValue;

    console.log(url)
    this.setState({
      loaded:true
    })
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
        let dataBase = [];
        dataBase.push(
          {
            ipValue:this.state.ipValue,
            dataBaseName:this.state.dataBaseName,
            loginValue:this.state.loginValue,
            passWord:this.state.passWord,
            portValue:this.state.portValue,
            serviceportValue:this.state.serviceportValue,
          }
        );
        AsyncStorage.setItem('dataBase',JSON.stringify(dataBase),(error)=>{
            if (error) {

            } else  {
              AsyncStorage.removeItem('userInfo');
              AsyncStorage.removeItem('systemDefault');
              if (this.props.navigation.state.params.callbackD) {
                this.props.navigation.state.params.callbackD(this.state.ipValue,this.state.serviceportValue)
              }
              this.refs.toast.show(this.state.saveSuccessName,3000);
              //ToastAndroid.show(this.state.saveSuccessName,ToastAndroid.SHORT);
              //this.props.navigation.navigate('Login');
            }
        });

      }else if(json.state == 'error'){
        this.setState({
          loaded:false
        })
        if(json.msgcode == '001'){
          this.refs.toast.show(this.state.message111,3000);
          //alert(this.state.message111)
        }else if(json.msgcode == '005'){
          this.refs.toast.show(this.state.message132,3000);
          //alert(this.state.message132)
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginRight: 5,
    flex:0.4,
    textAlign:'right'
  },
  inputStyles: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: width/2,
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 14,
    paddingRight: 0,
    borderWidth:1,
    borderColor: 'gray',
    flex:0.6
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
