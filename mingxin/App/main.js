/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  BackHandler
} from 'react-native';

import { StackNavigator,TabNavigator } from 'react-navigation';


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

//扫码组件
import Saoma from './Components/saoma'

//WebView
import Webview from './Components/webview'

//直接扫描
import ChukuD from './pages/directScan/chukusaomiao';
import RukuD from './pages/directScan/rukusaomiao';
import PandianD from './pages/directScan/pandiansaomiao';
import KucunD from './pages/directScan/kucunchaxun';
import JifeiD from './pages/directScan/jifeisaomiao';
import ChafeiD from './pages/directScan/chafei';
import DangeD from './pages/directScan/dangesaomiao';
//跟单扫描
import ChukuS from './pages/singleScan/chukusaomiao';
import RukuS from './pages/singleScan/rukusaomiao';
import PandianS from './pages/singleScan/pandiansaomiao';
import KucunS from './pages/singleScan/kucunchaxun';
import JifeiS from './pages/singleScan/jifeisaomiao';
import ChafeiS from './pages/singleScan/chafei';
import DangeS from './pages/singleScan/dangesaomiao';
import ZhuangxiangS from './pages/singleScan/zhuangxiangsaomiao';
import XianghaoS from './pages/singleScan/xianghaochafei';
import BadS from './pages/singleScan/badjifei';
import BadcS from './pages/singleScan/badchafei'


var pages='Home';
//导航注册
const Navigator = StackNavigator(
    {

      Home:{screen:Home},
      Login:{screen:Login},

      ChukuD:{screen:ChukuD},

      RukuD:{screen:RukuD,},
      PandianD:{screen:PandianD},
      KucunD:{screen:KucunD},
      JifeiD:{screen:JifeiD},
      ChafeiD:{screen:ChafeiD},
      DangeD:{screen:DangeD},

      ChukuS:{screen:ChukuS},
      RukuS:{screen:RukuS},
      PandianS:{screen:PandianS},
      KucunS:{screen:KucunS},
      JifeiS:{screen:JifeiS},
      ChafeiS:{screen:ChafeiD},
      DangeS:{screen:DangeD},
      ZhuangxiangS:{screen:ZhuangxiangS},
      XianghaoS:{screen:XianghaoS},
      BadS:{screen:BadS},
      BadcS:{screen:BadcS},

      Saoma:{screen:Saoma},
      Webview:{screen:Webview},


      Warehouse:{screen:Warehouse},
      RukuGhao:{screen:RukuGhao},
      ChukuGhao:{screen:ChukuGhao},
      JifeiGhao:{screen:JifeiGhao},
      BadJifeiGhao:{screen:BadJifeiGhao},
      XiangGhao:{screen:XiangGhao},

      Chose:{screen:Chose},
      Choselan:{screen:Choselan},
      Database:{screen:Database},
      Systemdefault:{screen:Systemdefault},

    },{
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


export default class Main extends Component {
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
    render() {
        return (
            <Navigator />
        );
    }
}
