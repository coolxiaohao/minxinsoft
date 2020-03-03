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
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    ListView,
    Modal,
    Switch,
    BackHandler,
    Platform
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
import utils from '../utils/utils'
import *as wechat from 'react-native-wechat'

var urls = '';
import loadingImage from '../img/loading.gif'
import Toast from '../Components/Toast'

const {width, height} = Dimensions.get('window');
import Modals from "react-native-modal";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var zhijiemenus = [];
var gengdanmenus = [];
var othermenus = [];
var tablist = [];
var nowid = '';
import UpdateComp from '../Components/ProgressBar'
export default class mingxin extends Component {
    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            isSetUp: false,
            switchValue: false,
            loading: false,
            names: '',
            zhijiesaomiao: '',
            gengdansaomiao: '',
            othermenuname: '',
            zhijiemenu: zhijiemenus,
            gengdanmenu: gengdanmenus,
            othermenu: othermenus,
            dataSourceZ: ds.cloneWithRows(zhijiemenus),
            dataSourceD: ds.cloneWithRows(gengdanmenus),
            dataSourceO: ds.cloneWithRows(othermenus),
            tablists: [],
            companyName: '',
            setUpName: '',
            changLangName: '',
            databaseName: '',
            systemDefaultName: '',
            cancelName: '',
            logoutName: '',
            isShare: false,
        };
    }

    getName(val) {
        if (val.id == 47) {
            this.setState({
                companyName: val.name
            })
        }
        if (val.id == 57) {
            this.setState({
                userName: val.name
            })
        }
        if (val.id == 58) {
            this.setState({
                passWordName: val.name
            })
        }
        if (val.id == 48) {
            this.setState({
                setUpName: val.name
            })
        }
        if (val.id == 50) {
            this.setState({
                databaseName: val.name
            })
        }
        if (val.id == 51) {
            this.setState({
                systemDefaultName: val.name
            })
        }
        if (val.id == 53) {
            this.setState({
                cancelName: val.name
            })
        }
        if (val.id == 87) {
            this.setState({
                changLangName: val.name
            })
        }
        if (val.id == 52) {
            this.setState({
                logoutName: val.name
            })
        }
        if (val.id == 288) {
            this.setState({
                message166: val.name
            })
        }
        if (val.id == 289) {
            this.setState({
                message167: val.name
            })
        }
        if (val.id == 290) {
            this.setState({
                message168: val.name
            })
        }
        if (val.id == 291) {
            this.setState({
                message169: val.name
            })
        }
    }

    read() {
        AsyncStorage.getItem('userInfo', (error, result) => {
            if (result != null) {
                this.setState({
                    names: JSON.parse(result)
                })
            } else {
                this.props.navigation.navigate('Login')
            }
        })
        AsyncStorage.getItem('langArr', (error, result) => {
            var res = JSON.parse(result)
            //console.error(res)
            if (result != null) {
                var newArr = []
                res.map((val) => {
                    if (val.pid == 46) {
                        return newArr.push(val)
                    }
                    if (val.pid == 1) {
                        return zhijiemenus.push(val)
                    }
                    if (val.id == 1) {
                        return this.setState({
                            zhijiesaomiao: val.name
                        })
                    }
                    if (val.id == 9) {
                        return this.setState({
                            gengdansaomiao: val.name
                        })
                    }
                    if (val.pid == 9) {
                        return gengdanmenus.push(val)
                    }
                    if (val.pid == 42) {
                        return tablist.push(val)
                    }
                    if (val.id == 165) {
                        return this.setState({
                            othermenuname: val.name
                        })
                    }
                    if (val.pid == 165) {
                        return othermenus.push(val)
                    }
                })
                this.setState({
                    zhijiemenu: zhijiemenus,
                    gengdanmenu: gengdanmenus,
                    othermenu: othermenus,
                    dataSourceZ: ds.cloneWithRows(zhijiemenus),
                    dataSourceD: ds.cloneWithRows(gengdanmenus),
                    dataSourceO: ds.cloneWithRows(othermenus),
                    tablists: tablist,
                })
                //console.log(newArr)
                newArr.forEach((val, index) => {
                    this.getName(val)
                })
            } else {
                console.log(error)
            }
        })

    }

    componentDidMount() {
        AsyncStorage.getItem('dataBase', (error, result) => {
            var res = JSON.parse(result)
            //console.log(res)
            if (res != null) {
                urls = 'http://' + res[0].ipValue + ':' + res[0].serviceportValue
            } else {
                return

            }
        })
        wechat.registerApp('wx44dee21c89380d3a')
        zhijiemenus = [];
        gengdanmenus = [];
        tablist = [];
        othermenus = [];
        this.read()
    }

    componentWillMount() {
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
        this.refs.toast.show(this.state.message166, 3000);
        //ToastAndroid.show(this.state.message167,ToastAndroid.SHORT);
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{width: width}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: '#ffffff'
                    }}>
                        <Image style={styles.titlebgStyles}
                               source={{uri: 'indexbg'}}/>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={{position: 'absolute', top: 10, right: 20, width: 40, height: 40}}
                                          onPress={() => {
                                              this.setState({isSetUp: true})
                                          }}>
                            <Image source={{uri: 'setup'}} style={{width: 20, height: 20, alignSelf: 'center'}}></Image>
                            <Text style={styles.shezhiStyles}>{this.state.setUpName}</Text>
                            {/*<Text style={styles.shezhiStyles}>{'测试内容'}</Text>*/}

                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40
                        }}>
                            <Image source={{uri: 'logo'}} style={{width: 46, height: 50, marginRight: 10}}></Image>
                            <Text style={styles.nameStyles}>{this.state.companyName}</Text>
                        </View>
                        {/* <Text style={styles.titleStyles}>Direct scanning</Text> */}
                        <Text style={styles.titleStyles}>
                            {this.state.zhijiesaomiao}
                        </Text>
                        {/*<Text style={styles.titleStyles}>{'测试内容'}</Text>*/}
                        {/*直接扫描*/}
                        <View style={styles.formStyles}>
                            <ListView
                                initialListSize={this.state.zhijiemenu.length}
                                dataSource={this.state.dataSourceZ}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections={true}
                                contentContainerStyle={styles.listViewStyle}
                            />
                        </View>
                        <Text style={styles.titleStyles}>
                            {this.state.gengdansaomiao}
                        </Text>
                        {/* <Text style={styles.titleStyles}>Single scanning</Text> */}
                        {/*跟单扫描*/}
                        <View style={styles.formStyles}>
                            <ListView
                                initialListSize={this.state.gengdanmenu.length}
                                dataSource={this.state.dataSourceD}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections={true}
                                contentContainerStyle={styles.listViewStyle}
                            />
                        </View>
                        <Text style={styles.titleStyles}>
                            {this.state.othermenuname}
                        </Text>
                        {/* <Text style={styles.titleStyles}>Single scanning</Text> */}
                        {/*//其他扫描*/}
                        <View style={styles.formStyles}>
                            <ListView
                                initialListSize={this.state.othermenu.length}
                                dataSource={this.state.dataSourceO}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections={true}
                                contentContainerStyle={styles.listViewStyle}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',}}>
                            {this.tabrender()}
                        </View>
                    </View>
                </ScrollView>
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
                    onBackButtonPress={() => this.setState({loading: false})}
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

                {/* <Modal
             animationType='slide'
             transparent={true}
             visible={this.state.isSetUp}
             onShow={() => {}}
             onRequestClose={() => {}} >
             <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                {this.setUp()}
             </View>
          </Modal> */}
                <Modals
                    isVisible={this.state.isSetUp}
                    onBackButtonPress={() => this.setState({isSetUp: false})}
                    backdropOpacity={0.5}
                    style={{margin: 0, padding: 0}}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({isSetUp: false})} style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        {this.setUp()}
                    </TouchableOpacity>
                </Modals>
                <Modals
                    isVisible={this.state.isShare}
                    onBackButtonPress={() => this.setState({isShare: false})}
                    backdropOpacity={0.5}
                    style={{margin: 0, padding: 0}}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({isShare: false})} style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        {this.sharePage()}
                    </TouchableOpacity>
                </Modals>
                <UpdateComp {...this.props} update = {true}/>
                <Toast ref="toast" position='bottom'/>
            </View>

        );
    }

    //f分享
    sharePage() {
        return (
            <View style={{
                width: width,
                height: 100,
                paddingBottom: 20,
                backgroundColor: '#ffffff',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() =>
                                      wechat.isWXAppInstalled()
                                          .then((isInstalled) => {
                                              if (isInstalled) {
                                                  wechat.shareToSession({
                                                      type: 'news',
                                                      title: this.state.tablists[1].header,
                                                      description: this.state.tablists[1].comment,
                                                      webpageUrl: this.state.tablists[1].islink
                                                  }).then((success) => {
                                                      console.log(success)
                                                  }).catch((error) => {
                                                      console.log(error)
                                                  })

                                              } else {
                                                  this.refs.toast.show(this.state.message167, 3000);
                                                  //ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT)
                                              }
                                          })
                                  } style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: 'wechatfri'}} style={{width: 60, height: 60}}></Image>
                    <Text>{this.state.message168}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() =>
                    wechat.isWXAppInstalled()
                        .then((isInstalled) => {
                            if (isInstalled) {
                                //wechat.openWXApp()
                                wechat.shareToTimeline({
                                    type: 'news',
                                    title: this.state.tablists[1].header,
                                    description: this.state.tablists[1].comment,
                                    webpageUrl: this.state.tablists[1].islink
                                }).then((success) => {
                                    console.log(success)
                                }).catch((error) => {
                                    console.log(error)
                                })
                            } else {
                                this.refs.toast.show(this.state.message167, 5000);
                                //ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT)
                            }
                        })
                } style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: 'wxcircle'}} style={{width: 60, height: 60}}></Image>
                    <Text>{this.state.message169}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity activeOpacity = {0.5} onPress={()=>
          QQAPI.shareToQQ({
              type: 'news',
              title: '分享标题',
              description: '描述',
              webpageUrl: 'http://www.baidu.com',
              imageUrl:'https://www.baidu.com/img/bd_logo1.png',
            })
        } style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={{uri: 'qqfri'}} style={{width:60,height:60}}></Image>
          <Text>QQ</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity = {0.5} onPress={()=>
          QQAPI.shareToQzone({
                type: 'news',
              	title: '分享标题',
              	description: '描述',
              	webpageUrl: 'http://www.baidu.com',
                imageUrl:'https://www.baidu.com/img/bd_logo1.png',
              })
        } style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={{uri: 'qzone'}} style={{width:60,height:60}}></Image>
          <Text>QQ空间</Text>
        </TouchableOpacity> */}
            </View>
        )
    }
    //shezhi
    setUp() {
        let showDefault = false;
        if (this.state.names.auth == '1' || this.state.names.auth == '2') {
            showDefault = true;
        } else {
            showDefault = false;
        }
        return (
            <View style={{
                width: width,
                height: showDefault ? 160 : 120,
                backgroundColor: '#ffffff',
                borderRadius: 10,
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: 20
            }}>
                <Text onPress={() => {
                    this.setState({isSetUp: false,});
                    this.props.navigation.navigate('Choselan', {
                        callBack: ((info) => {
                            this.setState({
                                lan: info
                            })
                            zhijiemenus = [];
                            gengdanmenus = [];
                            tablist = [];
                            othermenus = [];
                            this.setState({
                                zhijiemenu: zhijiemenus,
                                gengdanmenu: gengdanmenus,
                                othermenu: othermenus,
                                dataSourceZ: ds.cloneWithRows(zhijiemenus),
                                dataSourceD: ds.cloneWithRows(gengdanmenus),
                                dataSourceO: ds.cloneWithRows(othermenus),
                                tablists: tablist,
                            })
                            this.read()
                        })
                    })
                }
                }>{this.state.changLangName}</Text>
                {/* <Text onPress={()=>{this.setState({isSetUp:false,}); this.props.navigation.navigate('Database')}}>{this.state.databaseName}</Text> */}
                {
                    showDefault ? (<Text onPress={() => {
                        this.setState({isSetUp: false,});
                        this.props.navigation.navigate('Systemdefault')
                    }}>{this.state.systemDefaultName}</Text>) : (null)
                }
                <Text onPress={() => {
                    zhijiemenus = [];
                    gengdanmenus = [];
                    tablist = [];
                    othermenus = [];
                    this.setState({
                        isSetUp: false,
                        zhijiemenu: zhijiemenus,
                        gengdanmenu: gengdanmenus,
                        othermenu: othermenus,
                        dataSourceZ: ds.cloneWithRows(zhijiemenus),
                        dataSourceD: ds.cloneWithRows(gengdanmenus),
                        dataSourceO: ds.cloneWithRows(othermenus),
                        tablists: tablist,
                    });
                    fetch(urls + '/api/index/logout?user_token=' + this.state.names.user_token)
                    AsyncStorage.removeItem('userInfo');
                    AsyncStorage.removeItem('systemDefault');
                    if (this.props.navigation.state.params.call) {
                        this.props.navigation.state.params.call(this.state.lan)
                    }
                    this.props.navigation.navigate('Login')
                }}>{this.state.logoutName}</Text>
                {/* <Text onPress={()=>{this.setState({isSetUp:false}); AsyncStorage.clear()}}>清除缓存</Text> */}
                <Text onPress={() => {
                    this.setState({isSetUp: false})
                }}>{this.state.cancelName}</Text>
            </View>
        )
    }

    tabrender() {
        var lists = [];
        this.state.tablists.forEach((val, index) => {
            lists.push(
                <TouchableOpacity key={index} style={{flex: 1}} activeOpacity={0.5} onPress={() => {
                    if (val.id == 43) {
                        this.props.navigation.navigate('Webview', {'url': val.islink})
                    } else if (val.id == 44) {
                        this.setState({
                            isShare: true
                        })
                    } else {
                        alert('该功能还未开放，请稍等')
                    }
                }}>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 30}}>
                        <Image source={{uri: urls + val.head}}
                               style={{width: 30, height: 30, resizeMode: 'contain'}}></Image>
                        <Text style={styles.buttonStyles}>{val.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return lists
    }

    renderRow(rowData: string, sectionID: number, rowID: number) {
        return (
            <TouchableOpacity onPress={() => {
                this.toPage(rowData, rowID)
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: (width - 40) / 3 - 2,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Image source={{uri: urls + rowData.head}}
                           style={{width: 30, height: 30, resizeMode: 'contain'}}></Image>
                    <Text style={styles.buttonStyles}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    toPage(rowData, rowID) {
        switch (rowData.id) {
            case '3':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //出库扫描 (直接)
                break;
            case '4':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //盘点扫描 (直接)
                break;
            case '5':
                this.props.navigation.navigate('KucunD', {typeValue: rowData.id}) //库存查询 (直接)
                break;
            case '6':
                this.props.navigation.navigate('JifeiD', {typeValue: rowData.id}) //记菲扫描 (直接)
                break;
            case '7':
                this.props.navigation.navigate('ChafeiD', {typeValue: rowData.id}) //查菲1 (直接)
                break;
            case '332':
                this.props.navigation.navigate('Chafei2D', {typeValue: rowData.id}) //查菲2 (直接)
                break;
            case '333':
                this.props.navigation.navigate('DangeD', {typeValue: rowData.id}) //单次扫描 (直接)
                break;
            case '334':
                this.props.navigation.navigate('ErciD', {typeValue: rowData.id}) //二次扫描 (直接)
                break;
            case '8':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //收发扫描 (直接)
                break;
            case '41':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //入库扫描 (直接)
                break;
            case '10':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //入库扫描 (跟单)
                break;
            case '11':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //出库扫描 (跟单)
                break;
            case '12':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //盘点扫描 (跟单)
                break;
            case '13':
                this.props.navigation.navigate('KucunD', {typeValue: rowData.id}) //库存查询 (跟单)
                break;
            case '14':
                this.props.navigation.navigate('JifeiGhao', {typeValue: rowData.id}) //跟单记菲 (跟单)
                break;
            case '15':
                this.props.navigation.navigate('ChafeiD', {typeValue: rowData.id}) //查菲 (跟单)
                break;
            case '16':
                this.props.navigation.navigate('XiangGhao', {typeValue: rowData.id}) //装箱扫描 (跟单)
                break;
            case '17':
                this.props.navigation.navigate('XianghaoS', {typeValue: rowData.id}) //箱号查菲 (跟单)
                break;
            case '18':
                this.props.navigation.navigate('BadJifeiGhao', {typeValue: rowData.id}) //不良品查菲 (跟单)
                break;
            case '19':
                this.props.navigation.navigate('Warehouse', {typeValue: rowData.id}) //委外扫描 (跟单)
                break;
            case '124':
                this.props.navigation.navigate('BadcS', {typeValue: rowData.id}) //委外扫描 (跟单)
                break;
            default:
                this.props.navigation.navigate('Webview', {'url': rowData.islink + '?token=' + this.state.names.user_token})

        }
    }

}

const styles = StyleSheet.create({
    listViewStyle: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        width: window.width,
        height:(window.width - 30) / 2,
        // border: 1,
        // borderStyle:'solid',
        // borderWidth:1,
        // borderColor:'#f5f6f7',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: width,
        marginTop: Platform.OS == 'ios' ? 20 : 0
    },
    rowStyles: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width - 40,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    titlebgStyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: 110,
    },
    nameStyles: {
        fontSize: 24,
        textAlign: 'center',
        margin: 0,
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    titleStyles: {
        fontSize: 20,
        alignSelf: 'flex-start',
        margin: 0,
        color: '#333333',
        marginLeft: 20,
    },
    formStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap'
    },
    buttonStyles: {
        color: '#333333',
        fontSize: 12,
        fontWeight: "100",
        paddingTop: 8,
        textAlign: 'center',
    },
    shezhiStyles: {
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 12,
        fontWeight: "100",
        textAlign: 'center'
    }
});
