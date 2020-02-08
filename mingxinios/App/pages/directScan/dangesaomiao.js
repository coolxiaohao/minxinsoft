import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Alert,
    // RefreshControl,
    Image,
    Dimensions,
    TextInput,
    // ToastAndroid,
    // Modal,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    BackHandler,
    ListView,
    TouchableHighlight
} from 'react-native';
// import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
// import CustomList from "../../Components/CustomList";
import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'

var urls = '';
var data = [];
var tableData: [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const {width, height} = Dimensions.get('window');
import Toast from '../../Components/Toast'
import Modals from 'react-native-modal'

export default class mingxin extends Component {
    static defaultProps = {}
    static navigationOptions = {
        headerBackTitle: null,
        headerStyle: {
            height: 40
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataSource: ds.cloneWithRows(data),
            ReceiveCode: '',
            tiaoma: '',
            showtiaoma: true,
            notelang: [],
            lang: '',
        };
        // this.onLoad()
    }

    //渲染
    // renderRow(item) {
    //     return <View style={styles.row}>
    //         <TouchableOpacity onPress={() => {//点击一行显示姓名，要用到TouchableOpacity组件
    //             // this.toast.show('你单击了：' + item.fullName, DURATION.LENGTH_LONG)
    //         }}>
    //             <Text style={styles.text1}>姓名：{item.fullName}</Text>
    //             <Text style={styles.text2}>邮箱：{item.email}</Text>
    //             <Text style={styles.text3}>time：{item.time}</Text>
    //         </TouchableOpacity>
    //     </View>
    // }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }

    // renderFooter() {
    //     // return <Image style={{width:400,height:100}} source={{uri:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'}}></Image>
    //     return <View style={{justifyContent: "center", height: 20, alignItems: 'center'}}>
    //         <Text style={styles.tip}>我是有底线的</Text>
    //     </View>
    // }

    // 刷新的状态，时间2s
    // onLoad() {
    //     setTimeout(() => {
    //         this.setState({
    //             isLoading: false
    //         })
    //     }, 2000)
    // }

    getName(val) {
        if (val.id == 1013) {
            this.setState({
                tiaoxingma: val.name
            })
        }
        if (val.id == 119) {
            this.setState({
                shuliang: val.name
            })
        }
        if (val.id == 68) {
            this.setState({
                saoyiSName: val.name
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
    }

    read() {
        AsyncStorage.getItem('userInfo', (error, result) => {
            if (!error) {
                this.setState({
                    names: JSON.parse(result)
                })
                // console.error(result)
                //console.error(this.state.names.user_token)
                //this.state.names = JSON.parse(result)
            }
        })
        AsyncStorage.getItem('langArr', (error, result) => {
            var res = JSON.parse(result)
            // console.error(res)
            if (result != null) {
                var newArr = []
                res.map((val) => {
                    if (val.code == 'cn'){
                        this.setState({
                            lang: 'cn'
                        })
                    }else {
                        this.setState({
                            lang: 'en'
                        })
                    }
                    if (val.pid == 46) {
                        return newArr.push(val)
                    }
                    if (val.id == 1012) {
                        this.setState({
                            titleName: val.name
                        })
                    }
                })
                // alert(JSON.stringify(newArr))
                newArr.forEach((val, index) => {
                    this.getName(val)
                })
            } else {
                console.log(error)
            }
        })
        // AsyncStorage.getItem('lang',(error,result)=>{
        //     //console.log(JSON.parse(result))
        //     var res = JSON.parse(result);
        //     console.error(res)
        //     if(result != null){
        //         this.setState({
        //             ishuoquK: res[0].ishuoquK,
        //         })
        //     }else{
        //         this.setState({
        //             ishuoquK: false
        //         })
        //     }
        // })
    }

    componentDidMount() {
        AsyncStorage.getItem('dataBase', (error, result) => {
            var res = JSON.parse(result)
            // console.error(res)
            console.log(res)
            if (res != null) {
                urls = 'http://' + res[0].ipValue + ':' + res[0].serviceportValue
            } else {
                return
            }
        })
        this.setState({
            dataSource: ds.cloneWithRows(data),
            tiaoma: '',
            // dataString:'',data
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
        return (
            <View style={styles.container}>
                <ScrollView style={{paddingVertical: 0, width: '100%'}}>
                    <View style={styles.chaxun}>
                        <Text style={styles.nameStyles}>
                            {this.state.titleName}
                        </Text>
                        <View style={styles.formStyles}>
                            <Text style={styles.textStyles}>{this.state.tiaoxingma}:</Text>
                            <TextInput
                                style={styles.inputStyles}
                                underlineColorAndroid="transparent"
                                editable={this.state.showtiaoma}
                                onChangeText={(e) => this.setState({tiaoma: e})}
                                value={this.state.tiaoma}
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
                                <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saoyiSName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            // refreshControl={
                            //     <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.onLoad()}/>
                            // }
                        />
                        <Toast
                            ref={toast => {
                                this.toast = toast
                            }}
                        />
                    </View>

                </ScrollView>


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

    // render() {
    //     const state = this.state;
    //     return (
    //
    //     )
    // }
    getData(e) {
        _that = this;
        if (e == '') {
            return
        }
        // alert(e)
        this.setState({
            loaded: true,
            ReceiveCode: e
        })
        // var timestamp = Date.parse(new Date()) / 1000;
        // this.setState({
        //     loaded: false,
        //     ReceiveCode: e
        // })
        const url = urls + "/index.php/api/index/dangesaomiao?&tiaoma=" + e;
        // alert(url)
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
                // console.error()json)
                if (json.state === 'success') {
                    data = json.data;

                    this.setState({
                        //ReceiveCode:'',
                        tiaoma: e,
                        dataSource: ds.cloneWithRows(data),
                        loaded: false,
                        notelang: data.en_or_cn
                        // dataString: text
                        // dayCounts: json.data[0].zhongfeishu,
                        // monthsCounts: json.data[0].shijishuliang
                    });
                } else if (json.state == 'error') {
                    this.setState({
                        loaded: false,
                        // dayCounts: '',
                        // monthsCounts: ''
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

                // console.error(error)
                this.setState({
                    loaded: false
                })
                this.refs.toast.show(this.state.message130, 3000);
                //alert(this.state.message130)
            });
    }

    //
    renderRow(item) {
        let list = [];
        // let arrdata = [];
        // console.error(item.r49b001)

        // console.error(arrdata)
        this.state.notelang.map((val,index) => {
            let ziduan = '';
            // alert(val.ziduan)
            for (let i in item){
                ziduan=item[val.ziduan];
                // ziduan = item[val.ziduan];
                // console.error(item['r49b001'])
                // arrdata.push(item);
            }
            if (this.state.lang == 'cn'){
                list.push(<Text style={styles.texts}>{val.zhongwen}: {ziduan}</Text>);
            }else {
                list.push(<Text style={styles.texts}>{val.yinwen}: {ziduan}</Text>);
            }

        });
        return <View style={styles.row}>
            <TouchableOpacity onPress={() => {//点击一行显示姓名，要用到TouchableOpacity组件
                // this.toast.show('你单击了：' + item.fullName, DURATION.LENGTH_LONG)
            }}>
                {list}
            </TouchableOpacity>
        </View>
    }

}

const styles = StyleSheet.create({
    tablecontent: {
        // height:200,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        margin: 5,
        marginTop: 15,
        paddingBottom: 5,
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
    scanStyles: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 40,
        flex: 0.2
    },
    formStyles: {
        backgroundColor: '#e5f7ff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width - 40,
        marginTop: 10,
        marginLeft: 10,
        paddingTop: 30,
        paddingBottom: 10,
        borderRadius: 10,
        // marginBottom: 10,
    },
    textStyles: {
        color: '#000000',
        fontSize: 18,
        marginRight: 10,
        flex: 0.4,
        textAlign: 'right'
    },
    inputStyles: {
        width: 180,
        backgroundColor: 'white',
        borderRadius: 6,
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
    tablecontainer: {flex: 1, padding: 16, paddingTop: 20},
    head: {height: 40, backgroundColor: '#21b9fc'},
    text: {margin: 6},
    nameStyles: {
        backgroundColor: '#ffffff',
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
    chaxun: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom: 20,
        margin: 10,
        marginBottom: 0,
    },
    row: {
        // flexDirection: "row",
        // flex: 1,
        // height: 60,
        backgroundColor:'#f1f9f9',
        padding: 10,
    },
    texts: {

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
