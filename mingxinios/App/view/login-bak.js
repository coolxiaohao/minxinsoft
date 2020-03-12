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
  ScrollView,
  Modal,
  BackHandler,
  Platform
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

const {width,height} = Dimensions.get('window');
import loadingImage from '../img/loading.gif'
import Toast from '../Components/Toast'
var urls = '';

export default class mingxin extends Component {
  static defaultProps = {

  }


  constructor(props) {
      super(props);
      this.state = {
          isSetUp:false,
          user: '',
          passWord: '',
          loading: false,
          companyName: '明歆软件公司',
          userName:'登录名',
          passWordName:'密码',
          loginName:'登录',
          setUpName:'设置',
          changLangName:'语言切换',
          databaseName:'数据库设置',
          systemDefaultName:'系统默认设置',
          cancelName:'取消',
          successMessage:'登录成功',
          errorMessage:'登录失败',
          errorMessageName:'用户名和密码不能为空',
          message166:'再按一次退出应用',
          whatLan:'cn',
          message130:'网络错误或服务器正在维护'
      };
  }
  getLan(e){
    _that = this;
    //alert(e+':'+this.state.whatLan)
    var url=urls+"/index.php/Api/index/ability?code="+this.state.whatLan+'&uid='+e;
    return fetch(url,{timeout:10000})
      .then((response) => {
        if(response.ok){
           return response.json();
        }
      })
      .then((json) => {
        //console.error(json)
        if(json.state == 'success'){
          AsyncStorage.setItem('langArr',JSON.stringify(json.data),(error)=>{
              if (error) {
              } else  {
                var newArr = []
                json.data.map((val)=>{
                  if(val.pid == 46){
                    return newArr.push(val)
                  }
                })
                //console.log(newArr)
                newArr.forEach((val,index)=>{
                  this.getName(val)
                })
              }
              if(e!=''){
                this.props.navigation.navigate('Home',{
                  call:((info)=>{
                    if(info){
                      this.setState({
                        whatLan: info
                      });
                      this.read()
                  };
                  })
                });
              }
          });
        }else if(json.state == 'error'){
          alert(json.message)
        }

      })
      .catch((error) => {
        alert(error);
      });
  }

