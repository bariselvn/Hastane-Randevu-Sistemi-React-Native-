import React from 'react'
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
}
from 'react-native';

const WIDTH= Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component{
    navLink(nav, text){
        return(
            <TouchableOpacity style={{height:50}} onPress={()=>{this.props.navigation.navigate(nav)}} >
              <Text style = {styles.link}>{text}</Text>

            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.container}>          
              <View style={styles.topLinks}>
                 <View style={styles.profile}>
                   <View style={styles.imgView}>
                     <Image style={styles.img} source = {require('../assets/hospital-icon.png')}/>

                   </View>
                   <View style={styles.profileText}>
                      <Text style={styles.name}>Hastane Randevu Sistemi</Text>
                   </View>
                 </View>
              </View>
              <View style = {styles.bottomLinks}>
                  {this.navLink('Home','Anasayfa')}
                  {this.navLink('HastaGiris','Hasta Giriş')}
                  {this.navLink('HastaKayit','Hasta Kayıt Ol')}
                  {this.navLink('DoktorGiris','Doktor Giriş')}
                  {this.navLink('AdminGiris','Admin Giriş')}
              </View>
              <View style={styles.footer}>
                   <Text style = {styles.description}>Pharmaton 2023</Text>
                   <Text style = {styles.version}>v1.0</Text>

              </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgray',
    },
    topLinks:{
        height:160,
        backgroundColor:'black',
    },
    profile : {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:25,
        borderBottomWidth:1,
        borderBottomColor:'#777777',
        


    },
    profileText :{
        flex:5,
        flexDirection:'column',
        justifyContent:'center',
        paddingRight:20,

    },
    name : {
        fontSize :20,
        paddingBottom:5,
        color:'white',
        textAlign:'left',
        

    },
    imgView :{
        flex:3,
        paddingLeft:20,
        paddingRight:20,

    },
    img : {
        height:70,
        width:70,
        borderRadius:50,
        

    },
    bottomLinks:{
        flex:1,
        backgroundColor:'white',
        paddingTop:10,
        paddingBottom:450,
    },
    link:{
        
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
    },
    footer : {
        height:100,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'lightgray'


    },
    version:{
        flex:1,
        textAlign:'right',
        marginRight:20,
        color:'gray'
    },
    description :{
        flex:1,
        marginLeft:20,
        fontSize:16,
        
    },
})