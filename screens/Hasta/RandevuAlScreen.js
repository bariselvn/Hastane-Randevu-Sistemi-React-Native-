import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal,Picker,TextInput} from 'react-native';
import Logo from '../../components/Logo'
import MenuButton from '../../components/MenuButton'

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from'moment';

import {connect} from 'react-redux'
 class RandevuAlScreen extends React.Component {

  constructor(props) {
    super(props);
    this.hastaneIdBolumGetir = this.hastaneIdBolumGetir.bind(this);
    this.bolumSecBtn=this.bolumSecBtn.bind(this);
    this.doktorSecBtn=this.doktorSecBtn.bind(this);
    this.dktrTarihSaatGetir=this.dktrTarihSaatGetir.bind(this);
    this.randevuKaydet=this.randevuKaydet.bind(this);
    this.tarihSecBtn=this.tarihSecBtn.bind(this);
    this.state = {
        errormessage:'',
        hastaId: this.props.HastaId,
        hastaAdi: this.props.HastaAdi,
        hastaMail:this.props.HastaMail,
        hastaneSecTxt:'Hastane Seçiniz',
        bolumSecTxt:'Bölüm Seçiniz',
        doktorSecTxt:'Doktor Seçiniz',
        tarihSecTxt:'Tarih Seçiniz',
        hastaneSecModalVisible: false,
        bolumSecModalVisible: false,
        doktorSecModalVisible: false,
        tarihSecModalVisible: false,
        onaylaModalVisible:false,
        hastaneler:[],
        bolumler:[],
        doktorlar:[],
        doluSaatler:[],
        bosSaatler:[],
        bolumID:'',
        hastaneID:'',
        doktorID:'',
        tarih:'',
        saat:'',
        isDateTimeVisible:false,
        

        
    }
}
datePicker = (date) =>{
  this.setState({
    isDateTimeVisible:false,
    tarih:moment(date).format('YYYY-MM-DD')
    
  })
}

hidePicker = () =>{
  this.setState({
    isDateTimeVisible:false
    
  })
}
showPicker = () =>{
  this.setState({
    isDateTimeVisible:true
  })
}
componentDidMount() {
  
  fetch("https://randevusistemi.azurewebsites.net/api/hastane/").then(res=>{
          
    if(res.ok){
       
       res.json()
       .then(data=>{
         console.log('dataResults',data.results);
         this.setState({hastaneler:data.results});
         console.log('Hastaneler',this.state.hastaneler);               
       })

      }
      else{             
        return;
      }
            
    })

}

bolumSecBtn(){
  console.log('hastaneId',this.state.hastaneID.hastaneID);
  if(this.state.hastaneID=="")
  {
   this.setState({errormessage:"Hastane Seç!!"})
   
  }
  else{
    this.setState({errormessage:""});
    this.hastaneIdBolumGetir();
   this.setState({bolumSecModalVisible:true});
   
  }
}


hastaneIdBolumGetir(){
  fetch("https://randevusistemi.azurewebsites.net/api/bolum/hastaneID/"+this.state.hastaneID.hastaneID).then(res=>{
    
  if(res.ok){
     
     res.json()
     .then(data=>{
      console.log('dataResults',data.results);
      this.setState({bolumler:data.results});
      console.log('Bolumler',this.state.bolumler);
     })

    }
    else{
      this.setState({errormessage:"Bir Terslik Var"});
      
      return;
    }
    
    
  })
}
tarihSecBtn(){
  
  if(this.state.hastaneID!="" & this.state.bolumID!=""&this.state.doktorID!="")
  {
    this.setState({errormessage:""});
   this.setState({tarihSecModalVisible:true});
   
   
  }
  else{
    
    this.setState({errormessage:"Hastane, Bolüm ve Doktor Seç !!"})
  }
}
doktorSecBtn(){
  
  if(this.state.hastaneID!="" & this.state.bolumID!="")
  {
    this.setState({errormessage:""});
    this.hstBlmDoktorGetir();
   this.setState({doktorSecModalVisible:true});
   
   
  }
  else{
    
    this.setState({errormessage:"Hastane ve Bolüm Seç !!"})
  }
}
hstBlmDoktorGetir(){
  fetch("https://randevusistemi.azurewebsites.net/api/doktor/RandevuDoktor/"+this.state.bolumID.bolumID+"/"+this.state.hastaneID.hastaneID).then(res=>{
    
  if(res.ok){
     
     res.json()
     .then(data=>{
      console.log('dataResults',data.results);
      this.setState({doktorlar:data.results});
      console.log('Doktorlar',this.state.doktorlar);
     })

    }
    else{
      this.setState({errormessage:"Bir Terslik Var"});
      
      return;
    }
    
    
  })

}

dktrTarihSaatGetir(){
  fetch("https://randevusistemi.azurewebsites.net/api/randevu/RandevuSaat/"+this.state.doktorID.doktorID+"/"+this.state.tarih).then(res=>{
    
  if(res.ok){
     
     res.json()
     .then(data=>{
      console.log('dataResults',data.results);
      this.setState({doluSaatler:data.results});
      console.log('Dolu Saatler',this.state.doluSaatler);

      for(i=8;i<=17;i++){
        
        if(i!=this.state.doluSaatler[0] & i!=this.state.doluSaatler[1] & i!=this.state.doluSaatler[2] & i!=this.state.doluSaatler[3] ) {
              
          this.state.bosSaatler.push(i);
          
        }
        
      }
      console.log('Boş Saatler',this.state.bosSaatler);
      
      
     })

    }
    else{
      this.setState({errormessage:"Bir Terslik Var"});
      
      return;
    }
    
    
  })

}
randevuKaydet(){
  
  const randevu={
    randevuTarih:this.state.tarih,
    randevuSaat:this.state.saat,
    doktorID:this.state.doktorID.doktorID,
    hastaID:this.state.hastaId,
    
  }
  fetch('https://randevusistemi.azurewebsites.net/api/randevu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    },
    body:JSON.stringify(randevu),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('response object:',responseJson.results)
        if(responseJson.results.hastaID!=null){this.setState({onaylaModalVisible:false}),this.setState({tarihSecModalVisible:false}),this.setState({errormessage:"Randevunuz Onaylandı"})}
    })
    .catch((error) => {
      console.error(error);
    });

}

  render() {
    
    return (
      <View style={styles.container}>
      
      <MenuButton navigation={this.props.navigation}/>
      <Text style={styles.textStil}>{this.state.errormessage}</Text>
      <Logo />
        <Text style={styles.Text}>Hastane Randevu Sistemi</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.hastaneSecModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hastane Seçimi!</Text>
              <Picker 

             selectedValue={this.state.hastaneID}
             onValueChange={(cli) => this.setState({hastaneID: cli})}>
            {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l} label={l.hastaneAdi} key={i}  /> })}
             </Picker>
              

              <TouchableOpacity
                onPress={() => {
                  this.setState({hastaneSecModalVisible:false});
                  
                }}>
                <Text>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.bolumSecModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Bölüm Seçimi!</Text>

              <Picker 

               selectedValue={this.state.bolumID}
               onValueChange={(cli) => this.setState({bolumID: cli})}>
               {this.state.bolumler.map((l, i) => {return <Picker.Item value={l} label={l.bolumAdi} key={i}  /> })}
               </Picker>

              <TouchableOpacity
                onPress={() => {
                  this.setState({bolumSecModalVisible:false});
                  
                }}>
                <Text>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.doktorSecModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Doktor Seçimi!</Text>
              <Picker 

                 selectedValue={this.state.doktorID}
                 onValueChange={(cli) => this.setState({doktorID: cli})}>
                 {this.state.doktorlar.map((l, i) => {return <Picker.Item value={l} label={l.doktorAdi} key={i}  /> })}
                 </Picker>
              <TouchableOpacity
                onPress={() => {
                  this.setState({doktorSecModalVisible:false});
                  
                }}>
                <Text>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.tarihSecModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Tarih Seçimi!</Text>
              <Text style={{color:'black',fontSize:50}}>{this.state.tarih} </Text>
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
                 onPress={this.showPicker}>
                   <Text style={{color:'white',fontSize:20}}>Tarih Seç </Text>
                 </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimeVisible}
                onConfirm={this.datePicker}
                onCancel={this.hidePicker}
                mode={'date'}
                datePickerModeAndroid={'spinner'}
              
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
                 onPress={this.dktrTarihSaatGetir}>
                   <Text style={{color:'white',fontSize:20}}>Bos Saatleri Gor </Text>
                 </TouchableOpacity>
                  
                 <Text style={{color:'black',fontSize:30,textAlign:"center"}}>Boş Saatler</Text> 
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[0]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[1]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[2]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[3]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[4]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[5]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[6]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[7]}</Text>
                 <Text style={{color:'black',fontSize:10}}>{this.state.bosSaatler[8]}</Text>
                 
                 <TextInput
                    name="sifre"
                    style={styles.inputBox} 
                    placeholder="Lütfen Boş Saatlerden Birini Giriniz Boş Yapma Boş Saat Gir" 
                    placeholderTextColor='black'
                    secureTextEntry={true}
                    value={this.state.saat}
                    onChangeText={(saat)=>this.setState({saat})}
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
                onPress={() => {
                  this.setState({onaylaModalVisible:true});
                  
                }}>
                   <Text style={{color:'white',fontSize:20}}>Randevuyu Onayla</Text>
                 </TouchableOpacity>
                

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
                onPress={() => {
                  this.setState({tarihSecModalVisible:false});
                  
                }}>
                <Text style={{color:'white',fontSize:20}}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.onaylaModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Onaylama Ekranı!</Text>

             <Text>Seçtiğiniz Hastane : {this.state.hastaneID.hastaneAdi}</Text>
             <Text>Seçtiğiniz Bölüm : {this.state.bolumID.bolumAdi}</Text>
             <Text>Seçtiğiniz Doktor : {this.state.doktorID.doktorAdi}</Text>
             <Text>Seçtiğiniz Tarih : {this.state.tarih}</Text>
             <Text>Seçtiğiniz Saat : {this.state.saat}</Text>

             <TouchableOpacity
              style={
                {height:50,
                width:300,
                borderRadius:15,
                backgroundColor:'gray',
                marginVertical:10,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={this.randevuKaydet}>
                <Text style={{color:'green',fontSize:20}}>Onayla</Text>
              </TouchableOpacity>

             <TouchableOpacity
              style={
                {height:50,
                width:300,
                borderRadius:15,
                backgroundColor:'gray',
                marginVertical:10,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState({onaylaModalVisible:false});
                  
                }}>
                <Text style={{color:'red',fontSize:20}}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        
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
           onPress={() => {
            this.setState({hastaneSecModalVisible:true});
          }}>
          <Text style={{color:'white',fontSize:20}}>{this.state.hastaneSecTxt}</Text>
          </TouchableOpacity>   

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
           onPress={this.bolumSecBtn}
           >
          <Text style={{color:'white',fontSize:20}}>{this.state.bolumSecTxt}</Text>
          </TouchableOpacity> 

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
           onPress={this.doktorSecBtn}
           >
          <Text style={{color:'white',fontSize:20}}>{this.state.doktorSecTxt} </Text>
          </TouchableOpacity>

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
           onPress={this.tarihSecBtn}
           >
          <Text style={{color:'white',fontSize:20}}>{this.state.tarihSecTxt} </Text>
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
  Text :{
     
    fontSize:30,
    
  },
  textStil:{
    marginVertical:15,
    width:300,
      height: 40,
  
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
 
});
const mapStateToProps = (state, ownProps) => ({
  HastaId:state.reducer1.hastaId,
  HastaAdi:state.reducer1.hastaAdi,
  hastaMail:state.reducer1.hastaMail,
})

export default connect(mapStateToProps)(RandevuAlScreen);