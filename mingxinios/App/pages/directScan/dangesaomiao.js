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
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    BackHandler, ListView, TouchableHighlight
} from 'react-native';
import {Table,TableWrapper,Row,Rows,Col,Cols,Cell} from 'react-native-table-component';

import utils from '../../utils/utils'
import loadingImage from '../../img/loading.gif'

var urls = '';
var data = [];
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
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '456\n789'],
                ['a', 'b', 'c', 'd']
            ]
        };
    }

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
                //console.error(this.state.names.user_token)
                //this.state.names = JSON.parse(result)
            }
        })
        // AsyncStorage.getItem('systemDefault', (error, result) => {
        //     var res = JSON.parse(result);
        //     if (result != null) {
        // this.setState({
        //     saveYuan: res[0].saveYuan,
        //     showgonghao: !res[0].saveYuan,
        // })
        // if (res[0].saveYuan) {
        //     this.getData(this.state.names.userno)
        // }
        // } else {
        // this.setState({
        //     saveYuan: false,
        // })
        // }

        // })
        AsyncStorage.getItem('langArr', (error, result) => {
            var res = JSON.parse(result)
            //console.log(res)
            if (result != null) {
                var newArr = []
                res.map((val) => {
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
                newArr.forEach((val,index)=>{
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
            dataSource: ds.cloneWithRows(data),
            tiaoma: ''
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
                <ScrollView style={{paddingVertical: 0,}}>
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
                            <Text style={{fontSize: 6, color: '#000000'}}>{this.state.saomaBtn}</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={styles.formStyles}>*/}
                    {/*    <Text style={styles.textStyles}>{this.state.dayName}:</Text>*/}
                    {/*    <TextInput*/}
                    {/*        style={styles.inputStyles}*/}
                    {/*        underlineColorAndroid="transparent"*/}
                    {/*        editable= {false}*/}
                    {/*        value={this.state.dayCounts}*/}
                    {/*    />*/}
                    {/*    <View style={styles.scanStyles}>*/}

                    {/*    </View>*/}
                    {/*</View>*/}
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
                    {/*<View style={styles.dataStyles}>*/}
                    {/*    <View style={styles.headerStyles}>*/}
                    {/*        <Text style={{flex:1,textAlign:'center',fontSize:12}}>{this.state.tiaoxingma}</Text>*/}
                    {/*        <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.riqi}</Text>*/}
                    {/*        <Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.shuliang}</Text>*/}
                    {/*        /!*<Text style={{flex:0.6,textAlign:'center',fontSize:12}}>{this.state.message156}</Text>*!/*/}
                    {/*        /!*<Text style={{flex:0.4,textAlign:'center',fontSize:12}}>{this.state.caozuoName}</Text>*!/*/}
                    {/*    </View>*/}

                    {/*    <ListView*/}
                    {/*        dataSource={this.state.dataSource}*/}
                    {/*        renderRow={this.renderRow.bind(this)}*/}
                    {/*        enableEmptySections={true}*/}
                    {/*        pageSize={5}*/}
                    {/*        initialListSize={5}*/}
                    {/*        style={{height:100}}*/}
                    {/*    />*/}
                    {/*</View>*/}
                    <View style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={this.state.tableData} textStyle={styles.text}/>
                        </Table>
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
        ;
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
        // console.log(url)
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
                    data.push(json.data);
                    // if (json.data[0].r08a029 == 1) {
                    //     this.refs.toast.show(this.state.errorMessageName, 3000);
                    //     //alert(this.state.errorMessageName)
                    //     _that.setState({
                    //         ReceiveGongHao: '',
                    //         loaded: false,
                    //     })
                    // } else {
                        this.setState({
                            //ReceiveCode:'',
                            dataSource: ds.cloneWithRows(data),
                            loaded: false,
                            // dayCounts: json.data[0].zhongfeishu,
                            // monthsCounts: json.data[0].shijishuliang
                        });
                    // }
                    //console.error(goodsc);
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
                this.setState({
                    loaded: false
                })
                this.refs.toast.show(this.state.message130, 3000);
                //alert(this.state.message130)
            });
    }

    //条码信息渲染
    // renderRow(rowData: string, sectionID: number, rowID: number) {
    //     //console.error(goodsc);
    //     return (
    //         <TouchableHighlight
    //             style={[styles.countsContainer, {backgroundColor: 'white', paddingVertical: 4}]}
    //             underlayColor='gray'
    //             // onPress={() => {
    //             //     this._editRow(rowData, rowID);
    //             // }}
    //         >
    //             <View style={{flexDirection: 'row'}}>
    //                 <Text style={{flex:1,textAlign:'center',fontSize:10}}>{rowData.tiaoma}</Text>
    //                 <Text style={{flex:0.6,textAlign:'center',fontSize:10}}>{rowData.riqi}</Text>
    //                 <Text style={{flex:0.6,textAlign:'center',fontSize:10}} onPress={() => {
    //                     delete data[rowID];
    //                     var data = [];
    //                     for (var i = 0; i < data.length; i++) {
    //                         if (data[i] != null) {
    //                             data.push(data[i]);
    //                         }
    //                     }
    //                     data = data;
    //                     //console.error(goodsc);
    //                     this.setState({
    //                         // hangshu: goodsc.length,
    //                         // saomiaoshu: '',
    //                         // ReceiveCode: '',
    //                         // kucun: '',
    //                         dataSource: ds.cloneWithRows(data),
    //                         // huoquValue: ''
    //                     })
    //                     // this.countsadd();
    //                     //console.error(goodsc)
    //                 }}>{rowData.shuliang}</Text>
    //                 {/*<Text*/}
    //                 {/*    style={{flex: 0.4, textAlign: 'center', backgroundColor: '#87caf5', fontSize: 10}}*/}
    //                 {/*    ></Text>*/}
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }
}

const styles = StyleSheet.create({
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
    inputStyles: {
        width: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        paddingLeft: 20,
        borderColor: '#c8c8c8',
        borderWidth: 1,
        flex: 1
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#ffffff',
    //     position: 'relative',
    // },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
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

});
