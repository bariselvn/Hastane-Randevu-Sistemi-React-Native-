import React from 'react';
import { StyleSheet, View ,TextInput,TouchableOpacity,Text} from 'react-native';
import MenuButton from '../../components/MenuButton'
import Logo from '../../components/Logo'
import {connect} from 'react-redux'
import {UpdateId} from '../../redux/actions'

 class HastaGirisScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tckn:'',sifre:'' ,kullaniciID:0,errormessage:""};
        this.loginFunc = this.loginFunc.bind(this);
      }
      updateId=(HastaID)=>{
        UpdateId(HastaID);
      }
    loginFunc(){
        fetch("https://randevusistemi.azurewebsites.net/api/Hasta/GirisYap/"+this.state.tckn+"/"+this.state.sifre+"/").then(res=>{
          
        if(res.ok){
           
           res.json()
           .then(data=>{
             this.updateId(data.results);
             this.setState({kullaniciID:data.results});
             this.setState({errormessage:"Giriş Başarılı"});
             console.log(this.state.errormessage);
             this.props.navigation.navigate('HastaIndex',{ hastaId: this.state.kullaniciID })
           })
 
          }
          else{
            this.setState({errormessage:"Kullanıcı adı veya şifre hatalı."});
            console.log(this.state.tckn);
            console.log(this.state.sifre);
            console.log(this.state.errormessage);
            
            return;
          }
          
          
        })
    }
  render() {
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>
      <Text style={styles.textStil}>{this.state.errormessage}</Text>
      <Logo/>
            

            <TextInput 
             name="tckn"
             style={styles.inputBox} 
             placeholder="TC Kimlik Numarası" 
             placeholderTextColor='black'
             value={this.state.tckn}
             onChangeText={(tckn)=>this.setState({tckn})}
             />

             <TextInput
             name="sifre"
              style={styles.inputBox} 
              placeholder="Şifre" 
              placeholderTextColor='black'
              secureTextEntry={true}
              value={this.state.sifre}
              onChangeText={(sifre)=>this.setState({sifre})}
              />
             
              
             <TouchableOpacity
         style={
           {height:50,
           width:300,
           borderRadius:15,
           backgroundColor:'black',
           marginVertical:10,
           alignItems: 'center',
           justifyContent: 'center',
           }}
           onPress={this.loginFunc}
           >
          <Text style={{color:'white',fontSize:20}}>Giriş Yap </Text>
          </TouchableOpacity>                 
             
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
      
    marginVertical:10, 
    width:300,
    height: 40,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius:15,
    paddingHorizontal:16,
    
    
},
buttonStil : {
  
        marginVertical:20,
        width:300,
        height: 40,
        borderRadius:15,

},
textStil:{
  marginVertical:15,
  width:300,
    height: 40,

}
});

const mapStateToProps = (state, ownProps) => ({
  HastaId:state.reducer1.hastaId,
  HastaAdi:state.reducer1.hastaAdi,
  hastaMail:state.reducer1.hastaMail,
})

export default connect(mapStateToProps)(HastaGirisScreen);