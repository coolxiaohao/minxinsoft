import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    Dimensions,
    TextInput,
    ToastAndroid
} from 'react-native';



const {width,height} = Dimensions.get('window');


export default class mingxin extends Component {
    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.nameStyles}>
                    查菲2
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    rowStyles: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width - 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    btnStyles: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width - 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    loginbgStyles: {
        resizeMode: 'cover',
        position:'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height+20,
    },
    nameStyles: {
        fontSize: 26,
        textAlign: 'center',
        margin: 0,
        color: 'white'
    },
    titleStyles: {
        fontSize: 18,
        textAlign: 'center',
        margin: 0,
        color: 'white'
    },
    formStyles: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width - 40,
        height: height / 2 + 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        marginTop: 10
    },
    routerStyles: {
        color: 'white',
        fontSize: 16
    },
    userStyles: {
        fontSize: 18,
        color: 'white',
        marginRight: 5
    },
    inputStyles: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 180,
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 14,
        paddingRight: 0,
    },
    buttonStyles: {
        backgroundColor: 'white',
        color: '#87caf5',
        fontSize: 20,
        fontWeight: "100",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 20
    }
});
