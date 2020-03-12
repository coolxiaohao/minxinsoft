import React, {Component} from 'react';
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

import ImagePicker from 'react-native-image-picker'; //第三方相机


var photoOptions = {}

import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'

var urls = '';
import Toast from '../../Components/Toast'

const {width, height} = Dimensions.get('window');
import Modals from 'react-native-modal'

var goodsc = [];
var imgPickers = [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var nowid;
var picid;
export default class mingxin extends Component {
    static navigationOptions = {
        headerBackTitle: null,
        headerStyle: {
            height: 40
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            lastPressed: 0,
            huoquValue: '',
            ReceiveCode: '',
            names: '',
            hangshu: 0,
            totalcount: 0,
            saomiaoshu: '',
            kucun: '',
            dataSource: ds.cloneWithRows(goodsc),
            imgSource: ds.cloneWithRows(imgPickers),
            showtiaoma: true,
            loaded: false,
            showshuliang: false,
            setUpLan: false,
            titleName: '',
            sureBtn: '',
            backBtn: '',
            choseImgBtn: '',
            dutiaomaName: '',
            kucunName: '',
            shuliangName: '',
            tiaomaName: '',
            saomiaoName: '',
            caozuoName: '',
            hangshuName: '',
            zongshuName: '',
            shanchuName: '',
            saomaBtn: '',
            photoChoice: '',
            paizhaoName: '',
            chosePhotName: '',
            changSuccessName: '',
            notiaomaName: '',
            saveSuccessName: '',
            unNullName: '',
            saomaSuccessName: "",
            cancelName: '',
            showPic: false
        };
    }

    getName(val) {
        //取消
        if (val.id == 53) {
            this.setState({
                cancelName: val.name
            })
        }
        //保存
        if (val.id == 65) {
            this.setState({
                sureBtn: val.name
            })
        }
        //返回
        if (val.id == 67) {
            this.setState({
                backBtn: val.name
            })
        }
        //选择图片
        if (val.id == 79) {
            this.setState({
                choseImgBtn: val.name
            })
        }
        //读条码
        if (val.id == 69) {
            this.setState({
                dutiaomaName: val.name
            })
        }
        //库存
        if (val.id == 70) {
            this.setState({
                kucunName: val.name
            })
        }
        //入库数量
        if (val.id == 71) {
            this.setState({
                shuliangName: val.name
            })
        }
        //条码
        if (val.id == 72) {
            this.setState({
                tiaomaName: val.name
            })
        }
        //扫描数
        if (val.id == 73) {
            this.setState({
                saomiaoName: val.name
            })
        }
        //操作
        if (val.id == 74) {
            this.setState({
                caozuoName: val.name
            })
        }
        //行数
        if (val.id == 76) {
            this.setState({
                hangshuName: val.name
            })
        }
        //总数
        if (val.id == 77) {
            this.setState({
                zongshuName: val.name
            })
        }
        //删除
        if (val.id == 75) {
            this.setState({
                shanchuName: val.name
            })
        }
        //扫一扫
        if (val.id == 68) {
            this.setState({
                saomaBtn: val.name
            })
        }
        //请选择
        if (val.id == 94) {
            this.setState({
                photoChoice: val.name
            })
        }
        //拍照
        if (val.id == 95) {
            this.setState({
                paizhaoName: val.name
            })
        }
        //选择相册
        if (val.id == 96) {
            this.setState({
                chosePhotName: val.name
            })
        }
        //修改成功
        if (val.id == 97) {
            this.setState({
                changSuccessName: val.name
            })
        }
        //不存在此条码!
        if (val.id == 98) {
            this.setState({
                notiaomaName: val.name
            })
        }
        //保存成功
        if (val.id == 99) {
            this.setState({
                saveSuccessName: val.name
            })
        }
        //入库数量不能为空
        if (val.id == 100) {
            this.setState({
                unNullName: val.name
            })
        }
        //扫码成功
        if (val.id == 101) {
            this.setState({
                saomaSuccessName: val.name
            })
        }
        //保存失败
        if (val.id == 111) {
            this.setState({
                message111: val.name
            })
        }
        //数据提取失败
        if (val.id == 129) {
            this.setState({
                message129: val.name
            })
        }
        //网络错误或服务器正在维护
        if (val.id == 130) {
            this.setState({
                message130: val.name
            })
        }
        //总数量不可大于校验上传总数量
        if (val.id == 150) {
            this.setState({
                message150: val.name
            })
        }
        //行数不可大于校验上传行数
        if (val.id == 151) {
            this.setState({
                message151: val.name
            })
        }
        //不可重复扫码
        if (val.id == 152) {
            this.setState({
                message152: val.name
            })
        }
        //件数
        if(val.id==156){
          this.setState({
            message156: val.name
          })
        }
        //差异数
        if(val.id==155){
          this.setState({
            message155: val.name
          })
        }
        //不可超单据数
        if(val.id==158){
          this.setState({
            message158: val.name
          })
        }
        //您还未对数据处理过，不能保存!
        if (val.id == 163) {
            this.setState({
                message163: val.name
            })
        }
        if(val.id==342){
            this.setState({
                message1002: val.name
            })
        }
        if(val.id==343){
            this.setState({
                message1003: val.name
            })
        }
        if(val.id==344){
            this.setState({
                message1004: val.name
            })
        }
        if(val.id==345){
            this.setState({
                message1005: val.name
            })
        }
        photoOptions = {
            //底部弹出框选项
            title: this.state.photoChoice,
            cancelButtonTitle: this.state.cancelName,
            takePhotoButtonTitle: this.state.paizhaoName,
            chooseFromLibraryButtonTitle: this.state.chosePhotName,
            quality: 0.75,
            allowsEditing: true,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
    }

    read() {
        AsyncStorage.getItem('userInfo', (error, result) => {
            if (!error) {
                this.setState({
                    names: JSON.parse(result)
                })
                //console.error(this.state.names.user_token)
                //this.state.names = JSON.parse(result)
            }
        })
        AsyncStorage.getItem('langArr', (error, result) => {
            var res = JSON.parse(result)
            //console.log(res)
            if (result != null) {
                var newArr = []
                res.map((val) => {
                    if (val.pid == 46) {
                        return newArr.push(val)
                    }
                    if (val.id == 41) {
                        this.setState({
                            titleName: val.name
                        })
                    }
                })
                //console.log(newArr)
                newArr.forEach((val, index) => {
                    this.getName(val)
                })
            } else {
                console.log(error)
            }
        })
        AsyncStorage.getItem('systemDefault', (error, result) => {
            console.log(JSON.parse(result))
            var res = JSON.parse(result);
            if (result != null) {
                this.setState({
                    choseAll: res[0].choseAll,
                    isShuliang: res[0].isShuliang,
                    shuLiang: res[0].shuLiang,
                    hangShu: res[0].hangShu,
                    isHangshu: res[0].isHangshu,
                    isResaoma: res[0].isResaoma,
                    isChaoshu: res[0].isChaoshu,
                    isChaoDjs: res[0].isChaoDjs,
                    ishuoqu: res[0].ishuoqu,
                    ishuoquK: res[0].ishuoquK,
                })
            } else {
                this.setState({
                    choseAll: true,
                    isShuliang: false,
                    shuLiang: 0,
                    hangShu: 0,
                    isHangshu: false,
                    isResaoma: false,
                    isChaoshu: false,
                    isChaoDjs: false,
                    ishuoqu: false,
                    ishuoquK: false,
                })
            }
        })
    }

    componentDidMount() {
        AsyncStorage.getItem('dataBase', (error, result) => {
            var res = JSON.parse(result)
            console.log(res)
            if (res != null) {
                urls = 'http://' + res[0].ipValue + ':' + res[0].serviceportValue
            } else {
                console.log(error)
                return
            }
        })
        // goodsc = [];
        goodsc = this.props.navigation.state.params.goodsc;
        imgPickers = [];
        this.setState({
            ReceiveCode: '',
            hangshu: 0,
            totalcount: 0,
            kucun: '',
            saomiaoshu: '',
            dataSource: ds.cloneWithRows(goodsc),
            imgSource: ds.cloneWithRows(imgPickers),
        })
        this.read();
    }

    componentWillMount() {
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
        if (this.state.showPic) {
            let picHeight = (width * parseInt(imgPickers[picid].height)) / parseInt(imgPickers[picid].width)
            return (
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={true}
                    onShow={() => {
                    }}
                    onRequestClose={() => {
                    }}>
                    <ScrollView style={{marginTop: Platform.OS == 'ios' ? 20 : 0}}>
                        <TouchableOpacity onPress={() => this.setState({showPic: false})} activeOpacity={1}>
                            <Image source={{uri: imgPickers[picid].uri}} style={{
                                width: width,
                                height: picHeight,
                                alignSelf: 'center',
                                marginBottom: 10
                            }}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={false} style={{paddingVertical: 0,}}>
                    <Text style={styles.nameStyles}>
                        {this.state.titleName}
                    </Text>
                    <View style={styles.formStyles}>
                        <Text style={styles.textStyles}>{this.state.message1002}:</Text>
                        <TextInput
                            style={styles.inputStyles}
                            underlineColorAndroid="transparent"
                            editable={this.state.showtiaoma}
                            onChangeText={(e) => this.setState({huoquValue: e})}
                            value={this.state.huoquValue}
                            onEndEditing={(event) => (
                                this.getDataH(event.nativeEvent.text)
                            )}
                        />
                        <TouchableOpacity style={styles.scanStyles}
                                          onPress={() => this.props.navigation.navigate('Saoma', {
                                              callBack: (e) => {
                                                  this.getDataH(e)
                                              }
                                          })}>
                            <Image style={{width: 18, height: 18}} source={{uri: 'saomab'}}/>
                            <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saomaBtn}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formStyles}>
                        <Text style={styles.textStyles}>{this.state.dutiaomaName}:</Text>
                        <TextInput
                            style={styles.inputStyles}
                            underlineColorAndroid="transparent"
                            editable={this.state.showtiaoma}
                            onChangeText={(e) => this.setState({ReceiveCode: e})}
                            value={this.state.ReceiveCode}
                            onEndEditing={(event) => (
                                this.getData(event.nativeEvent.text)
                            )}
                        />
                        <TouchableOpacity style={styles.scanStyles}
                                          onPress={() => this.props.navigation.navigate('Saoma', {
                                              callBack: (e) => {
                                                  this.getData(e)
                                              }
                                          })}>
                            <Image style={{width: 18, height: 18}} source={{uri: 'saomab'}}/>
                            <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saomaBtn}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formStyles}>
                        <Text style={styles.textStyles}>{this.state.kucunName}:</Text>
                        <TextInput
                            style={styles.inputStyles}
                            underlineColorAndroid="transparent"
                            value={this.state.kucun}
                            editable={false}
                        />
                        <View style={styles.scanStyles}>

                        </View>
                    </View>
                    <View style={styles.formStyles}>
                        <Text style={styles.textStyles}>{this.state.shuliangName}:</Text>
                        <TextInput
                            editable={this.state.showshuliang}
                            style={styles.inputStyles}
                            underlineColorAndroid="transparent"
                            keyboardType='numeric'
                            onChangeText={(e) => this.setState({saomiaoshu: e})}
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
                          <Text style={{flex:1,textAlign:'center',fontSize:12}}>{this.state.tiaomaName}</Text>
                          <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.message155}</Text>
                          <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.saomiaoName}</Text>
                          <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.message156}</Text>
                          <Text style={{flex:0.4,textAlign:'center',fontSize:12}}>{this.state.caozuoName}</Text>
                        </View>

                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                            pageSize={5}
                            initialListSize={5}
                            style={{height:100}}
                        />
                    </View>
                    <View style={styles.rowStyles}>
                        <Text style={styles.countStyles}>{this.state.hangshuName}: {this.state.hangshu}</Text>
                        <Text style={styles.countStyles}>{this.state.zongshuName}: {this.state.totalcount}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: width
                    }}>
                        <ListView
                            dataSource={this.state.imgSource}
                            renderRow={this.saveImg.bind(this)}
                            horizontal={true}
                            enableEmptySections={true}
                        />
                    </View>

                    <View style={styles.rowStyles}>
                        <Text style={styles.buttonStyles} onPress={() => {
                            this.cameraAction()
                        }}>{this.state.choseImgBtn}</Text>
                        <Text style={styles.buttonStyles} onPress={() => {
                            if (this.state.lastPressed && this.state.lastPressed + 500 >= Date.now()){
                                return ;
                            }
                            this.setState({
                                lastPressed: Date.now(),
                            })
                            this.Save()
                        }}>{this.state.sureBtn}</Text>
                        <Text style={styles.buttonStyles} onPress={() => {
                            this.backBtn()
                        }}>{this.state.backBtn}</Text>
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
                    onBackButtonPress={() => this.setState({loaded: false})}
                    backdropOpacity={0.5}
                    style={{margin: 0, padding: 0}}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        <View style={{
                            width: 100,
                            height: 100,
                            backgroundColor: '#ffffff',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={loadingImage}
                                   style={{width: 30, height: 30, alignSelf: 'center', marginBottom: 10}}></Image>
                            <Text>Loading...</Text>
                        </View>
                    </View>
                </Modals>
                <Toast ref="toast" position='bottom'/>
            </View>
        );
    }

    backBtn() {
        goodsc = [];
        imgPickers = [];
        this.setState({
            ReceiveCode: '',
            hangshu: 0,
            totalcount: 0,
            kucun: '',
            saomiaoshu: '',
            dataSource: ds.cloneWithRows(goodsc),
            imgSource: ds.cloneWithRows(imgPickers),
        })
        this.props.navigation.goBack()
    }

    //获取货区信息
    getDataH(e) {
        this.setState({
            ReceiveCode: '',
            kucun: '',
            saomiaoshu: '',
            showtiaoma: true
        })
        if (e == '') {
            return
        }
        const url = urls + "/api/index/checkhuoqu?cangkudaihao=" + this.props.navigation.state.params.cangkudaihao + "&huoqudaihao=" + e;
        console.log(url)
        return Promise.race([
            fetch(url),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('Network request timeout!')), 10000)
            })])
            .then((response) => {
                if (response.ok) {
                    //alert(e);
                    return response.json();
                } else {
                    this.setState({
                        loaded: false
                    })
                }
            })
            .then((json) => {
                if (json.state === 'success') {
                    this.setState({
                        huoquValue: e
                    })
                    this.refs.toast.show(this.state.saomaSuccessName, 3000);
                    //ToastAndroid.show(this.state.saomaSuccessName,ToastAndroid.SHORT);
                } else if (json.state == 'error') {
                    this.setState({
                        loaded: false,
                        huoquValue: ''
                    })
                    if (json.msgcode == '002') {
                        this.refs.toast.show(this.state.message1003, 3000);
                        //alert(this.state.message129)
                    } else {
                        this.refs.toast.show(json.message, 3000);
                        //alert(json.message)
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    loaded: false
                })
                this.refs.toast.show(this.state.message130, 3000);
                //alert(this.state.message130)
            });

    }

    //获取条形码
    getData(e) {
        _that = this;
        if (e == '') {
            return
        }
        ;
        if (this.state.ishuoqu && this.state.huoquValue == '') {
            this.setState({
                ReceiveCode: '',
            })
            alert(this.state.message1004)
            return
        }
        var counts = this.state.totalcount + 1;
        if (this.state.isShuliang && this.state.shuLiang < counts) {
            alert(this.state.message150)
            return
        }
        if (this.state.isHangshu && this.state.hangShu < this.state.hangshu + 1) {
            alert(this.state.message151)
            return
        }
        if (this.state.isResaoma) {
            var showRe = false;
            goodsc.forEach((val, index) => {
                if (e.toLowerCase() == val.tiaoma.toLowerCase() && this.state.huoquValue == val.huoqu) {
                    val.saomiaoshu++
                    this.setState({
                        dataSource: ds.cloneWithRows(goodsc),
                        hangshu: goodsc.length,
                        kucun: val.kucun,
                        ReceiveCode: e,
                        saomiaoshu: val.saomiaoshu,
                        showshuliang: true,
                        showtiaoma: true,
                    })
                    this.countsadd()
                    showRe = true
                    return
                }
            })
            if (showRe) {
                return
            }
        } else {
            var showRe = false;
            goodsc.forEach((val, index) => {
                if (e.toLowerCase() == val.tiaoma.toLowerCase() && this.state.huoquValue == val.huoqu) {
                    nowid = index
                    showRe = true
                    this.setState({
                        showtiaoma: true,
                        kucun: '',
                        ReceiveCode: e,
                        saomiaoshu: '',
                        showshuliang: false,
                    })
                    alert(this.state.message152)
                    return
                }
            })
            if (showRe) {
                return
            }
        }
        //console.log(goodsc)
        //alert(e);
        //alert(this.props.navigation.state.params.cangkudaihao);
        this.setState({
            loaded: true
        })

        const url = urls + "/index.php/api/index/saoma1?cangkudaihao=" + this.props.navigation.state.params.cangkudaihao + "&tiaoxingma=" + e + "&huoqu=" + this.state.huoquValue + "&huoqukongbai=" + this.state.ishuoqu + "&checkhuoqukucun=" + this.state.ishuoquK;

        return Promise.race([
            fetch(url),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('Network request timeout!')), 10000)
            })])
            .then((response) => {
                //alert(response);
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({
                        loaded: false
                    })
                }
            })
            .then((json) => {
                if (json.state === 'success') {
                    // goodsc.push({
                    //     "tiaoma": e,
                    //     "kucun": json.data.jiecunshuliang,
                    //     "saomiaoshu": '1',
                    //     "huopingdaihao": json.data.huopindaihao,
                    //     "yanse": json.data.yanse,
                    //     "huoqu": this.state.huoquValue
                    // });
                  goodsc.forEach((val,index)=>{
                    if(e.toString().toLowerCase() == val.tiaoma.toString().toLowerCase()){
                      nowid = index
                      val.kucun = json.data.jiecunshuliang
                      val.huoqu = this.state.huoquValue
                      //超单据数
                      if(!this.state.isChaoDjs){
                        if(parseFloat(val.saomiaoshu) + 1 > parseFloat(val.jianshu)){
                          showRe = true
                          this.setState({
                            kucun: json.data.jiecunshuliang,
                            saomiaoshu:val.saomiaoshu,
                            showshuliang:true,
                          })
                          alert(this.state.message158)
                          return
                        }else {
                          val.saomiaoshu++
                          val.saomiaoshu = parseFloat(val.saomiaoshu).toFixed(2)
                        }
                      }else {
                        val.saomiaoshu++
                        val.saomiaoshu = parseFloat(val.saomiaoshu).toFixed(2)
                      }
                      this.setState({
                        tiaoma: e,
                        saomiaoshu:val.saomiaoshu,
                        huopingdaihao:json.data.huopindaihao,
                        yanse:json.data.yanse,
                        huoqu:this.state.huoquValue,
                        showshuliang:true,
                      })
                      this.countsadd()
                    }
                  })
                    // nowid = goodsc.length - 1

                    this.setState({
                        dataSource: ds.cloneWithRows(goodsc),
                        hangshu: goodsc.length,
                        kucun: json.data.jiecunshuliang,
                        ReceiveCode: e,
                        saomiaoshu: '1',
                        loaded: false,
                        showshuliang: true,
                        showtiaoma: true,
                    });
                    //console.error(goodsc);
                    this.countsadd();
                    this.refs.toast.show(this.state.saomaSuccessName, 3000);
                    //ToastAndroid.show(this.state.saomaSuccessName,ToastAndroid.SHORT);
                } else if (json.state == 'error') {
                    this.setState({
                        loaded: false
                    })
                    if (json.msgcode == '004') {
                        this.refs.toast.show(this.state.message129, 3000);
                        //alert(this.state.message129)
                    } else if (json.msgcode == '006') {
                        alert(this.state.message1005)
                    } else {
                        this.refs.toast.show(json.message, 3000);
                        //alert(json.message)
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    loaded: false
                })
                this.refs.toast.show(this.state.message130, 3000);
                //alert(this.state.message130)
            });

    }

    //总数计算
    countsadd() {
        var counts = 0;
        if (goodsc.length > 0) {
            goodsc.forEach(val => {
                counts += parseFloat(val.saomiaoshu)
            })
        }
        this.setState({
            totalcount: parseFloat(counts).toFixed(2),
        })
    }

    //条码信息渲染
    renderRow(rowData: string, sectionID: number, rowID: number) {
        //console.error(goodsc);
        return (
            <TouchableHighlight
                style={[styles.countsContainer, {backgroundColor: rowData.isselect, paddingVertical: 4}]}
                underlayColor='gray'
                onPress={() => {
                    this._editRow(rowData, rowID);
                }}
            >
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:1,textAlign:'center',fontSize:10}}>{rowData.tiaoma}</Text>
                  <Text style={{flex:0.6,textAlign:'center',fontSize:10}}>{rowData.chayishu}</Text>
                  <Text style={{flex:0.6,textAlign:'center',fontSize:10}}>{rowData.saomiaoshu}</Text>
                  <Text style={{flex:0.6,textAlign:'center',fontSize:10}}>{rowData.jianshu}</Text>
                    <Text
                        style={{flex: 0.4, textAlign: 'center', backgroundColor: '#87caf5', fontSize: 10}}
                        onPress={() => {
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
                                hangshu: goodsc.length,
                                saomiaoshu: '',
                                ReceiveCode: '',
                                kucun: '',
                                dataSource: ds.cloneWithRows(goodsc),
                                huoquValue: ''
                            })
                            this.countsadd();
                            //console.error(goodsc)
                        }}>{this.state.shanchuName}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    //修改库存
    changekucun(e) {
        if (e == '') {
            alert(this.state.unNullName)
            return
        }
        //扫描数不能大于件数
        if(!this.state.isChaoDjs && parseFloat(e) > goodsc[nowid].jianshu){
          alert(this.state.message158)
          return
        }
        //库存不能小于库存
        // if(!this.state.isChaoshu && goodsc[nowid].kucun < parseFloat(e)){
        //   alert(this.state.message159)
        //   return
        // }
        var counts = this.state.totalcount + parseFloat(e).toFixed(2) - parseFloat(goodsc[nowid].saomiaoshu).toFixed(2);
        if (this.state.isShuliang && this.state.shuLiang < counts) {
            alert(this.state.message150)
            return
        }
        //console.log(typeof this.state.saomiaoshu)
        //console.log(typeof parseFloat(this.state.saomiaoshu))
        goodsc[nowid].saomiaoshu = parseFloat(e).toFixed(2);
        goodsc[nowid].chayishu = goodsc[nowid].jianshu - goodsc[nowid].saomiaoshu;
        this.setState({
            showtiaoma: true,
            saomiaoshu: '',
            ReceiveCode: '',
            kucun: '',
            dataSource: ds.cloneWithRows(goodsc),
            huoquValue: ''
        })

        this.countsadd();
        this.refs.toast.show(this.state.changSuccessName, 3000);
        //ToastAndroid.show(this.state.changSuccessName,ToastAndroid.SHORT);
    }

    _editRow(rowData: string, rowID: number) {
        if (this.state.ishuoqu || this.state.ishuoquK) {
            this.setState({
                showshuliang: false,
                showtiaoma: false,
            })
        } else {
            this.setState({
                showshuliang: true,
                showtiaoma: true,
            })
        }
        nowid = rowID;
        //console.error(nowid);
        for (var i = 0; i < goodsc.length; i++) {
            goodsc[i].isselect = 'white';
        }
        //console.error(goodsc);
        goodsc[rowID].isselect = '#87caf5';
        //console.error(goodsc);
        this.setState({
            ReceiveCode: rowData.tiaoma,
            kucun: rowData.kucun,
            saomiaoshu: rowData.saomiaoshu,
            changeshuliang: '',
            showrow: rowID,
            dataSource: ds.cloneWithRows(goodsc),
            huoquValue: rowData.huoqu
        })
    }

