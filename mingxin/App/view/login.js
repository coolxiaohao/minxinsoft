/**
 * @desc: 登陆页面
 * @package: Login
 * @author: tanhao
 * @date: 2020/03/04 14:29
 */
//第三方渐变色插件
import LinearGradient from 'react-native-linear-gradient';
import {
    StatusBar,
    StatusBarIOS,
    AsyncStorage,
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    TextInput,
    BackHandler,
    Modal,
    ScrollView,
    // DeviceEventEmitter,
} from 'react-native';
import React, {Component} from 'react';

const {width, height} = Dimensions.get('window');
import logo from '../img/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../Components/CustomButton';
import loadingImage from '../img/loading.gif'
import Toast from '../Components/Toast'
import DeviceInfo from "react-native-device-info";

var urls = '';

class Login extends Component {
    // static navigationOptions = {
    //     headerStyle: {
    //         backgroundColor: '#3492e2',
    //     },
    //     //标题
    //     title: '',
    //     gestureEnabled: false,
    //     headerShown: false,
    //     //文字颜色
    //     // headerBackTitle: '返回',
    //     // headerTintColor: '#ffffff',
    // };

    static defaultProps = {}

    /**
     * @desc: 构造方法
     * @author: tanhao
     * @date: 2020/03/06
     */
    constructor(props) {
        super(props);
        this.state = {
            isSetUp: false,
            user: '',
            passWord: '',
            loading: false,
            companyName: '明歆软件公司',
            userName: '登录名',
            passWordName: '密码',
            loginName: '登录',
            setUpName: '设置',
            changLangName: '语言切换',
            databaseName: '数据库设置',
            systemDefaultName: '系统默认设置',
            cancelName: '取消',
            successMessage: '登录成功',
            errorMessage: '登录失败',
            errorMessageName: '用户名和密码不能为空',
            message166: '再按一次退出应用',
            whatLan: 'cn',
            message130: '网络错误或服务器正在维护',
            showPwd: true,
            logo: '',
        };
    }

