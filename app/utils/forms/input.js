import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput,Picker} from 'react-native';

const input = (props) => {
    let template = null;
    
    switch(props.type){
        case 'textinput':
            template =
            <TextInput
                {...props}
                style={styles.input}
            />
        break;
        default:
            return template
    }
    return template;
}

const styles = StyleSheet.create({
    input:{
        borderRadius:25,
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        fontSize:16,
        marginTop:10,
    }
})

export default input;