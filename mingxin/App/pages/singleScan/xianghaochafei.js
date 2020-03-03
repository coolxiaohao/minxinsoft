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
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  ListView,
  Modal,
  Platform,
  BackHandler
} from 'react-native';

import  ImagePicker from 'react-native-image-picker'; //第三方相机



var photoOptions = {

}

import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'
var urls = '';
import Toast from '../../Components/Toast'
const {width,height} = Dimensions.get('window');
import Modals from 'react-native-modal'
var goodsc = [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var nowid;
export default class mingxin extends Component {
  static navigationOptions = {
      headerBackTitle:null,
      headerStyle:{
        height: 40
      },
  };
  constructor(props) {
      super(props);
      this.state = {
        ReceiveCode:'',
        names: '',
        hangshu: 0,
        totalcount: 0,
        saomiaoshu: '',
        kucun: '',
        dataSource: ds.cloneWithRows(goodsc),
        showtiaoma:true,
        loaded:false,
        showshuliang:false,
        totalcounts: 0,
        chayicount: 0,
      };
  }
  getName(val){
    if(val.id==53){
      this.setState({
        cancelName: val.name
      })
    }
    if(val.id==65){
      this.setState({
        sureBtn: val.name
      })
    }
    if(val.id==67){
      this.setState({
        backBtn: val.name
      })
    }
    if(val.id==79){
      this.setState({
        choseImgBtn: val.name
      })
    }
    if(val.id==69){
      this.setState({
        dutiaomaName: val.name
      })
    }
    if(val.id==70){
      this.setState({
        kucunName: val.name
      })
    }
    if(val.id==103){
      this.setState({
        shuliangName: val.name
      })
    }
    if(val.id==72){
      this.setState({
        tiaomaName: val.name
      })
    }
    if(val.id==73){
      this.setState({
        saomiaoName: val.name
      })
    }
    if(val.id==74){
      this.setState({
        caozuoName: val.name
      })
    }
    if(val.id==76){
      this.setState({
        hangshuName: val.name
      })
    }
    if(val.id==77){
      this.setState({
        zongshuName: val.name
      })
    }
    if(val.id==75){
      this.setState({
        shanchuName: val.name
      })
    }
    if(val.id==68){
      this.setState({
        saomaBtn: val.name
      })
    }
    if(val.id==94){
      this.setState({
        photoChoice: val.name
      })
    }
    if(val.id==95){
      this.setState({
        paizhaoName: val.name
      })
    }
    if(val.id==96){
      this.setState({
        chosePhotName: val.name
      })
    }
    if(val.id==97){
      this.setState({
        changSuccessName: val.name
      })
    }
    if(val.id==98){
      this.setState({
        notiaomaName: val.name
      })
    }
    if(val.id==99){
      this.setState({
        saveSuccessName: val.name
      })
    }
    if(val.id==104){
      this.setState({
        unNullName: val.name
      })
    }
    if(val.id==101){
      this.setState({
        saomaSuccessName: val.name
      })
    }
    if(val.id==107){
      this.setState({
        errorMessage1: val.name
      })
    }
    if(val.id==108){
      this.setState({
        errorMessage2: val.name
      })
    }
    if(val.id==73){
      this.setState({
        message73: val.name
      })
    }
    if(val.id==148){
      this.setState({
        message148: val.name
      })
    }
    if(val.id==72){
      this.setState({
        message72: val.name
      })
    }
    if(val.id==114){
      this.setState({
        message114: val.name
      })
    }
    if(val.id==115){
      this.setState({
        message115: val.name
      })
    }
    if(val.id==157){
      this.setState({
        message157: val.name
      })
    }
    if(val.id==160){
      this.setState({
        message160: val.name
      })
    }
    if(val.id==152){
      this.setState({
        message152: val.name
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
    photoOptions = {
      //底部弹出框选项
      title: this.state.photoChoice,
      cancelButtonTitle: this.state.cancelName,
      takePhotoButtonTitle: this.state.paizhaoName,
      chooseFromLibraryButtonTitle: this.state.chosePhotName,
      quality:0.75,
      allowsEditing:true,
      noData:false,
      storageOptions: {
          skipBackup: true,
          path:'images'
      }
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
          console.log(res)
          if(result != null){
            var newArr = []
            res.map((val)=>{
              if(val.pid == 46){
                return newArr.push(val)
              }
              if(val.id==17){
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
        AsyncStorage.getItem('systemDefault',(error,result)=>{
          console.log(JSON.parse(result))
          var res = JSON.parse(result);
          if(result != null){
            this.setState({
              isResaoma: res[0].isResaoma,
            })
          }else{
            this.setState({
              isResaoma: false,
            })
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
        console.log(error)
        return
      }
    })
    goodsc = [];
    this.setState({
      ReceiveCode:'',
      hangshu: 0,
      totalcount: 0,
      kucun: '',
      saomiaoshu:'',
      dataSource: ds.cloneWithRows(goodsc),
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
        <ScrollView scrollEnabled={false} style={{paddingVertical: 0,}}>
          <Text style={styles.nameStyles}>
            {this.state.titleName}
          </Text>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.message148}:</Text>
            <TextInput
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              editable= {this.state.showtiaoma}
              onChangeText={(e) => this.setState({ReceiveCode:e})}
              value={this.state.ReceiveCode}
              onEndEditing={(event) => (
                this.getData(event.nativeEvent.text)
            )}
            />
            <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getData(e)}})}>
              <Image style={{width:18,height:18}} source={{uri:'saomab'}} />
              <Text style={{fontSize: 6,color: '#000000'}} >{this.state.saomaBtn}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dataStyles}>
            <View style={styles.headerStyles}>
              <Text style={{flex:0.8,textAlign:'center',fontSize:12}}>{this.state.message72}</Text>
              <Text style={{flex:0.8,textAlign:'center',fontSize:12}}>{this.state.message114}</Text>
              <Text style={{flex:0.5,textAlign:'center',fontSize:12}}>{this.state.message115}</Text>
              <Text style={{flex:0.5,textAlign:'center',fontSize:12}}>{this.state.message157}</Text>
              <Text style={{flex:0.5,textAlign:'center',fontSize:12}}>{this.state.message73}</Text>
              <Text style={{flex:0.5,textAlign:'center',fontSize:12}}>{this.state.message160}</Text>
            </View>

            <ListView
               dataSource={this.state.dataSource}
               renderRow={this.renderRow.bind(this)}
               enableEmptySections={true}
             />

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
  backBtn(){
    goodsc=[];
    this.setState({
      ReceiveCode:'',
      hangshu: 0,
      totalcount: 0,
      kucun: '',
      saomiaoshu:'',
      dataSource: ds.cloneWithRows(goodsc),
    })
    this.props.navigation.goBack()
  }

  //获取条形码
  getData(e){
    _that = this;
    if (e=='') {return } ;
    if(!this.state.isResaoma){
      var showRe = false;
      goodsc.forEach(val=>{
        if(e == val.tiaoma){
          alert(this.state.message152)
          showRe = true
        }
      })
      if(showRe){
        return
      }
    }

    this.setState({
      loaded:true
    })

    const url= urls + "/index.php/api/index/saoxianghao1?xianghao="+e;
    var jian = 20;
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
          json.data.forEach(val=>{
            let chayi = parseFloat(val.shuliang)-parseFloat(val.shaomiaoshu);
            goodsc.push({"tiaoma":val.huopindaihao,"color":val.yanse,"size":val.chima,"chayishu": parseFloat(chayi).toFixed(2),"saomiaoshu":parseFloat(val.shaomiaoshu).toFixed(2),"zhuangxShu":parseFloat(val.shuliang).toFixed(2)});
          })
         this.setState({
           dataSource: ds.cloneWithRows(goodsc),
           hangshu:goodsc.length,
           kucun:'',
           ReceiveCode:'',
           saomiaoshu:'',
           loaded:false
         });
         //console.error(goodsc);
         this.refs.toast.show(this.state.saomaSuccessName,3000);
         //ToastAndroid.show(this.state.saomaSuccessName,ToastAndroid.SHORT);
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

  //条码信息渲染
   renderRow(rowData:string, sectionID:number,rowID: number){
      //console.error(goodsc);
       return (
         <TouchableHighlight
           style={[styles.countsContainer,{backgroundColor:rowData.isselect,paddingVertical:4}]}
           underlayColor = 'gray'
            >
           <View style={{flexDirection:'row'}}>
             <Text style={{flex:0.8,textAlign:'center',fontSize:10}}>{rowData.tiaoma}</Text>
             <Text style={{flex:0.8,textAlign:'center',fontSize:10}}>{rowData.color}</Text>
             <Text style={{flex:0.5,textAlign:'center',fontSize:10}}>{rowData.size}</Text>
             <Text style={{flex:0.5,textAlign:'center',fontSize:10}}>{rowData.chayishu}</Text>
             <Text style={{flex:0.5,textAlign:'center',fontSize:10}}>{rowData.saomiaoshu}</Text>
             <Text style={{flex:0.5,textAlign:'center',fontSize:10}}>{rowData.zhuangxShu}</Text>
           </View>
         </TouchableHighlight>
       )
   }

}
const styles = StyleSheet.create({
  countStyles:{
    color: '#000000',
    fontSize: 12,
    marginTop: 5,
  },
  choseData:{
    backgroundColor: 'gray'
  },
  dataStyles:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width-10,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth:1,
    borderColor: '#f3f3f3'
  },
  headerStyles:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#329dfd',
  },
  countsContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 1,
    backgroundColor: 'white',
    width: width-20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  contentContainer:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 1,
    backgroundColor: 'white',
    width: width,
  },
  scanStyles:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
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
    fontSize: 16,
    marginRight: 10,
    flex:0.6,
    textAlign:'right'
  },
  inputStyles:{
    width: 180,
    backgroundColor: 'white',
    borderRadius: 16,
    height: 30,
    paddingLeft: 12,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    fontSize: 12,
    paddingVertical:0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  nameStyles: {
    fontSize: 24,
    textAlign: 'center',
    margin: 0,
    color: '#000000',
    marginTop: 10
  },
  titleStyles: {
    fontSize: 16,
    textAlign: 'center',
    margin: 0,
    color: '#000000'
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:5
  },
  buttonStyles: {
    backgroundColor: 'white',
    color: '#000000',
    fontSize: 12,
    fontWeight: "100",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c8c8c8'
  },
});