    getLan(e) {
        _that = this;
        //alert(e+':'+this.state.whatLan)
        var url = urls + "/index.php/Api/index/ability?code=" + this.state.whatLan + '&uid=' + e;
        return fetch(url, {timeout: 10000})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                //console.error(json)
                if (json.state == 'success') {
                    AsyncStorage.setItem('langArr', JSON.stringify(json.data), (error) => {
                        if (error) {
                        } else {
                            var newArr = []
                            json.data.map((val) => {
                                if (val.pid == 46) {
                                    return newArr.push(val)
                                }
                            })
                            //console.log(newArr)
                            newArr.forEach((val, index) => {
                                this.getName(val)
                            })
                        }
                        if (e != '') {
                            this.props.navigation.navigate('Home', {
                                call: ((info) => {
                                    if (info) {
                                        this.setState({
                                            whatLan: info
                                        });
                                        this.read()
                                    }
                                    ;
                                })
                            });
                        }
                    });
                } else if (json.state == 'error') {
                    alert(json.message)
                }

            })
            .catch((error) => {
                alert(error);
            });
    }

    getLans(e) {
        _that = this;
        //alert(urls)
        var url = urls + "/index.php/Api/index/ability?code=" + e;
        return fetch(url, {timeout: 10000})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                //console.error(json)

                if (json.state == 'success') {
                    AsyncStorage.setItem('langArr', JSON.stringify(json.data), (error) => {
                        if (error) {
                        } else {
                            var newArr = []
                            json.data.map((val) => {
                                if (val.pid == 46) {
                                    return newArr.push(val)
                                }
                            })
                            //console.log(newArr)
                            newArr.forEach((val, index) => {
                                this.getName(val)
                            })
                            // console.error(JSON.stringify(json))
                        }
                    });
                } else if (json.state == 'error') {
                    alert(json.message)
                }

            })
            .catch((error) => {
                alert(error);
            });
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
        if (val.id == 85) {
            this.setState({
                loginName: val.name
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
        if (val.id == 89) {
            this.setState({
                errorMessage: val.name
            })
        }
        if (val.id == 90) {
            this.setState({
                successMessage: val.name
            })
        }
        if (val.id == 91) {
            this.setState({
                errorMessageName: val.name
            })
        }
        if (val.id == 130) {
            this.setState({
                message130: val.name
            })
        }
        if (val.id == 133) {
            this.setState({
                message133: val.name
            })
        }
        if (val.id == 134) {
            this.setState({
                message134: val.name
            })
        }
        if (val.id == 135) {
            this.setState({
                message135: val.name
            })
        }
        if (val.id == 136) {
            this.setState({
                message136: val.name
            })
        }
        if (val.id == 288) {
            this.setState({
                message166: val.name
            })
        }
    }

    read() {
        AsyncStorage.getItem('userInfo', (error, result) => {
            if (result != null) {
                this.props.navigation.navigate('Home', {lanChange: false})
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
                })
                //console.log(newArr)
                newArr.forEach((val, index) => {
                    this.getName(val)
                })
            } else {
                this.getLans(this.state.whatLan)
            }
        })
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

    componentDidMount() {
        // console.error(this.state.logo)
        AsyncStorage.getItem('dataBase', (error, result) => {
            var res = JSON.parse(result)
            // console.error(res)
            console.log(res)
            if (res != null) {
                urls = 'http://' + res[0].ipValue + ':' + res[0].serviceportValue
                this.read()
                this.getLogoImg();
            } else {
                let dataBase = [];
                dataBase.push(
                    {
                        passWord: '13924349602',
                        ipValue: 'mingxinsoft.cn',
                        dataBaseName: 'Jm5berp',
                        loginValue: 'sa',
                        portValue: '1433',
                        serviceportValue: '86',
                    }
                );
                AsyncStorage.setItem('dataBase', JSON.stringify(dataBase), (error) => {
                    if (error) {

                    } else {
                        urls = 'http://mingxinsoft.cn:86'
                        this.read()
                        this.getLogoImg();
                    }
                });
                return
            }
        });


    }

    /**
     * @desc: 渲染页面
     * @author: tanhao
     * @date: 2020/03/06
     */
    render() {
        return (
            // <View>
            <LinearGradient
                colors={['#3492e2', '#90c7ed', '#a7ca93']}
                style={styles.container}>
                {/*<StatusBarIOS style={{backgroundColor: '#3492e2'}} />*/}
                <ScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
                    {/*<StatusBar*/}
                    {/*    // color={'#3492e2'}*/}
                    {/*    barStyle={'default'}*/}
                    {/*    translucent={true}*/}
                    {/*    backgroundColor={'#3492e2'}*/}
                    {/*    style={{backgroundColor: '#3492e2'}}*/}
                    {/*    // hidden={true}*/}
                    {/*    // animated={true}*/}
                    {/*/>*/}
                    <View style={styles.loginFrom}>
                        <View style={{height: height / 10 * 3}}>
                            {/*LOLG*/}
                            <Image defaultSource={logo} source={this.state.logo == null || this.state.logo == ''? logo :{uri: this.state.logo}} style={styles.loginLogo}/>
                            {/*标题*/}
                            <TouchableOpacity>
                                <Text style={styles.titleText}>{'A P P   L O G I N'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: height / 10 * 4, marginTop: Platform .OS == 'ios' ? '15%' : '10%' }}>
                            {/*登陆名框*/}
                            <View style={styles.fromRow}>
                                <Icon
                                    style={styles.inputIcon}
                                    name={'mobile'}
                                    color={'#dbedfa'}
                                    size={30}
                                />
                                <TextInput
                                    style={styles.fromInput}
                                    placeholder={this.state.userName}
                                    onChangeText={e => this.setState({user: e})}
                                    underlineColorAndroid="transparent"
                                    value={this.state.user}
                                />
                            </View>
                            {/*密码框*/}
                            <View style={styles.fromRow}>
                                <IconS
                                    style={styles.inputIcon}
                                    name={'ios-lock'}
                                    color={'#dbedfa'}
                                    size={24}
                                />
                                <TextInput
                                    style={styles.fromInput}
                                    placeholder={this.state.passWordName}
                                    onChangeText={e => this.setState({passWord: e})}
                                    underlineColorAndroid="transparent"
                                    value={this.state.passWord}
                                    secureTextEntry={this.state.showPwd}
                                />
                                <TouchableOpacity
                                    style={styles.pwdIcon}
                                    onPress={() => {
                                        this.setState({
                                            showPwd: !this.state.showPwd,
                                        });
                                    }}>
                                    <Icon
                                        style={{backgroundColor: 'rgba(0,0,0,0)'}}
                                        name={this.state.showPwd ? 'eye-slash' : 'eye'}
                                        color={'#dbedfa'}
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/*登陆按钮*/}
                            <View style={styles.fromRow}>
                                <CustomButton
                                    onPress={() => {
                                        this.checkUser()
                                    }}
                                    bgColor={'#ffffff'}
                                    text={this.state.loginName}
                                    style={{
                                        minWidth: '79%',
                                        paddingLeft: '10%',
                                        paddingRight: '10%',
                                        marginLeft: '10%',
                                        marginRight: '10%',
                                        minHeight: width >= 375 ? 45 : 40,
                                        paddingTop: width >= 375 ? '3.5%' : '3.3%',
                                        textAlign: 'center',
                                        borderRadius: 20,
                                        overflow: 'hidden',
                                        fontSize: width >= 375 ? 18 : 16,
                                        color: '#89bdf7',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    size={width > 375 ? 30 : 20}
                                />
                            </View>
                        </View>
                        <View style={{height: height / 10 * 3}}>
                            {/*分割线*/}
                            <View style={styles.fromLine}>
                                <View style={styles.rowLineLeft}/>
                                <Text style={styles.lineText}>{this.state.setUpName}</Text>
                                <View style={styles.rowLineRight}/>
                            </View>
                            <TouchableOpacity
                                style={styles.setUpStyle}
                                onPress={() => this.setState({isSetUp: true})}>
                                <View style={{paddingTop: 0}}>
                                    <IconF
                                        style={styles.setUpIcon}
                                        name={'settings'}
                                        color={'#ffffff'}
                                        size={width >= 375 ? 50 : 45}
                                    />
                                    {/*<Text*/}
                                    {/*  style={{*/}
                                    {/*    color: '#ffffff',*/}
                                    {/*    textAlign: 'center',*/}
                                    {/*    marginTop: '5%',*/}
                                    {/*  }}>*/}
                                    {/*  {'设置'}*/}
                                    {/*</Text>*/}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.loading}
                    onShow={() => {
                    }}
                    onRequestClose={() => {
                    }}>
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
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.isSetUp}
                    onShow={() => {
                    }}
                    onRequestClose={() => {
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        {this.setUp()}
                    </View>
                </Modal>
                <Toast ref="toast" position='bottom'/>
            </LinearGradient>
            // </View>
        );
    }

    setUp() {
        return (
            <View style={{
                width: width,
                height: 120,
                backgroundColor: '#ffffff',
                borderRadius: 10,
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: 20
            }}>
                <Text onPress={() => {
                    this.setState({isSetUp: false,});
                    this.props.navigation.navigate('Choselan',
                        {
                            callback: ((info) => { //回调函数
                                this.setState({
                                    whatLan: info
                                })
                                this.getLans(info)
                            })
                        }
                    )
                }}>{this.state.changLangName}</Text>
                <Text onPress={() => {
                    this.setState({isSetUp: false,});
                    this.props.navigation.navigate('Database',
                        {
                            callbackD: ((url, port) => { //回调函数
                                urls = 'http://' + url + ':' + port;
                                //alert(urls)
                                this.read()
                            })
                        }
                    )
                }}>{this.state.databaseName}</Text>
                {/*<Text onPress={()=>{this.setState({isSetUp:false,}); this.props.navigation.navigate('Systemdefault')}}>{this.state.systemDefaultName}</Text>*/}
                {/* <Text onPress={()=>{this.setState({isSetUp:false}); AsyncStorage.clear()}}>清除缓存</Text> */}
                <Text onPress={() => {
                    this.setState({isSetUp: false})
                }}>{this.state.cancelName}</Text>
            </View>
        )
    }

    save(e) {
        // JSON.stringify(object): JSON对象转换为字符串 用来存储
        AsyncStorage.setItem('userInfo', JSON.stringify(e), (error) => {
            if (error) {
                this.refs.toast.show(this.state.errorMessage, 5000);
                //ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
            } else {
                //ToastAndroid.show(this.state.successMessage, ToastAndroid.SHORT);
                this.getLan(this.state.user)
                this.refs.toast.show(this.state.successMessage, 5000);
            }
        });
    }

    callBack(logo) {
        this.setState({
            logo: logo
        })
    }

    getLogoImg() {
        _that = this;
        if (urls == '') {
            alert('请先设置数据库')
            return
        }
        const url = urls + "/Api/login/getLogoImg";
        // console.error(url)
        return Promise.race([
            fetch(url),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('Network request timeout!')), 10000)
            })])
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                // console.error(json)
                if (json.state == "success") {
                    // alert(json)
                    if (json.data != null && json.data != '') {
                        this.setState({
                            logo: urls + json.data,
                        })
                    } else {
                        this.setState({
                            logo: '',
                        })
                    }
                    // AsyncStorage.setItem('logo',this.state.logo)
                }
            })
    }

    /**
     * @desc: 登陆的方法
     * @author: tanhao
     * @date: 2020/03/09
     */
    checkUser() {
        _that = this;
        //alert(urls)
        if (urls == '') {
            alert('请先设置数据库')
            return
        }
        if (_that.state.user == '' || _that.state.passWord == '') {
            alert(this.state.errorMessageName);
            return;
        }
        this.setState({
            loading: true
        })
        const brand = DeviceInfo.getBrand() + DeviceInfo.getUniqueID();
        //console.log(brand)
        const url = urls + "/Api/login/login?user=" + _that.state.user + "&password=" + _that.state.passWord + "&brand=" + brand;
        console.log(url)
        return Promise.race([
            fetch(url),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('Network request timeout!')), 10000)
            })])
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
            .then((json) => {
                console.log(json)
                if (json.state == "success") {
                    this.setState({
                        loading: false
                    })
                    var systemDefault = [];
                    if (json.data.nonumcheck_set == 'true') {
                        json.data.nonumcheck_set = true
                    } else {
                        json.data.nonumcheck_set = false
                    }
                    if (json.data.allnum_set == 'true') {
                        json.data.allnum_set = true
                    } else {
                        json.data.allnum_set = false
                    }
                    if (json.data.rownum_set == 'true') {
                        json.data.rownum_set = true
                    } else {
                        json.data.rownum_set = false
                    }
                    if (json.data.chongfusao_set == 'true') {
                        json.data.chongfusao_set = true
                    } else {
                        json.data.chongfusao_set = false
                    }
                    if (json.data.chaoshu_set == 'true') {
                        json.data.chaoshu_set = true
                    } else {
                        json.data.chaoshu_set = false
                    }
                    if (json.data.huoqukongbai_set == 'true') {
                        json.data.huoqukongbai_set = true
                    } else {
                        json.data.huoqukongbai_set = false
                    }
                    if (json.data.checkhuoqukucun_set == 'true') {
                        json.data.checkhuoqukucun_set = true
                    } else {
                        json.data.checkhuoqukucun_set = false
                    }
                    if (json.data.employee_number == 'true') {
                        json.data.employee_number = true
                    } else {
                        json.data.employee_number = false
                    }
                    systemDefault.push(
                        {
                            'choseAll': json.data.nonumcheck_set,
                            'isShuliang': json.data.allnum_set,
                            'shuLiang': json.data.allnum_set_val,
                            'hangShu': json.data.rownum_set_val,
                            'isHangshu': json.data.rownum_set,
                            'isResaoma': json.data.chongfusao_set,
                            'isChaoshu': json.data.chaoshu_set,
                            'ishuoqu': json.data.huoqukongbai_set,
                            'ishuoquK': json.data.checkhuoqukucun_set,
                            'saveYuan': json.data.employee_number,
                        }
                    );
                    //console.error(systemDefault)
                    AsyncStorage.setItem('systemDefault', JSON.stringify(systemDefault), (error) => {
                        if (error) {

                        } else {

                        }
                    })
                    this.save(json.data);
                } else if (json.state == 'error') {
                    this.setState({
                        loading: false,
                    })
                    if (json.msgcode == '100') {
                        this.refs.toast.show(this.state.message136, 5000);
                        //alert('帐号或密码错误，请重试！')
                    } else if (json.msgcode == '101') {
                        this.refs.toast.show(this.state.message133, 5000);
                        //alert('账号为空')
                    } else if (json.msgcode == '102') {
                        this.refs.toast.show(this.state.message134, 5000);
                        //alert('密码为空')
                    } else if (json.msgcode == '103') {
                        this.refs.toast.show(this.state.message135, 5000);
                        //alert('该用户已上锁，请联系管理员！')
                    } else {
                        this.refs.toast.show(json.message, 5000);
                        //alert(json.message)
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                this.refs.toast.show(this.state.message130, 5000);
                //alert('网络错误或服务器正在维护')
            });
    }

}

