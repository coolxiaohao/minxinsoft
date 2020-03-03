/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AsyncStorage,
    Button,
    BackHandler, Platform
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';


import Home from './view/index';
import Login from './view/login';

//设置
import Chose from './pages/setUp/chose';
import Database from './pages/setUp/database';
import Systemdefault from './pages/setUp/systemDefault';
import Choselan from './pages/setUp/choselan';

//公用
import Warehouse from './pages/common/warehouse';
import RukuGhao from './pages/common/rukuGhao';
import ChukuGhao from './pages/common/chukuGhao';
import JifeiGhao from './pages/common/jifeiGhao';
import BadJifeiGhao from './pages/common/badjifeiGhao';
import XiangGhao from './pages/common/xiangGhao';
import AllotGhao from './pages/common/allotGhao';

//扫码组件
import Saoma from './Components/saoma'

//WebView
import Webview from './Components/webview'
//CodePush
// import CodePush from 'react-native-code-push'

//直接扫描
import ChukuD from './pages/directScan/chukusaomiao';
import RukuD from './pages/directScan/rukusaomiao';
import PandianD from './pages/directScan/pandiansaomiao';
import KucunD from './pages/directScan/kucunchaxun';
import JifeiD from './pages/directScan/jifeisaomiao';
import ChafeiD from './pages/directScan/chafei';
import Chafei2D from './pages/directScan/chafei2';
import DangeD from './pages/directScan/dangesaomiao';
import ErcisaomiaoD from './pages/directScan/ercisaomiao';
//跟单扫描
import ChukuS from './pages/singleScan/chukusaomiao';
import RukuS from './pages/singleScan/rukusaomiao';
import PandianS from './pages/singleScan/pandiansaomiao';
import KucunS from './pages/singleScan/kucunchaxun';
import JifeiS from './pages/singleScan/jifeisaomiao';
import ChafeiS from './pages/singleScan/chafei';
import DangeS from './pages/singleScan/dangesaomiao';
import ErciS from './pages/singleScan/ercisaomiao';
import ZhuangxiangS from './pages/singleScan/zhuangxiangsaomiao';
import XianghaoS from './pages/singleScan/xianghaochafei';
import BadS from './pages/singleScan/badjifei';
import BadcS from './pages/singleScan/badchafei'
import * as wechat from "react-native-wechat";

// let codePushOptions = {
//     //设置检查更新的频率
//     //ON_APP_RESUME APP恢复到前台的时候
//     //ON_APP_START APP开启的时候
//     //MANUAL 手动检查
//     checkFrequency : CodePush.CheckFrequency.ON_APP_RESUME,
//     // installMode: CodePush.InstallMode.IMMEDIATE
// };
// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//         'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//         'Shake or press menu button for dev menu',
// });
var pages = 'Home';
//导航注册
const Navigator = StackNavigator(
    {

        Home: {screen: Home},
        Login: {screen: Login},

        ChukuD: {screen: ChukuD},

        RukuD: {screen: RukuD,},
        PandianD: {screen: PandianD},
        KucunD: {screen: KucunD},
        JifeiD: {screen: JifeiD},
        ChafeiD: {screen: ChafeiD},
        Chafei2D: {screen: Chafei2D},
        DangeD: {screen: DangeD},
        ErciD: {screen: ErcisaomiaoD},

        ChukuS: {screen: ChukuS},
        RukuS: {screen: RukuS},
        PandianS: {screen: PandianS},
        KucunS: {screen: KucunS},
        JifeiS: {screen: JifeiS},
        ChafeiS: {screen: ChafeiD},
        Chafei2S: {screen: Chafei2D},
        DangeS: {screen: DangeD},
        ZhuangxiangS: {screen: ZhuangxiangS},
        XianghaoS: {screen: XianghaoS},
        BadS: {screen: BadS},
        BadcS: {screen: BadcS},

        Saoma: {screen: Saoma},
        Webview: {screen: Webview},


        Warehouse: {screen: Warehouse},
        RukuGhao: {screen: RukuGhao},
        ChukuGhao: {screen: ChukuGhao},
        JifeiGhao: {screen: JifeiGhao},
        BadJifeiGhao: {screen: BadJifeiGhao},
        XiangGhao: {screen: XiangGhao},
        AllotGhao: {screen: AllotGhao},

        Chose: {screen: Chose},
        Choselan: {screen: Choselan},
        Database: {screen: Database},
        Systemdefault: {screen: Systemdefault},

    }, {
        initialRouteName: 'Login',
    }
);
Home.navigationOptions = {
    header: null
};
Login.navigationOptions = {
    header: null
};
Saoma.navigationOptions = {
    header: null
};

