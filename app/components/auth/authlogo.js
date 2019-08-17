import React from 'react';
import {View, Image} from 'react-native';
import LogoNba from '../../assets/images/nbalogo2.png';

const LogoComponent = () => (
    <View style={{alignItems:'center'}}>
        <Image
            source={LogoNba}
            resizeMode={'center'}
            style={{
                width:170,
                height:150
            }}
        />
    </View>
)

export default LogoComponent;