//#3492e2 #90c7ed #a7ca93
/**
 * @desc: 登陆样式
 * @author: tanhao
 * @date: 2020/03/07
 */
const styles = StyleSheet.create({
    titleText: {
        marginTop: '5%',
        marginBottom: '3%',
        color: '#ffffff',
        fontSize: width >= 360 ? 24 : 22,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        // opacity: 0,
        // backgroundColor: 'regb()',
    },
    loginLogo: {
        marginTop: Platform.OS == "ios"? '20%' : width >= 360?'15%': '10%',
        marginLeft: width / 3,
        width: width / 3,
        height: width / 3,
        borderRadius: 50,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginFrom: {
        flex: 1,
        // paddingTop: 0,
        // marginTop: Platform.OS == 'ios' ? 0 : 0,
    },
    fromRow: {
        // flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : width >= 360 ? 20 : 10,
        // flex: 1,
        flexDirection: 'row',
    },
    fromInput: {
        fontSize: width >= 375 ? 18 : 15,
        paddingLeft: '10%',
        paddingRight: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        height: width >= 375 ? 45 : 40,
        // height: 40,
        width: '79%',
        opacity: 0.3,
    },
    inputIcon: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        left: '14%',
        top: width >= 375 ? '16%' : '14%',
        // top: '14%',
    },
    pwdIcon: {
        position: 'absolute',
        right: '14%',
        top: width >= 375 ? '20%' : '14%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    rowLineLeft: {
        marginTop: Platform.OS == 'ios' ? '12.5%' : width >= 360 ? '13.5%': '3.5%',
        // marginTop: height / 5 + 23 / 2 + 2,
        marginLeft: '5%',
        height: 2,
        width: width / 3,
        backgroundColor: '#ffffff',
        // marginTop: 23 / 2 + 2,
    },
    rowLineRight: {
        marginTop:  Platform.OS == 'ios' ? '12.5%' : width >= 360 ? '13.5%': '3.5%',
        // marginTop: height / 5 + 23 / 2 + 2,
        marginRight: '5%',
        height: 2,
        width: width / 3,
        backgroundColor: '#ffffff',
        // marginTop: ,
    },
    fromLine: {
        // marginTop: '10%',
        // position: 'absolute',
        // bottom: 80,
        // top: 30,
        // flex: 1,
        // marginTop: width >= 375 ? '35%' : '30%',
        // textAlign: 'center',
        flexDirection: 'row',
    },
    lineText: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop:  Platform.OS == 'ios' ? '10%' : width >= 360 ? '10%': 0,
        // marginBottom: width >= 375 ? '35%' : '30%',
        textAlign: 'center',
        width: width / 3 - width * 0.1,
        fontSize: 23,
        // fontcolor: '#ffffff',
        color: '#ffffff',
    },
    setUpStyle: {
        marginTop: width >= 375 ? 10 : 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setUpIcon: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: width >= 375 ? 26 : 24,
        borderWidth: 1,
        borderColor: '#ffffff',
    },
});
export default Login;
