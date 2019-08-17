import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/user_action';
import {getTokens, setTokens} from '../../utils/misc';

import Video from 'react-native-video';

class GameArticleComponent extends Component {

  state={
    loading:true,
    isAuth:true,
  }

  manageState(loading,isAuth){
    this.setState({
      loading,
      isAuth,
    })
  }

  componentDidMount(){
    const User = this.props.User;

    getTokens((value)=>{
      
      if (value[0][1] === null){
        this.manageState(false,false)
      }else{
        this.props.dispatch(autoSignIn(value[1][1]))
        .then(()=>{
          !User.auth.token ?
            this.manageState(false,false)
          :
          setTokens(User.auth,()=>{
            this.manageState(false,true)
          })
        })        
      }
    })
  }

  render(){

    const params = this.props.navigation.state.params;

    if(this.state.loading){
      return (
      <View style={styles.loading}>
        <ActivityIndicator/>
      </View>
      )
    }else{
      return (
        <ScrollView style={{backgroundColor:'#f0f0f0'}}>
          {this.state.isAuth ?
            <Video
              source={{uri:params.play}}
              muted={true}
              paused={true}
              style={{width:'100%', height:250}}
            />
            :
            <View style={styles.notAuth}>
                <Icon name="md-sad" size={80} color='#d5d5d5'/>
                <Text style={styles.notAuthText}>
                  We are sorry you need to be registered / logged to see this game
                </Text>
                <Button
                  title = "Login / Register"
                  onPress={()=> this.props.navigation.navigate('Auth') }
                />
            </View>

          }
        </ScrollView>


      )


    }


  }
}

const styles= StyleSheet.create({
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  notAuth:{
    flex:1,
    margin:50,
    justifyContent:'center',
    alignItems:'center',
  }
})

function mapStateToProps(state){
  
  return {
      User: state.User
  }

}


export default connect(mapStateToProps)(GameArticleComponent);
