import React from 'react';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

// SCREENS
import SignIn from './components/auth';
import Games from './components/games';
import News from './components/news';
import Article from './components/news/article'
import GameArticle from './components/games/article'
import Logo from './utils/logo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const headerConf={
    headerLayoutPreset:'center',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#001338'
        },
        headerTintColor:'#ffffff',
        headerTitle: Logo
    }
}

const NewsStack = createStackNavigator({
    News:News,
    Article:Article,
},headerConf)

const GameStack = createStackNavigator({
    Games:Games,
    Article:GameArticle,
},headerConf)

const AppStack = createBottomTabNavigator({
    News: NewsStack,
    Games: GameStack,
},{
    tabBarOptions:{
        activeTintColor:'#fff',
        showLabel:true,
        activeBackgroundColor:'#00194b',
        inactiveBackgroundColor:'#002338',
        style:{
            backgroundColor:'#001338'
        }
    },
    initialRouteName:'News',
    defaultNavigationOptions:({navigation}) => ({
        tabBarIcon:({focuse,horizzontal,tintColor})=>{
            const {routeName} = navigation.state;
            let iconName;
            if(routeName === 'News'){
                iconName= 'ios-basketball';
            } else if (routeName === 'Games'){
                iconName = 'md-tv';
            }
            return <Ionicons name={iconName} size={25} color={tintColor}/>
        }
    })

});

const AuthStack = createStackNavigator({
    SignIn: SignIn
},{
    headerMode:'none'
});

export  const RootNavigator = () => {
    return createAppContainer(createSwitchNavigator({
        App:AppStack,
        Auth:AuthStack
    },{
        initialRouteName:'Auth'
    }))
}