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
        names:[]
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
    if(val.id==67){
      this.setState({
        backBtn: val.name
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
    if(val.id==148){
      this.setState({
        message148: val.name
      })
    }
    if(val.id==127){
      this.setState({
        message127: val.name
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
    if(val.id==149){
      this.setState({
        message149: val.name
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
        AsyncStorage.getItem('langArr',(error,result)=>{
          var res = JSON.parse(result)
          //console.log(res)
          if(result != null){
            var newArr = []
            res.map((val)=>{
              if(val.pid == 46){
                return newArr.push(val)
              }
              if(val.id == 16){
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
            <View style={styles.rowStyles}>
              <Text style={styles.textStyles}>{this.state.message148}:</Text>
              <TextInput
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                editable= {this.state.showtiaoma}
                onChangeText={(e) => this.setState({ReceiveCode:e})}
                value={this.state.ReceiveCode}
                onEndEditing={(e)=> this.getData(e.nativeEvent.text)}
              />
              <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.setState({ReceiveCode:e});this.getData(e)}})}>
                <Image style={{width:20,height:20}} source={{uri:'saomab'}} />
                <Text style={{fontSize: 8,color: '#000000'}} >{this.state.saoyiSName}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnStyles}>
            <Text style={styles.buttonStyles} onPress={()=>{this.getData()}}>{this.state.message127}</Text>
            <Text style={styles.buttonStyles} onPress={()=>{this.props.navigation.goBack()}}>{this.state.backBtn}</Text>
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
    if (e=='') {return alert(this.state.message149)} ;
    //alert(e);
    //alert(this.props.navigation.state.params.cangkudaihao);
    this.setState({
      loaded:true
    })

    const url= urls + "/index.php/api/index/saoxianghao?&xianghao="+e;
  //   var goodsc = [
  //     {'tiaoma':'123456','saomiaoshu': '0','saomiaoshijian':'','jianshu':'20','kucun':'100','chayishu':'20'},
  //     {'tiaoma':'123456789','saomiaoshu': '0','saomiaoshijian':'','jianshu':'30','kucun':'120','chayishu':'30'}
  // ];
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
           });
           let goodsc = [];
           json.data.forEach((val,index)=>{
             if(val.shengyushu <= '0.00'){
               return
             }
             var chayishu = parseFloat(val.shengyushu) - parseFloat(0.00);
             goodsc.push({'zhuangxiangdanhao': val.zhuangxiangdanhao,'tiaoma':val.tiaoxingma,'saomiaoshu': parseFloat(0.00).toFixed(2),'jianshu':parseFloat(val.shengyushu).toFixed(2),'shuliang':parseFloat(val.shuliang).toFixed(2),"chayishu":parseFloat(chayishu).toFixed(2)})
           })
           if(goodsc.length == 0){
             this.refs.toast.show(this.state.ReceiveCode+'已经出完！',3000);
             //alert(this.state.ReceiveCode+'已经出完！')
             return
           }
          this.props.navigation.navigate('ZhuangxiangS',{dingdanhao:this.state.ReceiveCode,goodsc:goodsc})
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
    marginLeft: 8,
    flex:0.3
  },
  formStyles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    height: height / 3 + 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 40,
    borderColor: '#c8c8c8',
    borderWidth: 1,
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    paddingLeft: 5,
    paddingRight: 5
  },
  textStyles:{
    color: '#000000',
    fontSize: 18,
    marginRight: 10,
    flex:0.7,
    textAlign:'right'
  },
  inputStyles:{
    width: 160,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    paddingLeft: 20,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    marginLeft: 8,
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
});