// const defaultGetStateForAction = Navigator.router.getStateForAction;
// Navigator.router.getStateForAction = (action, state) => {
//     if (state&&state.routes.length==1&&action.type=='Navigation/BACK'){
//         //在项目首页并且按了物理键返回
//         BackHandler.exitApp()
//     }
//     return defaultGetStateForAction(action, state);
// };


class Main extends Component {
    //如果有更新的提示
    // syncImmediate() {
    //     // console.error(111111)
    //     CodePush.checkForUpdate('ZH5ZTg8nNUJiiHFrozvt2M_QTLzlDubNkzahIs').then((update)=>{
    //         // console.error(update.appVersion)
    //         if(!update || update.appVersion == null){
    //             alert("已是最新版本--");
    //         }
    //         else{
    //             CodePush.sync( {
    //                     //安装模式
    //                     //ON_NEXT_RESUME 下次恢复到前台时
    //                     //ON_NEXT_RESTART 下一次重启时
    //                     //IMMEDIATE 马上更新
    //                     mandatoryInstallMode : CodePush.InstallMode.IMMEDIATE ,
    //                     // deploymentKey: 'yV_GFlkBodTQ4vhvf4qKV6m4wnFFdl4KYcGae',
    //                     deploymentKey: 'ZH5ZTg8nNUJiiHFrozvt2M_QTLzlDubNkzahIs',
    //                     //对话框
    //                     updateDialog : {
    //                         //是否显示更新描述
    //                         appendReleaseDescription : true ,
    //                         //更新描述的前缀。 默认为"Description"
    //                         descriptionPrefix : "更新内容：" ,
    //                         //强制更新按钮文字，默认为continue
    //                         mandatoryContinueButtonLabel : "立即更新" ,
    //                         //强制更新时的信息. 默认为"An update is available that must be installed."
    //                         mandatoryUpdateMessage : "必须更新后才能使用" ,
    //                         //非强制更新时，按钮文字,默认为"ignore"
    //                         optionalIgnoreButtonLabel : '稍后' ,
    //                         //非强制更新时，确认按钮文字. 默认为"Install"
    //                         optionalInstallButtonLabel : '立即更新' ,
    //                         //非强制更新时，检查到更新的消息文本
    //                         optionalUpdateMessage : '监测到新版本，是否更新？' ,
    //                         //Alert窗口的标题
    //                         title : '更新提示'
    //                     }
    //                 //    react-native bundle --entry-file index.android.js --bundle-output ./android/app/src/main/assets/index.android_notice.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
    //                 },
    //                 syncStatus => {
    //                     if (syncStatus === CodePush.SyncStatus.UPDATE_INSTALLED) {
    //                         alert('恭喜你,已成功更新到最新版本！请手动重启应用');
    //                         CodePush.notifyAppReady();
    //                         // this.refs.toast.show(json.message, 3000);
    //                     }
    //                 }
    //             );
    //         }
    //     });
    //
    // }

    // componentDidMount() {
    //     CodePush.notifyAppReady();
    //     CodePush.allowRestart();//在加载完了，允许重启
    // }
    // componentWillMount() {
    //     CodePush.disallowRestart();//禁止重启
    //     this.syncImmediate(); //开始检查更新
    //     // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    // }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         names:'',
    //     };
    //   }
    //   componentDidMount(){
    //       this.isLoad()
    //   }
    //
    //   isLoad(){
    //     AsyncStorage.getItem('userInfo',(error,result)=>{
    //         if (!error) {
    //           //console.error(JSON.parse(result))
    //           this.setState({
    //             names:JSON.parse(result)
    //           })
    //         }else{
    //           //pages = 'Login';
    //         }
    //         //console.error(this.state.names)
    //     })
    //   }
    //code-push release-react mingxinios ios -t 1.0.0 --dev false -d Production -m --des "xxxxxx"
    render() {
        return (
            <Navigator/>
        );
    }
}

// Main = CodePush(codePushOptions)(Main);
export default Main;
