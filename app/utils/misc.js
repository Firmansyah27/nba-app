// import {
//     AsyncStorage
// } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export const FIREBASEURL = 'https://nba-app-13328.firebaseio.com/';
export const APIKEY ='AIzaSyBANkmtydCL62PD_ldIwyjPgjgxwD7Qdus';
export const SIGNUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBANkmtydCL62PD_ldIwyjPgjgxwD7Qdus';
export const SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBANkmtydCL62PD_ldIwyjPgjgxwD7Qdus';
export const REFRESH ='https://securetoken.googleapis.com/v1/token?key=AIzaSyBANkmtydCL62PD_ldIwyjPgjgxwD7Qdus';

export const getTokens = (cb) => {

    AsyncStorage.multiGet([
        '@NBA@token',
        '@NBA@refreshToken',
        '@NBA@expireToken',
        '@NBA@uid',
    ]).then((value) => {
        cb(value);
        
    })
}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime( ) + (3600 * 1000);
    AsyncStorage.multiSet([
        ['@NBA@token',values.token],
        ['@NBA@refreshToken',values.refToken],
        ['@NBA@expireToken',expiration.toString()],
        ['@NBA@uid',values.uid]
        
    ]).then((response) => {
        cb();
    })
}

export const convertFirebase = (data) => {
    const newData = [];
        
    for(let key in data){
        newData.push({
            ...data[key],
            id: key
        })
    }
    return newData;
}

export const findTeamData =(itemId, teams) =>{
    const value = teams.find((team)=>{
        return team.id === itemId
    })
    return value;
}