  getLans(e){
    _that = this;
    //alert(urls)
    var url=urls+"/index.php/Api/index/ability?code="+e;
    return fetch(url,{timeout:10000})
      .then((response) => {
        if(response.ok){
           return response.json();
        }
      })
      .then((json) => {
        //console.error(json)

        if(json.state == 'success'){
          AsyncStorage.setItem('langArr',JSON.stringify(json.data),(error)=>{
              if (error) {
              } else  {
                var newArr = []
                json.data.map((val)=>{
                  if(val.pid == 46){
                    return newArr.push(val)
                  }
                })
                //console.log(newArr)
                newArr.forEach((val,index)=>{
                  this.getName(val)
                })
                  // console.error(JSON.stringify(json))
              }
          });
        }else if(json.state == 'error'){
          alert(json.message)
        }

      })
      .catch((error) => {
        alert(error);
      });
  }
  getName(val){
    if(val.id==47){
      this.setState({
        companyName: val.name
      })
    }
    if(val.id==57){
      this.setState({
        userName: val.name
      })
    }
    if(val.id==58){
      this.setState({
        passWordName: val.name
      })
    }
    if(val.id==48){
      this.setState({
        setUpName: val.name
      })
    }
    if(val.id==50){
      this.setState({
        databaseName: val.name
      })
    }
    if(val.id==51){
      this.setState({
        systemDefaultName: val.name
      })
    }
    if(val.id==85){
      this.setState({
        loginName: val.name
      })
    }
    if(val.id==53){
      this.setState({
        cancelName: val.name
      })
    }
    if(val.id==87){
      this.setState({
        changLangName: val.name
      })
    }
    if(val.id==89){
      this.setState({
        errorMessage: val.name
      })
    }
    if(val.id==90){
      this.setState({
        successMessage: val.name
      })
    }
    if(val.id==91){
      this.setState({
        errorMessageName: val.name
      })
    }
    if(val.id==130){
      this.setState({
        message130: val.name
      })
    }
    if(val.id==133){
      this.setState({
        message133: val.name
      })
    }
    if(val.id==134){
      this.setState({
        message134: val.name
      })
    }
    if(val.id==135){
      this.setState({
        message135: val.name
      })
    }
    if(val.id==136){
      this.setState({
        message136: val.name
      })
    }
    if(val.id==288){
      this.setState({
        message166: val.name
      })
    }
  }
  read(){
    AsyncStorage.getItem('userInfo',(error,result)=>{
        if (result != null) {
          this.props.navigation.navigate('Home',{lanChange:false})
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
        this.getLans(this.state.whatLan)
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
       if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
           //最近2秒内按过back键，可以退出应用。
           BackHandler.exitApp();
           return;
       }
       this.lastBackPressed = Date.now();
       this.refs.toast.show(this.state.message166,3000);
       //ToastAndroid.show(this.state.message167,ToastAndroid.SHORT);
       return true;
   }
   componentDidMount(){
     AsyncStorage.getItem('dataBase',(error,result)=>{
       var res = JSON.parse(result)
       console.log(res)
       if(res != null){
         urls = 'http://' + res[0].ipValue + ':' +res[0].serviceportValue
         this.read()
       }else{
         let dataBase = [];
         dataBase.push(
           {
             passWord: '13924349602',
             ipValue: 'mingxinsoft.cn',
             dataBaseName:'Jm5berp',
             loginValue:'sa',
             portValue:'1433',
             serviceportValue:'86',
           }
         );
         AsyncStorage.setItem('dataBase',JSON.stringify(dataBase),(error)=>{
             if (error) {

             } else  {
               urls = 'http://mingxinsoft.cn:86'
               this.read()
             }
         });
          return
       }
     })

   }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle = {{flex:1}} showsVerticalScrollIndicator={false}>
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <Text style={styles.nameStyles}>
              {this.state.companyName}
            </Text>
           <View style={styles.formStyles}>
               <View style={styles.rowStyles}>
                 <Text style={styles.userStyles}>{this.state.userName}:</Text>
                 <TextInput style={styles.inputStyles}
                   underlineColorAndroid="transparent"
                   value={this.state.user}
                   onChangeText={text => this.setState({
                           user: text
                       })}
                 />
               </View>
               <View style={styles.rowStyles}>
                 <Text style={styles.userStyles}>{this.state.passWordName}:</Text>
                 <TextInput style={styles.inputStyles}
                    underlineColorAndroid="transparent"
                    value={this.state.passWord}
                    onChangeText={text => this.setState({
                            passWord: text
                        })}
                    secureTextEntry={true}
                  />
               </View>
               <View style={styles.rowStyles}>
                 <Text style={styles.buttonStyles} onPress={()=>{this.checkUser()}}>{this.state.loginName}</Text>
                 <Text style={styles.buttonStyles} onPress={()=>{this.setState({isSetUp:true})}}>{this.state.setUpName}</Text>
               </View>
               <Text></Text>
           </View>

          </View>

        </ScrollView>
        <Modal
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
          </Modal>
          <Modal
             animationType='slide'
             transparent={true}
             visible={this.state.isSetUp}
             onShow={() => {}}
             onRequestClose={() => {}} >
             <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                {this.setUp()}
             </View>
          </Modal>
          <Toast ref="toast" position='bottom'/>
      </View>
    );
  }

  setUp(){
    return(
      <View style={{width: width,height: 120,backgroundColor: '#ffffff',borderRadius:10,justifyContent:'space-around',alignItems:'center',paddingBottom: 20}}>
        <Text onPress={()=>{
          this.setState({isSetUp:false,});
          this.props.navigation.navigate('Choselan',
          {callback: ((info) => { //回调函数
             this.setState({
                whatLan: info
            })
            this.getLans(info)
          })}
        )
        }}>{this.state.changLangName}</Text>
        <Text onPress={()=>{
          this.setState({isSetUp:false,});
          this.props.navigation.navigate('Database',
          {callbackD: ((url,port) => { //回调函数
             urls='http://'+ url+ ':' + port;
             //alert(urls)
             this.read()
          })}
        )
        }}>{this.state.databaseName}</Text>
        {/*<Text onPress={()=>{this.setState({isSetUp:false,}); this.props.navigation.navigate('Systemdefault')}}>{this.state.systemDefaultName}</Text>*/}
        {/* <Text onPress={()=>{this.setState({isSetUp:false}); AsyncStorage.clear()}}>清除缓存</Text> */}
        <Text onPress={()=>{this.setState({isSetUp:false})}}>{this.state.cancelName}</Text>
      </View>
    )
  }