//照片上传
    cameraAction() {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                return
            }
            imgPickers.push({
                "uri": response.uri,
                "data": 'data:image/jpeg;base64,' + response.data,
                height: response.height,
                width: response.width
            })
            this.setState({
                imgSource: ds.cloneWithRows(imgPickers)
            })
            //console.log(imgPickers);
        })
    }

    saveImg(rowData: string, sectionID: number, rowID: number) {
        return (
            <View style={{alignItems: 'center', marginBottom: 5,}}>
                <TouchableOpacity onPress={() => {
                    picid = rowID;
                    this.setState({showPic: true})
                }}>
                    <Image source={{uri: rowData.uri}}
                           style={{width: 50, height: 50, marginRight: 10, marginBottom: 4, marginLeft: 10}}/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 10,
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    backgroundColor: '#87caf5',
                    borderRadius: 6
                }}
                      onPress={() => {
                          //console.log(imgPickers)
                          delete imgPickers[rowID];
                          var imgPicker = [];
                          for (var i = 0; i < imgPickers.length; i++) {
                              if (imgPickers[i] != null) {
                                  imgPicker.push(imgPickers[i]);
                              }
                          }
                          imgPickers = imgPicker;
                          this.setState({
                              imgSource: ds.cloneWithRows(imgPickers)
                          })
                          //console.log(imgPickers)
                      }}
                >{this.state.shanchuName}</Text>
            </View>
        )
    }


    //保存
    Save() {
        if (goodsc.length <= 0) {
            alert(this.state.message163)
            return
        }
        _that = this;
        const url = urls + "/index.php/api/index/w_ruku";
        this.setState({
            loaded: true
        })
        //扫描数不能大于件数
        if(!this.state.isChaoDjs && parseFloat(this.state.saomiaoshu) > goodsc[nowid].jianshu){
          alert(this.state.message158)
          return
        }
        let newgoodsc = [];
        let newgoodscc = [];
        goodsc.forEach((val,index)=>{
          // if (
          if(val.saomiaoshu == 0){
            newgoodsc.push(val)
          }
          if(val.saomiaoshu > 0){
            newgoodscc.push(val)
          }
        })
        goodsc = newgoodsc;
        var timestamp = Date.parse(new Date()) / 1000;
        return Promise.race([
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'shuzu=' + JSON.stringify(newgoodscc) + '&imgs=' + JSON.stringify(imgPickers) + '&saomiaoshijian=' + timestamp + '&cangkudaihao=' + this.props.navigation.state.params.cangkudaihao + '&changshandaihao=' + this.props.navigation.state.params.changshandaihao + '&caigoudanhao=' + this.props.navigation.state.params.caigoudanhao + "&user_token=" + this.state.names.user_token + "&huoqukongbai=" + this.state.ishuoqu,
            }),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('Network request timeout!')), 10000)
            })])
            .then((response) => {

                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({
                        loaded: false
                    })
                }
            })
            .then((json) => {
                //console.error(json);

                if (json.state == 'success') {
                    // goodsc = [];
                    imgPickers = [];
                    this.setState({
                        ReceiveCode: '',
                        hangshu: 0,
                        totalcount: 0,
                        kucun: '',
                        saomiaoshu: '',
                        dataSource: ds.cloneWithRows(goodsc),
                        imgSource: ds.cloneWithRows(imgPickers),
                    })
                    this.setState({
                        loaded: false
                    })
                    this.refs.toast.show(this.state.saveSuccessName, 3000);
                    //ToastAndroid.show(this.state.saveSuccessName,ToastAndroid.SHORT);
                } else if (json.state == 'error') {
                    this.setState({
                        loaded: false
                    })
                    if (json.msgcode == '001') {
                        this.refs.toast.show(this.state.message111, 3000);
                        //alert(this.state.message111)
                    } else {
                        this.refs.toast.show(json.message, 3000);
                        //alert(json.message)
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    loaded: false
                })
                this.refs.toast.show(this.state.message130, 3000);
                //alert(this.state.message130)
            });
    }
}
const styles = StyleSheet.create({
    countStyles: {
        color: '#000000',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10
    },
    choseData: {
        backgroundColor: 'gray'
    },
    dataStyles: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 20,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#f3f3f3'
    },
    headerStyles: {
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
    countsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 1,
        backgroundColor: 'white',
        width: width - 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 1,
        backgroundColor: 'white',
        width: width,
    },
    scanStyles: {
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
    textStyles: {
        color: '#000000',
        fontSize: 16,
        marginRight: 10,
        flex: 0.6,
        textAlign: 'right'
    },
    inputStyles: {
        width: 180,
        backgroundColor: 'white',
        borderRadius: 16,
        height: 30,
        paddingLeft: 12,
        borderColor: '#c8c8c8',
        borderWidth: 1,
        fontSize: 12,
        paddingVertical: 0
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
        marginBottom: 5
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
