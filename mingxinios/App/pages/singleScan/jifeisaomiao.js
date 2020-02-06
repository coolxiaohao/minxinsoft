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
var imgPickers = [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var nowid;
var picid;
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
        ReceiveGongHao:'',
        ReceiveCode:'',
        names: '',
        hangshu: 0,
        totalcount: 0,
        saomiaoshu: '',
        shuliang: '',
        dataSource: ds.cloneWithRows(goodsc),
        imgSource:ds.cloneWithRows(imgPickers),
        showtiaoma:true,
        showgonghao: true,
        loaded:false,
        showshuliang:false,
        userName:'',
        showPic:false
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
    if(val.id==69){
      this.setState({
        dutiaomaName: val.name
      })
    }
    if(val.id==119){
      this.setState({
        shuliangName: val.name
      })
    }
    if(val.id==117){
      this.setState({
        xuName: val.name
      })
    }
    if(val.id==72){
      this.setState({
        tiaomaName: val.name
      })
    }
    if(val.id==74){
      this.setState({
        caozuoName: val.name
      })
    }
    if(val.id==75){
      this.setState({
        deleteName: val.name
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
    if(val.id==79){
      this.setState({
        uploadPicBtn: val.name
      })
    }
    if(val.id==65){
      this.setState({
        saveBtn: val.name
      })
    }
    if(val.id==67){
      this.setState({
        backBtn: val.name
      })
    }
    if(val.id==98){
      this.setState({  //不存在此条码!
        errorMessage: val.name
      })
    }
    if(val.id==111){
      this.setState({  // 保存失败
        errorMessages: val.name
      })
    }
    if(val.id==120){
      this.setState({  // 此员工号不存在
        errorMessagess: val.name
      })
    }
    if(val.id==121){
      this.setState({  // 数量不能为空
        errorMessageNames: val.name
      })
    }
    if(val.id==118){ // 该员工已离职
      this.setState({
        errorMessageName: val.name
      })
    }
    if(val.id==99){ // 保存成功
      this.setState({
        successMessage: val.name
      })
    }
    if(val.id==97){ // 修改成功
      this.setState({
        successMessageName: val.name
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
    if(val.id==53){
      this.setState({
        cancelName: val.name
      })
    }
    if(val.id==73){
      this.setState({
        message73: val.name
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
    if(val.id==150){
      this.setState({
        message150: val.name
      })
    }
    if(val.id==151){
      this.setState({
        message151: val.name
      })
    }
    if(val.id==152){
      this.setState({
        message152: val.name
      })
    }
    if(val.id==153){
      this.setState({
        message153: val.name
      })
    }
    if(val.id==162){
      this.setState({
        message162: val.name
      })
    }
    if(val.id==163){
      this.setState({
        message163: val.name
      })
    }
    if(val.id==294){
      this.setState({
        message172: val.name
      })
    }
    if(val.id==296){
      this.setState({
        message174: val.name
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
          //console.log(res)
          if(result != null){
            var newArr = []
            res.map((val)=>{
              if(val.pid == 46){
                return newArr.push(val)
              }
              if(val.id == 6){
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
              choseAll: res[0].choseAll,
              isShuliang: res[0].isShuliang,
              shuLiang: res[0].shuLiang,
              hangShu:res[0].hangShu,
              isHangshu: res[0].isHangshu,
              isResaoma: res[0].isResaoma,
              isChaoshu: res[0].isChaoshu,
              saveYuan: res[0].saveYuan,
              showgonghao: !res[0].saveYuan,
            })
            if(res[0].saveYuan){
              this.getGongHaoData(this.state.names.userno)
            }
          }else{
            this.setState({
              choseAll: true,
              isShuliang: false,
              shuLiang: 0,
              hangShu: 0,
              isHangshu: false,
              isResaoma: false,
              isChaoshu: false,
              saveYuan: false,
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
    imgPickers = [];
    this.setState({
      ReceiveGongHao:'',
      ReceiveCode:'',
      hangshu: 0,
      totalcount: 0,
      shuliang: '',
      saomiaoshu:'',
      dataSource: ds.cloneWithRows(goodsc),
      imgSource:ds.cloneWithRows(imgPickers),
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
    if(this.state.showPic){
      let picHeight = (width * parseInt(imgPickers[picid].height)) / parseInt(imgPickers[picid].width)
      return(
        <Modal
             animationType='fade'
             transparent={true}
             visible={true}
             onShow={() => {}}
             onRequestClose={() => {}} >
              <ScrollView style={{marginTop: Platform.OS == 'ios' ? 20 : 0}}>
                <TouchableOpacity onPress={()=>this.setState({showPic:false})} activeOpacity={1}>
                  <Image source={{uri: imgPickers[picid].uri}} style={{width:width,height:picHeight,alignSelf:'center',marginBottom: 10}}></Image>
                </TouchableOpacity>
              </ScrollView>
          </Modal>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={false} style={{paddingVertical: 0,flex:1}}>
          <Text style={styles.nameStyles}>
            {this.state.titleName}
          </Text>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.saoGongHName}:</Text>
            <TextInput
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              editable= {this.state.showgonghao}
              onChangeText={(e) => this.setState({ReceiveGongHao:e})}
              value={this.state.saveYuan ? this.state.names.userno : this.state.ReceiveGongHao}
              onEndEditing={(event) => (
                this.getGongHaoData(event.nativeEvent.text)
            )}
            />
            {
              this.state.saveYuan ?
              <Text style={{width:32,height:36}}></Text> :
              <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getGongHaoData(e)}})}>
                <Image style={{width:18,height:18}} source={{uri:'saomab'}} />
                <Text style={{fontSize: 6,color: '#000000'}} >{this.state.saoyiSName}</Text>
              </TouchableOpacity>
            }
          </View>
          <Text style={{color: '#000000',fontSize: 16,flex: 0.6,textAlign:'center',}}>{this.state.saveYuan ? this.state.names.username : this.state.userName}</Text>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.dutiaomaName}:</Text>
            <TextInput
                style={styles.inputStyles}
                underlineColorAndroid="transparent"
                editable= {this.state.showtiaoma}
                onChangeText={(e) => this.setState({ReceiveCode:e})}
                value={this.state.ReceiveCode}
                onEndEditing={(event) => (
                  this.getTiaoMaData(event.nativeEvent.text)
              )}
            />
            <TouchableOpacity style={styles.scanStyles} onPress={()=>this.props.navigation.navigate('Saoma',{callBack:(e)=>{this.getTiaoMaData(e)}})}>
              <Image style={{width:18,height:18}} source={{uri:'saomab'}} />
              <Text style={{fontSize: 6,color: '#000000'}} >{this.state.saoyiSName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formStyles}>
            <Text style={styles.textStyles}>{this.state.shuliangName}:</Text>
            <TextInput
              editable={this.state.showshuliang}
              style={styles.inputStyles}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
              onChangeText={(e) => this.setState({saomiaoshu:e})}
              value={`${this.state.saomiaoshu}`}
              onEndEditing={(event) => (
                this.changekucun(event.nativeEvent.text)
              )}
            />
            <View style={styles.scanStyles}>

            </View>
          </View>
          <View style={styles.dataStyles}>
            <View style={styles.headerStyles}>
            <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.xuName}</Text>
              <Text style={{flex:1,textAlign:'center',fontSize:12}}>{this.state.tiaomaName}</Text>
              <Text style={{flex:1,textAlign:'center',fontSize:12}}>{this.state.message73}</Text>
              <Text style={{flex:1,textAlign:'center',fontSize:12}}>{this.state.shuliangName}</Text>
              <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.caozuoName}</Text>
            </View>

            <ListView
               dataSource={this.state.dataSource}
               renderRow={this.renderRow.bind(this)}
               enableEmptySections={true}
             />

          </View>
          <View style={styles.rowStyles}>
             <Text style={styles.countStyles}>{this.state.hangshuName}: {this.state.hangshu}</Text>
             <Text style={styles.countStyles}>{this.state.zongshuName}: {this.state.totalcount}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:width}}>
            <ListView
               dataSource={this.state.imgSource}
               renderRow={this.saveImg.bind(this)}
               horizontal={true}
               enableEmptySections={true}
             />
          </View>

          <View style={styles.rowStyles}>
            <Text style={styles.buttonStyles} onPress={()=>{this.cameraAction()}}>{this.state.uploadPicBtn}</Text>
            <Text style={styles.buttonStyles} onPress={()=>{this.Save()}}>{this.state.saveBtn}</Text>
            <Text style={styles.buttonStyles} onPress={()=>{this.backBtn()}}>{this.state.backBtn}</Text>
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
    imgPickers=[];
    this.setState({
      ReceiveCode:'',
      ReceiveGongHao: '',
      hangshu: 0,
      totalcount: 0,
      shuliang: '',
      saomiaoshu:'',
      dataSource: ds.cloneWithRows(goodsc),
      imgSource:ds.cloneWithRows(imgPickers),
    })
    this.props.navigation.goBack()
  }

  //获取员工号
  getGongHaoData(e){
    if(e==''){
      this.setState({
        userName: ''
      })
      return
    }
    this.setState({
      ReceiveGongHao: e,
      userName: ''
    })
    _that = this;
    //alert(e);
    //alert(this.props.navigation.state.params.cangkudaihao);
    this.setState({
      loaded:true
    })

    const url= urls + "/index.php/api/index/member_saoma?yuangonghao="+e
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
        if (json.state === 'success') {
          console.log(json.data);
           this.setState({
             loaded:false
           });
           if(json.data.r08a029 == 1){
             this.refs.toast.show(this.state.errorMessageName,3000);
             //alert(this.state.errorMessageName)
             _that.setState({
               ReceiveGongHao: ''
             })
           }else{
             _that.setState({
               userName: json.data.r08a002
             })
           }
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
  //获取条码
  getTiaoMaData(e){
    this.setState({
      ReceiveCode: e
    })
    if(e==''){
      return
    }
    if(this.state.userName==''){
      alert(this.state.message172)
      this.setState({
        ReceiveCode: ''
      })
      return
    }
    var counts = this.state.totalcount + 1;
    if(this.state.isShuliang && parseFloat(this.state.shuLiang) < counts){
      alert(this.state.message150)
      return
    }

    if(this.state.isHangshu && this.state.hangShu < this.state.hangshu + 1){
      alert(this.state.message151)
      return
    }
    if(this.state.isResaoma){
      var showRe =false;
      goodsc.forEach((val,index)=>{
        if(e.toLowerCase() == val.tiaoma.toLowerCase()){
          if(parseFloat(val.totalShuL).toFixed(2) < parseFloat(val.saomiaoshu).toFixed(2)+1){
            alert(this.state.message153)
            showRe = true
            return
          }
          val.saomiaoshu++
          this.setState({
            dataSource: ds.cloneWithRows(goodsc),
            hangshu:goodsc.length,
            shuliang:'',
            ReceiveCode:'',
            saomiaoshu:'',
          })
          this.countsadd()
          showRe = true
          return
        }
      })
      if(showRe) {return }
    }else{
      var showRe =false;
      goodsc.forEach((val,index)=>{
        if(e.toLowerCase() == val.tiaoma.toLowerCase()){
          showRe = true
          alert(this.state.message152)
          return
        }
      })
      if(showRe) {return }
    }
    _that = this;
    this.setState({
      loaded:true
    })
    const url= urls + "/index.php/api/index/jifeisaoma?tiaoxingma="+e+"&yuangonghao="+this.state.ReceiveGongHao;
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
          loaded:false
        })
        }
      })
      .then((json) => {
        console.log(json)
        if (json.state === 'success') {

           goodsc.push({"tiaoma":json.data.r49a007,"saomiaoshu":json.data.r50am032,"kesaomiaoshu":json.data.r50am032,"totalShuL":json.data.r49a006});
           _that.setState({
             dataSource: ds.cloneWithRows(goodsc),
             hangshu:goodsc.length,
             shuliang:'',
             ReceiveCode:'',
             saomiaoshu:'',
             loaded:false
           });
           console.log(goodsc);
           _that.countsadd();
        }else if(json.state == 'error'){
          this.setState({
            loaded:false
          })
          if(json.msgcode == '004'){
            this.refs.toast.show(this.state.message129,3000);
            //alert(this.state.message129)
          }else if(json.msgcode == '006'){
            this.refs.toast.show(this.state.message174,3000);
            //alert('该数据为空')
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
  //修改库存
  changekucun(e){
    if(e==''){
      alert(this.state.errorMessageNames)
      return
    }
    var counts = this.state.totalcount + parseFloat(e).toFixed(2) - parseFloat(goodsc[nowid].saomiaoshu).toFixed(2);
    if(this.state.isShuliang && this.state.shuLiang < counts){
      alert(this.state.message150)
      return
    }
    if(e > parseInt(goodsc[nowid].kesaomiaoshu)){
      alert(this.state.message153)
      return
    }
    //console.log(typeof this.state.saomiaoshu)
    //console.log(typeof parseInt(this.state.saomiaoshu))
    goodsc[nowid].saomiaoshu = parseFloat(e).toFixed(2);
    this.setState({
      showtiaoma:true,
      saomiaoshu:'',
      ReceiveCode:'',
      kucun:'',
      dataSource: ds.cloneWithRows(goodsc),
    })
    this.countsadd();
    this.refs.toast.show(this.state.successMessageName,3000);
    //ToastAndroid.show(this.state.successMessageName,ToastAndroid.SHORT);
  }
  _editRow(rowData:string,rowID: number){
    this.setState({
      showshuliang:true,
    })
    nowid = rowID;
    //console.error(nowid);
    for (var i = 0; i < goodsc.length; i++) {
      goodsc[i].isselect = 'white';
    }
    //console.error(goodsc);
    goodsc[rowID].isselect = '#87caf5';
    //console.error(goodsc);
    this.setState({
      showtiaoma:true,
      ReceiveCode:rowData.tiaoma,
      kucun:rowData.kucun,
      saomiaoshu:rowData.saomiaoshu,
      changeshuliang:'',
      showrow:rowID,
      dataSource: ds.cloneWithRows(goodsc)

    })
  }
  //总数计算
  countsadd(){
    var counts = 0;
    if (goodsc.length > 0) {
      goodsc.forEach(val=>{
        counts += parseFloat(val.saomiaoshu)
      })
    }
    this.setState({
      totalcount: parseFloat(counts).toFixed(2),
    })
  }

  //条码信息渲染
   renderRow(rowData:string, sectionID:number,rowID: number){
      //console.error(goodsc);
       return (
         <TouchableHighlight
           style={[styles.countsContainer,{backgroundColor:rowData.isselect,paddingVertical:4}]}
           underlayColor = 'gray'
           onPress={()=>{
             this._editRow(rowData,rowID);
           }}
            >
           <View style={{flexDirection:'row'}}>
             <Text style={{flex:0.6,textAlign:'center',fontSize:10}}>{rowID}</Text>
             <Text style={{flex:1,textAlign:'center',fontSize:10}}>{rowData.tiaoma}</Text>
             <Text style={{flex:1,textAlign:'center',fontSize:10}}>{rowData.saomiaoshu}</Text>
             <Text style={{flex:1,textAlign:'center',fontSize:10}}>{rowData.totalShuL}</Text>
             <Text
               style={{flex:0.6,textAlign:'center',backgroundColor:'#87caf5',fontSize:10}}
                onPress={()=>{
                delete goodsc[rowID];
                var goodds = [];
                for (var i = 0; i < goodsc.length; i++) {
                  if (goodsc[i] != null) {
                    goodds.push(goodsc[i]);
                  }
                }
                goodsc = goodds;
                //console.error(goodsc);
                this.setState({
                  hangshu:goodsc.length,
                  saomiaoshu:'',
                  ReceiveCode:'',
                  kucun:'',
                  dataSource: ds.cloneWithRows(goodsc),
                })
                this.countsadd();
                //console.error(goodsc)
              }}>{this.state.deleteName}</Text>
           </View>
         </TouchableHighlight>
       )
   }

   //照片上传
     cameraAction(){
              ImagePicker.showImagePicker(photoOptions,(response) =>{
                if (response.didCancel){
                    return
                }
               imgPickers.push({"uri":response.uri,"data":response.data,height: response.height,width: response.width})
               this.setState({
                 imgSource:ds.cloneWithRows(imgPickers)
               })
               //console.error(this.state.imgPicker);
              })
         }
     saveImg(rowData:string, sectionID:number,rowID: number){
         return (
             <View style={{alignItems:'center',marginBottom:5,}}>
               <TouchableOpacity onPress={()=>{picid = rowID;this.setState({showPic: true})}}>
                 <Image source={{uri: rowData.uri}} style={{width:50,height:50,marginRight:10,marginBottom:4,marginLeft:10}}/>
               </TouchableOpacity>
               <Text style={{fontSize:10,paddingVertical: 3,paddingHorizontal:6,backgroundColor:'#87caf5',borderRadius:6}}
                 onPress={()=>{
                   //console.error(imgPickers)
                 delete imgPickers[rowID];
                 var imgPicker = [];
                 for (var i = 0; i < imgPickers.length; i++) {
                   if (imgPickers[i] != null) {
                     imgPicker.push(imgPickers[i]);
                   }
                 }
                 imgPickers = imgPicker;
                 this.setState({
                   imgSource:ds.cloneWithRows(imgPickers)
                 })
                 //console.error(imgPickers)
               }}
                 >{this.state.deleteName}</Text>
             </View>
         )
     }


     //保存
     Save(){
       if(this.state.ReceiveGongHao==''){
         alert(this.state.message162)
         return
       }
       if(goodsc.length<=0) {
         alert(this.state.message163)
         return
       }
       _that = this;
       const url= urls + "/index.php/api/index/w_jifei";
       //console.error(this.state.names.user_token)
       this.setState({
         loaded:true
       })
       var timestamp = Date.parse(new Date())/1000;
       //console.log(imgPickers)
       return Promise.race([
          fetch(url, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
             },
             body: 'shuzu='+JSON.stringify(goodsc)+'&saomiaoshijian='+timestamp+'&zhilingdanhao='+this.props.navigation.state.params.dingdanhao+'&imgs='+JSON.stringify(imgPickers)+"&yuangonghao="+this.state.ReceiveGongHao,
           }),
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
               goodsc=[];
               imgPickers=[];
               this.setState({
                 ReceiveCode:'',
                 hangshu: 0,
                 totalcount: 0,
                 kucun: '',
                 saomiaoshu:'',
                 dataSource: ds.cloneWithRows(goodsc),
                 imgSource:ds.cloneWithRows(imgPickers),
               })
               this.setState({
                loaded:false
               })
               this.refs.toast.show(this.state.successMessage,3000);
               //ToastAndroid.show(this.state.successMessage,ToastAndroid.SHORT);
            }else if(json.state == 'error'){
              this.setState({
                loaded:false
              })
              if(json.msgcode == '001'){
                this.refs.toast.show(this.state.errorMessages,3000);
                //alert(this.state.errorMessages)
              }else{
                this.refs.toast.show(json.message,3000);
                //alert(json.message)
              }
            }
           //this.props.navigation.navigate('Test',{value:json.data})
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
  countStyles:{
    color: '#000000',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10
  },
  choseData:{
    backgroundColor: 'gray'
  },
  dataStyles:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width-20,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft:10,
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
    flex: 0.2
  },
  formStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width - 40,
    marginVertical: 2,
  },
  textStyles:{
    color: '#000000',
    fontSize: 16,
    marginRight: 10,
    flex: 0.6,
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