  save(e){
      // JSON.stringify(object): JSON对象转换为字符串 用来存储
      AsyncStorage.setItem('userInfo',JSON.stringify(e),(error)=>{
          if (error) {
              this.refs.toast.show(this.state.errorMessage,5000);
              //ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
          } else  {
              //ToastAndroid.show(this.state.successMessage, ToastAndroid.SHORT);
              this.getLan(this.state.user)
              this.refs.toast.show(this.state.successMessage,5000);
          }
      });
  }

  checkUser(){
    _that = this;
    //alert(urls)
    if(urls ==''){
      alert('请先设置数据库')
      return
    }
    if (_that.state.user == '' || _that.state.passWord =='') {
      alert(this.state.errorMessageName);
      return;
    }
    this.setState({
      loading:true
    })
    const brand = DeviceInfo.getBrand()+DeviceInfo.getUniqueID();
    //console.log(brand)
    const url=urls+"/Api/login/login?user="+_that.state.user+"&password="+_that.state.passWord+"&brand="+brand;
    console.log(url)
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
        console.log(json)
        if(json.state == "success"){
            this.setState({
              loading:false
            })
            var systemDefault=[];
            if(json.data.nonumcheck_set == 'true'){
              json.data.nonumcheck_set = true
            }else{
              json.data.nonumcheck_set = false
            }
            if(json.data.allnum_set == 'true'){
              json.data.allnum_set = true
            }else{
              json.data.allnum_set = false
            }
            if(json.data.rownum_set == 'true'){
              json.data.rownum_set = true
            }else{
              json.data.rownum_set = false
            }
            if(json.data.chongfusao_set == 'true'){
              json.data.chongfusao_set = true
            }else{
              json.data.chongfusao_set = false
            }
            if(json.data.chaoshu_set == 'true'){
              json.data.chaoshu_set = true
            }else{
              json.data.chaoshu_set = false
            }
            if(json.data.huoqukongbai_set == 'true'){
              json.data.huoqukongbai_set = true
            }else{
              json.data.huoqukongbai_set = false
            }
            if(json.data.checkhuoqukucun_set == 'true'){
              json.data.checkhuoqukucun_set = true
            }else{
              json.data.checkhuoqukucun_set = false
            }
            if(json.data.employee_number == 'true'){
              json.data.employee_number = true
            }else{
              json.data.employee_number = false
            }
            systemDefault.push(
              {
                'choseAll':json.data.nonumcheck_set,
                'isShuliang':json.data.allnum_set,
                'shuLiang':json.data.allnum_set_val,
                'hangShu':json.data.rownum_set_val,
                'isHangshu':json.data.rownum_set,
                'isResaoma':json.data.chongfusao_set,
                'isChaoshu':json.data.chaoshu_set,
                'ishuoqu':json.data.huoqukongbai_set,
                'ishuoquK':json.data.checkhuoqukucun_set,
                'saveYuan': json.data.employee_number,
              }
            );
            //console.error(systemDefault)
            AsyncStorage.setItem('systemDefault',JSON.stringify(systemDefault),(error)=>{
              if (error) {

              } else  {

              }
            })
            this.save(json.data);
        }else if(json.state == 'error'){
            this.setState({
              loading:false,
            })
            if(json.msgcode == '100'){
              this.refs.toast.show(this.state.message136,5000);
              //alert('帐号或密码错误，请重试！')
            }else if(json.msgcode == '101'){
              this.refs.toast.show(this.state.message133,5000);
              //alert('账号为空')
            }else if(json.msgcode == '102'){
              this.refs.toast.show(this.state.message134,5000);
              //alert('密码为空')
            }else if(json.msgcode == '103'){
              this.refs.toast.show(this.state.message135,5000);
              //alert('该用户已上锁，请联系管理员！')
            }else{
              this.refs.toast.show(json.message,5000);
              //alert(json.message)
            }
        }
      })
      .catch((error) => {
        this.setState({
          loading:false
        })
        this.refs.toast.show(this.state.message130,5000);
        //alert('网络错误或服务器正在维护')
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
    marginTop: Platform.OS == 'ios' ? 20 : 0
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
    borderColor: '#c8c8c8',
    borderWidth: 1,
  },
  userStyles: {
    fontSize: 20,
    color: '#000000',
    marginRight: 5,
    textAlign:'right',
    flex:0.3
  },
  inputStyles: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: 180,
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 14,
    paddingRight: 0,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    flex:0.6
  },
  buttonStyles: {
    backgroundColor: 'white',
    color: '#87caf5',
    fontSize: 20,
    fontWeight: "100",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#c8c8c8',
    borderWidth: 1,
  }
});
