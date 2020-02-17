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
    Modal,
    KeyboardAvoidingView,
    Button,
    // Modal,
    Keyboard,
    ListView,
    RefreshControl,
    DatePickerAndroid,
    DatePickerIOS,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    BackHandler,
    Platform
} from 'react-native';

import CustomButton from "../../Components/CustomButton";
import utils from '../../utils/utils'
// import PickerData from '../../Components/PickerData';
import loadingImage from '../../img/loading.gif'

var urls = '';
const {width, height} = Dimensions.get('window');
import Toast from '../../Components/Toast'
import Modals from 'react-native-modal'

// let {Platform} = React;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let year = new Date().getFullYear();
let month = (new Date().getMonth() + 1) < 10 ? '0'+(new Date().getMonth() + 1):(new Date().getMonth() + 1);
let day = new Date().getDate() < 10 ? '0' + new Date().getDate(): new Date().getDate();
export default class mingxin extends Component {
    static defaultProps = {
        date: new Date(),
        stime: year + '-' + month + '-' + day,
        etime: year + '-' + month + '-' + day,
        data: [],
        scrollY: height,
        hangshu: 0,
    }
    static navigationOptions = {
        headerBackTitle: null,
        headerStyle: {
            height: 40
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            isShowDate: false,
            loaded: false,
            ReceiveCode: '',
            dayCounts: '',
            date: this.props.date,
            edate: this.props.date,
            stime: this.props.stime,//开始时间
            etime: this.props.etime,//结束时间
            getes:0,
            // etime: new Date(),
            monthsCounts: '',
            names: [],
            showgonghao: true,
            hangshu: this.props.hangshu,
            scrollY: this.props.scrollY,
            data: this.props.data,
            dataSource: ds.cloneWithRows(this.props.data),
            pageNum: 1,
        };
        this.onLoad()
        this.setDate = this.setDate.bind(this)
    }

