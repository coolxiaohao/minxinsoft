/**
 * @author: tanhao
 * @desc: 调拨单
 * @date: 2020-02-26
 * */
import React, {Component} from 'react';
import {
    Dimensions,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Modals from "react-native-modal";
import loadingImage from "../../img/loading.gif";
import Toast from "../../Components/Toast";
import CustomButton from "../../Components/CustomButton";
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');
class allotGhao extends Component {
    //默认父组件穿来的值
    static defaultProps = {
        // title:'调拨单',
    }
    //默认herder
    static navigationOptions = ({navigation}) => {
        return {
            // headerStyles:{backgroundColor:'#e5f7ff'},
            headerTitle: navigation.getParam('herderTitleName'),
            headerBackTitle: null,
            headerStyle: {
                backgroundColor:'#e5f7ff',
                borderBottomWidth:0,
                height: navigation.getParam('headerHeight')
            },
            headerRight: <Text style={styles.headerRightView} onPress={() => {
                navigation.state.params.onClickAdd()
            }}>
                <Entypo name='plus' color={'#5f8aff'}
                        size={navigation.getParam('entypoSize') ? navigation.getParam('entypoSize') : 30}/>
            </Text>
            // headerRight: '添加'
        }

    };

    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            inputValue:'',
        };
        this.onChangeText = this.onChangeText.bind(this)
    }

    //语言文字
    getName(val) {

    }

    //
    read() {

    }

    //安卓手机返回健
    onBackAndroid = () => {
        this.props.navigation.goBack()
        return true;
    }

    //右上角点击加号
    onClickAddItem() {
        // alert(11111)
        // console.error(123456)
    }

    //在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
    componentDidMount() {
        this.props.navigation.setParams({
            herderTitleName: '调拨单',
            headerHeight: 40,
            onClickAdd: this.onClickAddItem,
        })
    }

    onChangeText(text) {
        if (text) {
            this.setState({inputValue: text})  //实时变化值
            // clearTimeout(this.settimeId);       //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
            // this.settimeId = setTimeout(() => {
            //     var jsonData = {
            //         "sessionId": global.appInfo.sessionId,
            //         "merchName": text,
            //     };
            //     console.log(jsonData)
                // Utils.fetchData('nsposm/B1404/queryMerchList', jsonData, this.SearchCallback);
            // }, 1000);                                      //让每次要进行fetch请求时先延迟1秒在进行
            // console.log("sheng chen id:" + this.settimeId);

        } else {
            this.setState({inputValue: ''})
        }

    }

    //在渲染前调用,在客户端也在服务端。
    componentWillMount() {

    }

    //在组件从 DOM 中移除之前立刻被调用。
    componentWillUnmount() {

    }

    //页面内容
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.ScrollViewStyle}>
                    {/*  搜索框  */}
                    <View style={{paddingRight: 10, paddingLeft: 10, marginTop: 10}}>
                        <View style={{
                            height: 40,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            paddingLeft: 25,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            {/*<Image source={require('../images/search/magnifier.png')}*/}
                            {/*       style={{width: 15, height: 15}}></Image>*/}
                            <Entypo style={{width:'5%',right:10}} name={'magnifying-glass'} size={20}  />
                            <TextInput underlineColorAndroid="transparent" placeholder="商户简称/全称"
                                       style={{marginLeft: 5, width:'75%'}}
                                       onChangeText={this.onChangeText}
                                       value={this.state.inputValue}
                                       ref="keyWordInput"
                                       onSubmitEditing={() => {
                                           this.refs.keyWordInput.blur()
                                       }}>
                            </TextInput>
                            <TouchableOpacity onPress={() => {
                                dismissKeyboard()
                            }} style={{
                                width:'20%',
                                right:10,
                                // borderStyle:'solid',
                                // borderLeftWidth:1,
                                // borderBottomWidth:0,
                                // borderRightWidth:1,
                                // borderTopWidth:0,

                                alignItems:'center'
                            }}>
                                <Text style={{color: '#0391ff', fontSize: 18}}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*listView*/}

                </ScrollView>
                {/*底部固定框*/}
                {/*<View style={{*/}
                {/*    justifyContent: 'center',*/}
                {/*    alignItems: 'center',*/}
                {/*    flex: 1,*/}
                {/*    flexDirection: 'row',*/}
                {/*    position: 'absolute',*/}
                {/*    bottom: 0 - this.state.scrollY + this.state.scrollY,*/}
                {/*    left: 0,*/}
                {/*    width: width,*/}
                {/*    height: 80,*/}
                {/*    backgroundColor: '#e5f7ff',*/}
                {/*    borderTopLeftRadius: 10,*/}
                {/*    borderTopRightRadius: 10,*/}
                {/*    borderBottomRightRadius: 0,*/}
                {/*    borderBottomLeftRadius: 0,*/}
                {/*}}>*/}
                {/*    /!*<Text style={{ flex:1,}}>总行数:</Text>*!/*/}
                {/*    /!*bgColor={'#74b9ff'}*!/*/}
                {/*    /!*text={this.state.chaXunName}*!/*/}
                {/*    /!*style={{minWidth:80,minHeight:40,textAlign:'center',borderRadius:10,overflow: 'hidden',fontSize:18}}*!/*/}
                {/*    /!*size={30}*!/*/}
                {/*    <CustomButton onPress={(item) => this.fenye(0)} style={styles.Footerbuttons} title={`${this.state.message316}`}/>*/}
                {/*    <CustomButton onPress={(item) => this.fenye(1)} style={styles.Footerbuttons} title={`${this.state.message317}`}/>*/}
                {/*    /!*<Text style={{ flex:1,}}>当前页数:</Text>*!/*/}
                {/*</View>*/}
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#e5f7ff',
        width : width,
        minHeight: height,
    },
    headerRightView: {
        paddingRight: 10,
    },
    ScrollViewStyle: {},
})
export default allotGhao;
