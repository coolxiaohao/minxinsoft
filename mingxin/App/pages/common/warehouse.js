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
  Platform,
  BackHandler,
  TouchableOpacity
} from 'react-native';

import utils from '../../utils/utils'
var urls = '';
import Toast from '../../Components/Toast'
const {width,height} = Dimensions.get('window');
import loadingImage from '../../img/loading.gif'
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
          cangkuname:'',
          names:'',
          choseValue:'',
          setUpLan: false,
          titleName:'',
          sureBtn:'',
          backBtn:'',
          noChoseName:'',
          loading: false,
      };
  }
  getName(val){
    if(val.id==92){
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
    if(val.id==93){
      this.setState({
        noChoseName: val.name
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
    if(val.id==147){
      this.setState({
        message147: val.name
      })
    }
    if(val.id==68){
      this.setState({
        saoyiSName: val.name
      })
    }
    if(val.id==307){
      this.setState({
        errnone: val.name
      })
    }
    if(val.id==308){
      this.setState({
        cangkucode: val.name
      })
    }
    if(val.id==309){
      this.setState({
        cangname: val.name
      })
    }
  }
  read(){
        AsyncStorage.getItem('userInfo',(error,result)=>{
            if (!error) {
              this.setState({
                names: JSON.parse(result)
              })
              this.getCangKu();
            }else{
              this.props.navigation.navigate('Login')
            }
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
    this.setState ({
        dropdown: '',
        cangkuname: '',
        choseValue:''
    });
    this.read();
    //console.error(this.props.navigation.state.params.typeValue)
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
        <Text style={styles.nameStyles}>
          {this.state.titleName}
        </Text>
        <View style={styles.formStyles}>
          <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',marginHorizontal: 10}}>
            <Text style={styles.textStyles}>{this.state.cangkucode}:</Text>
            <TextInput
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              onChangeText={(e) => this.setState({dropdown:e})}
              value={this.state.dropdown}
              onEndEditing={(event) => (
                this.getData(event.nativeEvent.text)
            )}
            />
            <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getData(e)}})}>
              <Image style={{width:20,height:20}} source={{uri:'saomab'}} />
              <Text style={{fontSize: 8,color: '#000000'}} >{this.state.saoyiSName}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',marginHorizontal: 10}}>
            <Text style={styles.textStyles}>{this.state.cangname}:</Text>
            <Picker style={styles.picker}
              mode={'dropdown'}
              selectedValue={this.state.dropdown}
              itemStyle={styles.itempicker}
              onValueChange={(value)=>this.setState({dropdown:value})}>
              {this.rendergoods()}
            </Picker>
          </View>
          <View style={styles.btnStyles}>
            <Text style={styles.buttonStyles} onPress={()=>{this.toPage()}}>{this.state.sureBtn}</Text>
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
  getData(e){
    var pro = [];
    if(this.state.cangkuname == ''){
      this.refs.toast.show(this.state.errnone,3000);
      return
    }
    this.state.cangkuname.forEach(val=>{
      pro.push(val.cangkudaihao);
    })
    if(pro.includes(e)){
      this.setState({
        dropdown: e,
      })
    }else{
      this.setState({
        dropdown:'',
      })
      this.refs.toast.show(this.state.errnone,3000);
    }
  }
  rendergoods(){
    var goodscount=[];
     if(this.state.cangkuname.length <= 0){
       goodscount.push(
         <Picker.Item key={0} color='#999999' label={this.state.noChoseName} value="" />
       )
     }else{
       for(var i=0;i<this.state.cangkuname.length;i++){
         goodscount.push(
            <Picker.Item key={i} color='#999999' label={this.state.cangkuname[i].cangkumingcheng} value={this.state.cangkuname[i].cangkudaihao} />
         );
      }
     }
    return goodscount;
  }
  getCangKu(){
    _that = this;
    this.setState({
      loading: true
    })
    const url=urls+"/index.php/Api/index/cangku?user_token="+this.state.names.user_token;
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
            loading: false
          })
        }
      })
      .then((json) => {
        if(json.state == 'success'){
          console.log(json)
          _that.setState({
            cangkuname: json.data,
            dropdown: json.data[0].cangkudaihao,
            loading: false
          })
        }else if(json.state == 'error'){
          _that.setState({
            loading: false
          })
          if(json.msgcode == '004'){
            _that.refs.toast.show(this.state.message129,3000);
            //alert(this.state.message129)
          }else{
            _that.refs.toast.show(json.message,3000);
            //alert(json.message)
          }
        }
      })
      .catch((error) => {
        _that.setState({
          loading: false
        })
        _that.refs.toast.show(this.state.message130,3000);
        //alert(this.state.message130)
      });
  }
  toPage(){
    if(this.state.dropdown==''){
      alert(this.state.message147)
      return
    }
    if(this.state.cangkuname == ''){
      alert(this.state.message147)
      return
    }
    var pro = [];
    this.state.cangkuname.forEach(val=>{
      pro.push(val.cangkudaihao);
    })
    if(!pro.includes(this.state.dropdown)){
      this.setState({
        dropdown:'',
      })
      alert(this.state.message147)
      return
    }
    switch (this.props.navigation.state.params.typeValue) {
      case '3':
        this.props.navigation.navigate("ChukuD",{cangkudaihao: this.state.dropdown})
        break;
      case '4':
        this.props.navigation.navigate("PandianD",{cangkudaihao: this.state.dropdown})
        break;
      case '41':
        this.props.navigation.navigate("RukuD",{cangkudaihao: this.state.dropdown})
        break;
      case '10':
        this.props.navigation.navigate("RukuGhao",{cangkudaihao: this.state.dropdown})
        break;
      case '11':
        this.props.navigation.navigate("ChukuGhao",{cangkudaihao: this.state.dropdown})
        break;
      case '12':
        this.props.navigation.navigate("PandianS",{cangkudaihao: this.state.dropdown})
        break;
      default:

    }
  }
  // onValueChange = (flag,value) => {
  //   this.setState({
  //     choseValue: value
  //   })
  //   if(flag ==1){
  //       this.setState({
  //         selected:value,
  //       });
  //     }else{
  //       this.setState({
  //         dropdown:value,
  //       });
  //     }
  //     //console.log(value)
  //   };


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
    fontSize: 30,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },
  titleStyles: {
    fontSize: 14,
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
  textStyles:{
    color: '#000000',
    fontSize: 18,
    marginRight: 10,
    flex:0.6,
    textAlign:'left'
  },
  scanStyles:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 40,
    flex:0.2
  },
  inputStyles:{
    backgroundColor: 'white',
    borderRadius: 20,
    height: 36,
    paddingLeft: 20,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    flex:1,
    padding: 0
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
    //justifyContent:'center',
    // height: 216,//Picker 默认高度
    width: 180,
  },
  itempicker:{
    fontSize:19,
    height:161
  }
});