    getName(val) {
        if (val.id == 116) {
            this.setState({
                saoGongHName: val.name
            })
        }
        if (val.id == 68) {
            this.setState({
                saoyiSName: val.name
            })
        }
        if (val.id == 122) {
            this.setState({
                dayName: val.name
            })
        }
        if (val.id == 123) {
            this.setState({
                monthName: val.name
            })
        }
        if (val.id == 120) {
            this.setState({  // 此员工号不存在
                errorMessage: val.name
            })
        }
        if (val.id == 118) { // 该员工已离职
            this.setState({
                errorMessageName: val.name
            })
        }
        if (val.id == 129) {
            this.setState({
                message129: val.name
            })
        }
        if (val.id == 130) {
            this.setState({
                message130: val.name
            })
        }
        if (val.id == 313){
            this.setState({
                stimeName:val.name
            })
        }
        if (val.id == 314){
            this.setState({
                etimeName:val.name
            })
        }
        if (val.id == 53){
            this.setState({
                quxiao:val.name
            })
        }
        if (val.id == 66){
            this.setState({
                queren:val.name
            })
        }
        if (val.id == 315){
            this.setState({
                chaXunName:val.name
            })
        }
        if (val.id == 316){
            this.setState({
                message316:val.name
            })
        }
        if (val.id == 317){
            this.setState({
                message317:val.name
            })
        }
        if (val.id == 318){
            this.setState({
                message318:val.name
            })
        }
        if (val.id == 319){
            this.setState({
                message319:val.name
            })
        }
        if (val.id == 320){
            this.setState({
                message320:val.name
            })
        }
        if (val.id == 321){
            this.setState({
                message321:val.name
            })
        }
        if (val.id == 322){
            this.setState({
                message322:val.name
            })
        }
        if (val.id == 323){
            this.setState({
                message323:val.name
            })
        }
        if (val.id == 324){
            this.setState({
                message324:val.name
            })
        }
        if (val.id == 325){
            this.setState({
                message325:val.name
            })
        }
        if (val.id == 326){
            this.setState({
                message326:val.name
            })
        }
        if (val.id == 327){
            this.setState({
                message327:val.name
            })
        }
        if (val.id == 328){
            this.setState({
                message328:val.name
            })
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
        AsyncStorage.getItem('systemDefault', (error, result) => {
            var res = JSON.parse(result);
            if (result != null) {
                this.setState({
                    saveYuan: res[0].saveYuan,
                    showgonghao: !res[0].saveYuan,
                })
                if (res[0].saveYuan) {
                    this.getData(this.state.names.userno)
                }
            } else {
                this.setState({
                    saveYuan: false,
                })
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
                    if (val.id == 7) {
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
    }

    componentDidMount() {
        AsyncStorage.getItem('dataBase', (error, result) => {
            var res = JSON.parse(result)
            console.log(res)
            if (res != null) {
                urls = 'http://' + res[0].ipValue + ':' + res[0].serviceportValue
            } else {
                return
            }
        })
        this.setState({
            ReceiveCode: '',
            dayCounts: '',
            monthsCounts: ''
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

    //  时间选择框 优化方案2
    datePick = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                locale: 'zh-Hans'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                if (this.state.getes!= 0&&this.state.getes == 1){
                    this.setState({
                        date: new Date(),
                        stime: year + '-' + this.joint(month + 1) + '-' + this.joint(day)
                    })
                }else {
                    this.setState({
                        edate: new Date(),
                        etime: year + '-' + this.joint(month + 1) + '-' + this.joint(day)
                    })
                }

                // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                // ToastAndroid.show(`选择的时间是：${year}-${month + 1}-${day}`, ToastAndroid.SHORT);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{
                    // margin:,
                    width: '100%',
                    paddingVertical: 0,
                    backgroundColor: '#f5f7f9',
                    // backgroundColor: '#ffffff',
                    borderRadius: 10,
                    paddingBottom: 20,
                    // marginTop: 10,
                    // marginLeft: 10,
                    // marginRight: 10,
                    marginBottom: 80,}}>
                    <View style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                        paddingBottom: 20,
                        margin: 10,
                        marginBottom: 0,
                    }}>
                        <Text style={styles.nameStyles}>
                            {this.state.titleName}
                        </Text>
                        <View style={styles.contentForm}>
                            <View style={styles.formStyles}>
                                <Text style={styles.textStyles}>{this.state.saoGongHName}:</Text>
                                <TextInput
                                    style={styles.inputStyles}
                                    underlineColorAndroid="transparent"
                                    editable={this.state.showgonghao}
                                    onChangeText={(e) => this.setState({ReceiveCode: e})}
                                    value={this.state.saveYuan ? this.state.names.userno : this.state.ReceiveGongHao}
                                    onEndEditing={(event) => (
                                        this.getData(event.nativeEvent.text)
                                    )}
                                />
                                {
                                    this.state.saveYuan ?
                                        <Text style={{width: 32, height: 36}}></Text> :
                                        <TouchableOpacity style={styles.scanStyles}
                                                          onPress={() => this.props.navigation.navigate('Saoma', {
                                                              callBack: (e) => {
                                                                  this.getData(e)
                                                              }
                                                          })}>
                                            <Image style={{width: 20, height: 20}} source={{uri: 'saomab'}}/>
                                            <Text style={{fontSize: 8, color: '#000000'}}>{this.state.saoyiSName}</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.formStyles}>
                                <Text style={styles.textStyles}>{this.state.stimeName}:</Text>
                                <Text
                                    style={styles.inputStyle}
                                    onPress={() => {
                                        this.setState({
                                            getes: 1,
                                        })
                                        // alert(Platform)
                                        // console.error(Platform.OS)
                                        if (Platform.OS == 'android') {
                                            this.datePick()
                                        } else {
                                            this.setState({
                                                isShowDate: true,
                                            })
                                        }

                                        // this.setState({isShowDate:true})
                                        // alert(this.state.isShowDate)
                                    }}
                                >{this.state.stime}</Text>
                                {/*<DatePickerIOS/>*/}
                                <View style={styles.scanStyles}>

                                </View>
                            </View>
                            <View style={styles.formStyles}>
                                <Text style={styles.textStyles}>{this.state.etimeName}:</Text>
                                <Text
                                    style={styles.inputStyle}
                                    onPress={() => {
                                        this.setState({
                                            getes: 2,
                                        })
                                        // alert(Platform)
                                        // console.error(Platform.OS)
                                        if (Platform.OS == 'android') {
                                            this.datePick()
                                        } else {
                                            this.setState({
                                                isShowDate: true,
                                            })
                                        }
                                    }}
                                >{this.state.etime}</Text>
                                {/*<DatePickerIOS/>*/}
                                <View style={styles.scanStyles}>

                                </View>
                            </View>
                            <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width: width - 40,
                                marginTop: 10,
                                marginBottom: 10,}}>
                                {/*<Text style={{borderRadius: 5,borderWidth: 1,minWidth:'100%',minHeight:40,paddingRight: 10,paddingLeft:10,}}>{'查询'}</Text>*/}
                                <CustomButton onPress={()=>{
                                    this.submitChaxun()
                                }}
                                              bgColor={'#74b9ff'}
                                              text={this.state.chaXunName}
                                              style={{minWidth:80,minHeight:40,textAlign:'center',borderRadius:10,overflow: 'hidden',fontSize:18}}
                                              size={30}/>
                            </View>
                        </View>
                    </View>


                    {/*<View style={styles.formStyles}>*/}
                    {/*    <Text style={styles.textStyles}>{this.state.monthName}:</Text>*/}
                    {/*    <TextInput*/}
                    {/*        editable={false}*/}
                    {/*        style={styles.inputStyles}*/}
                    {/*        underlineColorAndroid="transparent"*/}
                    {/*        value={this.state.monthsCounts}*/}
                    {/*    />*/}
                    {/*    <View style={styles.scanStyles}>*/}

                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={styles.tablecontent}>
                        <ListView
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}//关联state中的datasource
                            renderRow={(item) => this.renderRow(item)}//制定listView的显示效果
                            //行与行之间的分割线，用renderSeparator实现
                            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                                this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)
                            }
                            //页脚，底部的图片和文字，提示性，图片和文字都可以
                            // renderFooter={() => this.renderFooter()}
                            // 下拉刷新，要用到RefreshControl，需要导入
                            refreshControl={
                                <RefreshControl refreshing={this.state.loaded} onRefresh={() => this.onLoad()}/>
                            }
                        />
                        <Toast
                            ref={toast => {
                                this.toast = toast
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0 - this.state.scrollY + this.state.scrollY,
                    left: 0,
                    width: width,
                    height: 80,
                    backgroundColor: '#e5f7ff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                }}>
                    {/*<Text style={{ flex:1,}}>总行数:</Text>*/}
                    <Button onPress={(item) => this.fenye(0)} style={styles.Footerbuttons} title={`${this.state.message316}`}/>
                    <Button onPress={(item) => this.fenye(1)} style={styles.Footerbuttons} title={`${this.state.message317}`}/>
                    {/*<Text style={{ flex:1,}}>当前页数:</Text>*/}
                </View>
                <Modal
                    style={{margin: 0, padding: 0}}
                    // animationType={"slide"}
                    animationIn='fadeIn'
                    animationOut='slideOut'
                    transparent={true}
                    visible={this.state.isShowDate}
                    onRequestClose={() => {
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            width: width,
                            height: 300,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                        }}>
                            <View style={{flexDirection: 'row', height: 30,}}>
                                <TouchableOpacity onPress={this.closeModal.bind(this)}
                                                  style={{
                                                      position: 'absolute',
                                                      left: 20,
                                                      width: 40,
                                                      height: 30,
                                                      marginTop: 10
                                                  }}>
                                    <Text style={{fontSize: 15, alignSelf: 'center'}}>{this.state.quxiao}</Text>
                                </TouchableOpacity>
                                {/*<Text style={{fontSize: 17}}>选择开始日期</Text>*/}
                                <TouchableOpacity
                                    style={{position: 'absolute', right: 20, width: 40, height: 30, marginTop: 10}}
                                    onPress={this.setDate}>
                                    <Text style={{fontSize: 15, alignSelf: 'center'}}>{this.state.queren}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePickerIOS
                                date={this.state.getes==1?this.state.date:this.state.edate}
                                format='YYYY-MM-DD'
                                onDateChange={(newDate) => {
                                    let sdate = this.state.date;
                                    let edate = this.state.edate;
                                    let stime = sdate.getFullYear()+'-'+ this.joint(sdate.getMonth()+1)+'-'+this.joint(sdate.getDate())
                                    let etime = edate.getFullYear()+'-'+ this.joint(edate.getMonth()+1)+'-'+this.joint(edate.getDate())
                                    if (this.state.getes!=0&&this.state.getes == 1){//stime
                                        this.setState({date: newDate});
                                        this.setState({stime: stime})
                                    }else {
                                        this.setState({edate: newDate});
                                        this.setState({etime: etime})
                                        // this.setState({getes:0,isShowDate: false, stime: new Date().toLocaleDateString().replace(/\//g, '-')})
                                    }


                                }}
                                mode='date'
                                // minimumDate={this.state.minimumDate}
                                // maximumDate={this.state.maximumDate}
                                locale={'zh-Hans'}

                            />
                        </View>
                    </View>
                </Modal>
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
    //渲染数据
    renderRow(item) {
        // console.error(item)
        return <View style={styles.row}>
            <TouchableOpacity onPress={() => {//点击一行显示姓名，要用到TouchableOpacity组件
            }}>
                {/*{list}*/}
                <View  style={styles.touch}>
                    <Text style={styles.texts}>{this.state.message321}: {item.gongxuhao}</Text>
                    <Text style={styles.texts}>{this.state.message322}: {item.gongxuname}</Text>
                </View>
                <View  style={styles.touch}>
                    <Text style={styles.texts}>{this.state.message323}: {item.kuanhao}</Text>
                    <Text style={styles.texts}>{this.state.message324}: {item.q}</Text>
                </View>
                <View  style={styles.touch}>
                    <Text style={styles.texts}>{this.state.message325}: {item.zhahao}</Text>
                    <Text style={styles.texts}>{this.state.message326}: {item.c}</Text>
                </View>
                <View  style={styles.touch}>
                    <Text style={styles.texts}>{this.state.message327}: {item.t}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    //初始化加载
    onLoad() {
        setTimeout(() => {
            this.setState({
                loaded: false
            })
        }, 1000)
    }
    //行风格线
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }
    //日期月日拼接0
    joint(str){
        if (str < 10){
            str = "0" + str;
        }
        return str
    }
    //分页
    fenye(type) {
        let page = this.state.pageNum;
        let isXia=true;
        if (type == 0) {
            page = page - 1;
        } else {
            if (page*10 > this.state.hangshu){
                isXia = false;

            }
            page = page + 1;
        }
        // alert(page > 0 && this.state.tiaoma != '')

        if (page > 0 && this.state.ReceiveCode != '' && isXia) {
            this.getDateRenter(page)
        } else if (this.state.ReceiveCode == '') {
            this.refs.toast.show(this.state.message328, 3000);
        } else if (!isXia){
            this.refs.toast.show(this.state.message319, 3000);
        }else {
            this.refs.toast.show(this.state.message318, 3000);
        }
    }

    getDateRenter(page) {
        _this=this
        this.setState({
            loaded: true,
            // ReceiveCode: e
        })
        if (this.state.ReceiveCode == '' || this.state.ReceiveCode == 'undefined' || this.state.ReceiveCode == null){
            // console.error(url)
            this.setState({
                loaded: false
            })
            this.refs.toast.show(this.state.message328, 3000);
            return ;
        }
        // var timestamp = Date.parse(new Date()) / 1000;
        const url = urls + "/index.php/api/index/chafei1?&EId=" + this.state.ReceiveCode + "&stime=" + this.state.stime+"&etime="+this.state.etime +"&page="+page;
        // console.error(url)
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
                console.log(json)
                if (json.state === 'success') {
                    this.setState({
                        hangshu:json.data.count,
                        //ReceiveCode:'',
                        data: json.data.data,
                        // ifDataEmpty: false,
                        // tiaoma: e,
                        dataSource: ds.cloneWithRows(json.data.data),
                        loaded: false,
                        // notelang: notelang
                    });

                } else if (json.state == 'error') {
                    let data = [];
                    this.setState({
                        data: data,
                        hangshu: 0,
                        loaded: false,
                        // ifDataEmpty: true,
                        dataSource: ds.cloneWithRows(data),
                    })
                    if (json.msgcode == '004') {
                        this.refs.toast.show(this.state.message129, 3000);
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

    // 点击查询
    submitChaxun(){
        _this=this
        this.setState({
            loaded: true,
            // ReceiveCode: e
        })
        if (this.state.ReceiveCode == '' || this.state.ReceiveCode == 'undefined' || this.state.ReceiveCode == null){
            // console.error(url)
            this.setState({
                loaded: false
            })
            this.refs.toast.show(this.state.message328, 3000);
            return ;
        }
        // var timestamp = Date.parse(new Date()) / 1000;
        const url = urls + "/index.php/api/index/chafei1?&EId=" + this.state.ReceiveCode + "&stime=" + this.state.stime+"&etime="+this.state.etime +"&page="+this.state.pageNum;
        // console.error(url)
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
                console.log(json)
                if (json.state === 'success') {
                    // console.error(json)
                    this.setState({
                        hangshu:json.data.count,
                        //ReceiveCode:'',
                        data: json.data.data,
                        // ifDataEmpty: false,
                        // tiaoma: e,
                        dataSource: ds.cloneWithRows(json.data.data),
                        loaded: false,
                        // notelang: notelang
                    });
                    // console.error(this.state.dataSource)

                } else if (json.state == 'error') {
                    let data = [];
                    this.setState({
                        data: data,
                        hangshu: 0,
                        loaded: false,
                        // ifDataEmpty: true,
                        dataSource: ds.cloneWithRows(data),
                    })
                    if (json.msgcode == '004') {
                        this.refs.toast.show(this.state.message129, 3000);
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
    //点击确认
    setDate(newDate) {
        let sdate = this.state.date;
        let edate = this.state.edate;
        let stime = sdate.getFullYear()+'-'+ this.joint(sdate.getMonth()+1)+'-'+this.joint(sdate.getDate())
        let etime = edate.getFullYear()+'-'+ this.joint(edate.getMonth()+1)+'-'+this.joint(edate.getDate())
        // let month= time.match(/);
        if (this.state.getes!=0&&this.state.getes == 1){//stime
            this.setState({isShowDate: false, stime: stime})
        }else {
            this.setState({isShowDate: false, etime: etime})
        }
    }
    //点击取消
    closeModal() {
        let time = new Date();
        time =  time.getFullYear()+'-'+ this.joint(time.getMonth()+1)+'-'+this.joint(time.getDate())
        // let sdate = this.state.date;
        // let edate = this.state.date;
        // let stime = sdate.getFullYear()+'-'+ this.joint(sdate.getMonth()+1)+'-'+this.joint(sdate.getDate())
        // let etime = edate.getFullYear()+'-'+ this.joint(edate.getMonth()+1)+'-'+this.joint(edate.getDate())
        if (this.state.getes!=0&&this.state.getes == 1){//stime
            this.setState({isShowDate: false, stime: time})
        }else {
            this.setState({isShowDate: false, etime: time})
        }
    }


    getData(e) {
        _that = this;
        if (e == '') {
            return
        }
        ;
        this.setState({
            // loaded: true,
            ReceiveCode: e
        })
    }

}

const styles = StyleSheet.create({
    scanStyles: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 40,
        flex: 0.2
    },
    formStyles: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width - 40,
        marginTop: 10,
        marginBottom: 10,
    },
    textStyles: {
        color: '#000000',
        fontSize: 18,
        marginRight: 10,
        flex: 0.6,
        textAlign: 'right'
    },
    inputStyle:{
        // textAlign:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize:18,
        width: 180,
        backgroundColor: '#e5f7ff',
        borderRadius: 10,
        height: 40,
        paddingTop: 10,
        paddingLeft: 20,
        borderColor: '#c8c8c8',
        borderWidth: 1,
        flex: 1
    },
    inputStyles: {
        // textAlign:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize:16,

        width: 180,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 40,
        paddingLeft: 20,
        borderColor: '#c8c8c8',
        borderWidth: 1,
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7f9',
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
    contentForm:{
        marginRight: 10,
        marginLeft:10,
        marginTop: 10,
        backgroundColor: '#e5f7ff',
        borderRadius: 10,
    },
    tablecontent: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        margin: 10,
        marginTop: 15,
        paddingBottom: 5,
    },
    Footerbuttons: {
        flex: 1,
        fontSize: 15,
        marginBottom: 5,
    },
    row: {
        // flexDirection: "row",
        // flex: 1,
        // height: 60,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    touch: {
        flex: 1,
        flexDirection: 'row'
    },
    texts: {
        flex: 1,
        // width:50,
        fontSize: 15,
        marginBottom: 5,
        // marginLeft: 10,
        // marginTop: 7
    },
    line: {
        // marginTop: 8,
        height: 1,
        backgroundColor: '#F0F0F0'
    },
});
