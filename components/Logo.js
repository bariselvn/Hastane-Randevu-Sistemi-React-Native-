import React from 'react';
import {Image} from 'react-native'


export default class Logo extends React.Component{
 
render(){
    return(
        <Image
        style={{width: 100, height: 100,paddingTop:20,}}
        source={require('../assets/hospital-icon.png')}
      />

    );
}
}
