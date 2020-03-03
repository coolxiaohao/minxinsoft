import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Button,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    BackHandler,
    ListView,
} from 'react-native';
import loadingImage from '../../img/loading.gif'

var urls = '';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const {width, height} = Dimensions.get('window');
import Toast from '../../Components/Toast'
import Modals from 'react-native-modal'

export default class mingxin extends Component {
    static defaultProps = {
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
            hangshu: this.props.hangshu,
            scrollY: this.props.scrollY,
            data: this.props.data,
            loaded: false,
            dataSource: ds.cloneWithRows(this.props.data),
            ReceiveCode: '',
            tiaoma1: '',
            tiaoma2: '',
            showtiaoma: true,
            notelang: [],
            lang: 'cn',
            //网络获取的数据是否为空
            // ifDataEmpty: true,
            pageNum: 1,
        };
        this.onLoad()
    }

    getName(val) {
        // if (val.id == 329) {
        //     this.setState({
        //         tiaoxingma: val.name
        //     })
        // }
        if (val.id == 337) {
            this.setState({
                message337: val.name
            })
        }
        if (val.id == 338) {
            this.setState({
                message338: val.name
            })
        }
        if (val.id == 339) {
            this.setState({
                message339: val.name
            })
        }
        // if (val.id == 329) {
        //     this.setState({
        //         tiaoxingma: val.name
        //     })
        // }
        if (val.id == 336) {
            this.setState({
                titleName: val.name
            })
        }
        if (val.id == 331) {
            this.setState({
                message331: val.name
            })
        }
        if (val.id == 318) {
            this.setState({
                message318: val.name
            })
        }
        if (val.id == 319) {
            this.setState({
                message319: val.name
            })
        }
        if (val.id == 316) {
            this.setState({
                message316: val.name
            })
        }
        if (val.id == 317) {
            this.setState({
                message317: val.name
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
            if (val.code == 'cn') {
                this.setState({
                    lang: 'cn'
                })
            } else {
                this.setState({
                    lang: 'en'
                })
            }
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
            }
        })
        AsyncStorage.getItem('langArr', (error, result) => {
            var res = JSON.parse(result)
            // console.error(res)
            if (result != null) {
                var newArr = []
                res.map((val) => {
                    // if (val.code == 'cn') {
                    //     this.setState({
                    //         lang: 'cn'
                    //     })
                    // } else {
                    //     this.setState({
                    //         lang: 'en'
                    //     })
                    // }
                    if (val.pid == 46) {
                        return newArr.push(val)
                    }

                })
                newArr.forEach((val, index) => {
                    this.getName(val)
                })
            } else {
                console.log(error)
            }
        })
        AsyncStorage.getItem('systemDefault', (error, result) => {
            //console.log(JSON.parse(result))
            var res = JSON.parse(result);
            if (result != null) {
                this.setState({
                    choseAll: res[0].choseAll,
                })
            } else {
                this.setState({
                    choseAll: true,
                })
            }
        })
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
            dataSource: ds.cloneWithRows(this.state.data),
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
                <KeyboardAvoidingView>
                    <ScrollView style={{paddingVertical: 0, width: '100%', marginBottom: 80}} onScroll={(event => {
                        {
                            this.setState({scrollY: event.nativeEvent.contentOffset.y})
                        }
                    })}>
                        <View style={styles.chaxun}>
                            <Text style={styles.nameStyles}>
                                {this.state.titleName}
                            </Text>
                            <View style={styles.formContent}>
                                <View style={styles.formStyles}>
                                    <Text style={styles.textStyles}>{this.state.message337}:</Text>
                                    <TextInput
                                        style={styles.inputStyles}
                                        underlineColorAndroid="transparent"
                                        editable={this.state.showtiaoma}
                                        onChangeText={(e) => this.setState({tiaoma1: e})}
                                        value={this.state.tiaoma1}
                                        onEndEditing={(event) => (
                                            this.getTiaoMa(event.nativeEvent.text, 1)
                                        )}
                                    />
                                    <TouchableOpacity style={styles.scanStyles}
                                                      onPress={() => this.props.navigation.navigate('Saoma', {
                                                          callBack: (e) => {
                                                              this.getTiaoMa(e, 1)
                                                          }
                                                      })}>
                                        <Image style={{width: 18, height: 18}} source={{uri: 'saomab'}}/>
                                        <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saoyiSName}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.formStyles}>
                                    <Text style={styles.textStyles}>{this.state.message338}:</Text>
                                    <TextInput
                                        style={styles.inputStyles}
                                        underlineColorAndroid="transparent"
                                        editable={this.state.showtiaoma}
                                        onChangeText={(e) => this.setState({tiaoma2: e})}
                                        value={this.state.tiaoma2}
                                        onEndEditing={(event) => (
                                            this.getTiaoMa(event.nativeEvent.text, 2)
                                        )}
                                    />
                                    <TouchableOpacity style={styles.scanStyles}
                                                      onPress={() => this.props.navigation.navigate('Saoma', {
                                                          callBack: (e) => {
                                                              this.getTiaoMa(e, 2)
                                                          }
                                                      })}>
                                        <Image style={{width: 18, height: 18}} source={{uri: 'saomab'}}/>
                                        <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saoyiSName}</Text>
                                    </TouchableOpacity>
                                </View>
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
                </KeyboardAvoidingView>
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
                    <Button onPress={(item) => this.fenye(0)} style={styles.Footerbuttons}
                            title={`${this.state.message316}`}/>
                    <Button onPress={(item) => this.fenye(1)} style={styles.Footerbuttons}
                            title={`${this.state.message317}`}/>
                    {/*<Text style={{ flex:1,}}>当前页数:</Text>*/}
                </View>

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

    //分页
    fenye(type) {
        let page = this.state.pageNum;
        let isXia = true;
        if (type == 0) {
            page = page - 1;
        } else {
            if (page * 15 > this.state.hangshu) {
                isXia = false;

            }
            page = page + 1;
        }
        // alert(page > 0 && this.state.tiaoma != '')

        if (page > 0 && this.state.tiaoma1 != '' && this.state.tiaoma2 != ''&& isXia) {
            this.getDateRenter(page)
        } else if (this.state.tiaoma1 == '') {
            this.refs.toast.show(this.state.tiaoma1+this.state.message339, 3000);
        }else if ( this.state.tiaoma2 == ''){
            this.refs.toast.show(this.state.tiaoma2+this.state.message339, 3000);
        }else if (!isXia) {
            this.refs.toast.show(this.state.message319, 3000);
        } else {
            this.refs.toast.show(this.state.message318, 3000);
        }
    }

    getDateRenter(page) {
        _that = this;
        this.setState({
            loaded: true,
        })
        if (this.state.tiaoma1 == ''){
            this.refs.toast.show(this.state.tiaoma1+this.state.message339, 3000);
        }
        if (this.state.tiaoma2 == ''){
            this.refs.toast.show(this.state.tiaoma2+this.state.message339, 3000);
        }
        const url = urls + "/index.php/api/index/ercisaomiao?&tiaoma1=" + this.state.tiaoma1 + "&tiaoma2=" + this.state.tiaoma2 + "&page=" + page;
        // const url = urls + "/index.php/api/index/dangesaomiao?&tiaoma=" + e;
        // alert(url)
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
                // console.error()json)
                if (json.state === 'success') {
                    // data = json.data.data;
                    let notelang = json.data.en_or_cn;
                    this.setState({
                        hangshu: json.data.count,
                        pageNum: page,
                        //ReceiveCode:'',
                        data: json.data.data,
                        // ifDataEmpty: false,
                        tiaoma: this.state.tiaoma,
                        dataSource: ds.cloneWithRows(json.data.data),
                        loaded: false,
                        notelang: notelang
                    });
                } else if (json.state == 'error') {
                    let data = [];
                    this.setState({
                        data: data,
                        hangshu: 0,
                        loaded: false,
                        // ifDataEmpty: true,
                        dataSource: ds.cloneWithRows(data),
                        notelang: null,
                    })
                    if (json.msgcode == '004') {
                        this.refs.toast.show(this.state.message129, 3000);
                    } else {
                        this.refs.toast.show(json.message, 3000);
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    loaded: false,
                    // ifDataEmpty: false,
                })
                this.refs.toast.show(this.state.message130, 3000);
            });
    }

    onLoad() {
        setTimeout(() => {
            this.setState({
                loaded: false
            })
        }, 1000)
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }

    getTiaoMa(e, type) {
        _that = this;
        if (e == '') {
            return
        }
        // alert(e)
        this.setState({
            loaded: true,
        })

        const url = urls + "/index.php/api/index/ercigettiaoma?&tiaoma=" + e + "&type=" + type;
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
                // console.error()json)
                if (json.state === 'success') {
                    if (type == 1) {
                        this.setState({
                            loaded: false,
                            tiaoma1: e,
                        });
                    } else {
                        this.setState({
                            loaded: false,
                            tiaoma2: e,
                        });
                    }
                    if (this.state.tiaoma1 != '' && this.state.tiaoma2 != '') {
                        this.getDateRenter(this.state.pageNum)
                    }

                } else if (json.state == 'error') {
                    if (type == 1) {
                        this.setState({
                            loaded: false,
                            tiaoma1: '',
                        });
                    } else {
                        this.setState({
                            loaded: false,
                            tiaoma2: '',
                        });
                    }
                    if (json.msgcode == '004') {
                        this.refs.toast.show(this.state.message129, 3000);
                    } else {
                        this.refs.toast.show(json.message, 3000);
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    loaded: false,
                    // ifDataEmpty: false,
                })
                this.refs.toast.show(this.state.message130, 3000);
            });
    }


    renderRow(item) {
        let list = [];
        let num = 1;
        let textall;
        // console.error(this.state.notelang)

        if (this.state.notelang != "undefined" && this.state.notelang != null) {
            this.state.notelang.map((val, index) => {
                let ziduan = '';
                for (let i in item) {
                    ziduan = item[val.ziduan];
                }
                let text = '';
                if (ziduan != "undefined" && ziduan != null && ziduan != '') {
                    if (this.state.lang == 'cn') {
                        text = <Text style={styles.texts} key={index}>{val.zhongwen}: {ziduan}</Text>;
                    } else {
                        text = <Text style={styles.texts} key={index}>{val.yinwen}: {ziduan}</Text>;
                        // list.push(<Text style={styles.texts} key={index}>{val.yinwen}: {ziduan}</Text>);
                    }
                    if (num % 2 == 0) {
                        list.push(<View key={index} style={styles.touch}>{textall}{text}</View>);
                        textall = null;
                    } else {
                        textall = text;
                        //最后一个
                        if (num == this.state.notelang.length) {
                            // alert(val.ziduan);
                            list.push(<View key={index} style={styles.touch}>{textall}</View>)
                            textall = null;
                        }
                    }
                    num++;
                }

            });
        }
        // console.error(list)
        return <View style={styles.row}>
            <TouchableOpacity onPress={() => {//点击一行显示姓名，要用到TouchableOpacity组件
            }}>
                {list}
            </TouchableOpacity>
        </View>
    }

}

const styles = StyleSheet.create({

    Footerbuttons: {
        flex: 1,
        fontSize: 15,
        marginBottom: 5,
    },
    touch: {
        flex: 1,
        flexDirection: 'row'
    },
    tablecontent: {
        // height:200,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        margin: 10,
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
    formContent: {
        // maxWidth:width - 20,
        backgroundColor: '#e5f7ff',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        // paddingTop: 15,
        paddingBottom: 10,
        marginTop: 10,
        // marginRight:10,
        // marginLeft: 10,
    },
    formStyles: {
        backgroundColor: '#e5f7ff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width - 40,
        marginTop: 15,
        // paddingTop: 10,


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
    tablecontainer: {
        flex: 1,
        padding: 16,
        paddingTop: 20
    },
    head: {
        height: 40,
        backgroundColor: '#21b9fc'
    },
    text: {
        margin: 6
    },
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
        // maxWidth:width - 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
        margin: 10,
        marginBottom: 0,
    },
    row: {
        // flexDirection: "row",
        // flex: 1,
        // height: 60,
        backgroundColor: '#ffffff',
        padding: 10,
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
