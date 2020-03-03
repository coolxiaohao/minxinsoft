import React,{Component} from 'react'
import {Text,TouchableOpacity} from 'react-native'
// import PropTypes from 'prop-types'
let goldenRatio = 0.618//黄金比例
export default class CustomButton extends Component {
    static defaultProps = {
        bgColor:'#000',
        fColor:'#fff',
        size:10
    };
    // static propTypes = {
    //     //文本的样式
    //     style:PropTypes.object,
    //     //背景颜色
    //     bgColor:PropTypes.string,
    //     //字体颜色
    //     fColor:PropTypes.string,
    //     //文本
    //     text:PropTypes.string.isRequired,
    //     //按钮事件
    //     onPress:PropTypes.func.isRequired,
    //     //用于给残障人士显示的文本
    //     accessibilityLabel:PropTypes.string,
    //     //大小，这个大小不是指按钮的大小，而是padding的大小
    //     size:PropTypes.number
    // }
    render(){
        let {style,bgColor,fColor,text,accessibilityLabel,size} = this.props
        let w = size*goldenRatio
        let h = size - w
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Text style={{
                    paddingHorizontal:w,
                    paddingVertical:h,
                    borderRadius:5,
                    shadowRadius:10,
                    shadowOpacity:1,
                    shadowOffset:{width:-5,height:5},
                    shadowColor:'#999',
                    fontWeight:'bold',
                    backgroundColor:bgColor,
                    color:fColor,
                    ...style}}
                      accessibilityLabel={accessibilityLabel}
                >{text}</Text>
            </TouchableOpacity>
        )
    }
}
