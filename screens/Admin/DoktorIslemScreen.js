import React, { Component } from 'react';
import {  Text, TextInput, View, Platform, Image , Modal, Alert, TouchableOpacity,Picker} from 'react-native';
import MenuButton from '../../components/MenuButton'
export default class DoktorIslemScreen extends Component {
  constructor(props) {
    super(props);
    this.doktorEkle=this.doktorEkle.bind(this);
    
    this.doktorSil=this.doktorSil.bind(this);

    this.doktorlariCek=this.doktorlariCek.bind(this);
    
    this.silModalShow=this.silModalShow.bind(this);

    this.guncelleModalShow=this.guncelleModalShow.bind(this);

    this.doktorGuncelle=this.doktorGuncelle.bind(this);
    
    this.hastaneIdBolumGetir=this.hastaneIdBolumGetir.bind(this);

    this.hastaneleriCek=this.hastaneleriCek.bind(this);
    this.state = {text: '',
                  eklemodalVisible: false,
                  silmodalVisible: false,
                  guncellemodalVisible: false,
                  
                  bolumler:[],
                  doktorlar:[],
                  
                  
                  guncellenecekBolum:'',
                  silinecekBolumID:'',
                  guncellenecekDoktor:'',
                  silinecekDoktorID:'',
                  
                  guncellenecekDoktorID :'',
                  
                  doktorBolumID:'',
                  doktorHastaneID:'',
                 

                  doktorAdi:	"",
                  doktorSoyadi:	"",
                  doktorEmail	:"",
                  doktorTCKN	:"",
                  doktorPassword	:"",

                  errormessage:'',

                  hastaneler:[],
                  secilenHastane:'',
                  hastaneIdyeGoreBolumler:[],

                  guncellenecekdoktorAdi:	"",
                  guncellenecekdoktorSoyadi:	"",
                  guncellenecekdoktorEmail	:"",
                  guncellenecekdoktorTCKN	:"",
                  guncellenecekdoktorPassword	:" ",

                  
                  

  };
  }
  hastaneIdBolumGetir(){
    fetch("https://randevusistemi.azurewebsites.net/api/bolum/hastaneID/"+this.state.doktorHastaneID).then(res=>{
      
    if(res.ok){
       
       res.json()
       .then(data=>{
        console.log('dataResults',data.results);
        this.setState({hastaneIdyeGoreBolumler:data.results});
        console.log('hastaneIdyeGoreBolumler',this.state.hastaneIdyeGoreBolumler);
       })
  
      }
      else{
        this.setState({errormessage:"Bir Terslik Var"});
        
        return;
      }
      
      
    })
  }
  hastaneleriCek(){
    // Hastaneleri Çekme
    fetch("https://randevusistemi.azurewebsites.net/api/hastane/").then(res=>{
           
     if(res.ok){
        
        res.json()
        .then(data=>{
          console.log('dataResults',data.results);
          this.setState({hastaneler:data.results});
          console.log('Hastaneler', this.state.hastaneler);            
        })
 
       }
       else{             
         console.log('Hatalı hastane servisi işlemi'); 
         return;
       }
             
     })
 }
  doktorlariCek(){
     // doktorlar Çekme
     fetch("https://randevusistemi.azurewebsites.net/api/doktor/").then(res=>{
            
      if(res.ok){
         
         res.json()
         .then(data=>{
           console.log('dataResults',data.results);
           this.setState({doktorlar:data.results});
           console.log('doktorlar', this.state.doktorlar);            
         })
  
        }
        else{             
          console.log('Hatalı Doktor servisi işlemi'); 
          return;
        }
              
      })
  }
  componentDidMount() {
      this.hastaneleriCek();
      this.doktorlariCek();
      
  
  }

  doktorEkle(){
    if(this.state.doktorAdi!='' & this.state.doktorSoyadi!='' & this.state.doktorTCKN!='' & this.state.doktorEmail!='' & this.state.doktorPassword!='') {
    const doktor={
      doktorAdi:this.state.doktorAdi,
      doktorSoyadi:this.state.doktorSoyadi,
      doktorTCKN:this.state.doktorTCKN,
      doktorEmail:this.state.doktorEmail,
      doktorPassword:this.state.doktorPassword,
      bolumID:this.state.doktorBolumID,
      hastaneID:this.state.doktorHastaneID,
    }
    fetch('https://randevusistemi.azurewebsites.net/api/doktor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify(doktor),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('response object:',responseJson.results)
          if(responseJson.results.doktorAdi!=null){this.setState({eklemodalVisible:false}),this.setState({errormessage:'Doktor Ekleme İşlemi Başarılı'})}
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  doktorSil(){
    fetch("https://randevusistemi.azurewebsites.net/api/doktor/Sil/"+this.state.silinecekDoktorID.doktorID).then(res=>{
            
        if(res.ok){
           
           res.json()
           .then(data=>{
             console.log('Silinen Doktor',data.results);
             this.setState({errormessage:'Doktor Silme Başarılı'});
             this.setState({silmodalVisible:false});                
           })
    
          }
          else{             
            console.log('Hatalı doktor servisi işlemi'); 
            return;
          }
                
        })
  }
 silModalShow(){
  this.doktorlariCek();
  this.setState({silmodalVisible:true});
 }
 guncelleModalShow(){
   this.doktorlariCek();
   this.setState({guncellemodalVisible:true})
 }
 doktorGuncelle(){
    if(this.state.guncellenecekdoktorAdi!='' & this.state.guncellenecekdoktorSoyadi!='' & this.state.guncellenecekdoktorTCKN!='' & this.state.guncellenecekdoktorEmail!='' & this.state.guncellenecekdoktorPassword!='') {
      const doktor={
        doktorAdi:this.state.guncellenecekdoktorAdi,
        doktorSoyadi:this.state.guncellenecekdoktorSoyadi,
        doktorTCKN:this.state.guncellenecekdoktorTCKN,
        doktorEmail:this.state.guncellenecekdoktorEmail,
        doktorPassword:this.state.guncellenecekdoktorPassword,
        doktorID:this.state.guncellenecekDoktorID.doktorID,
        bolumID:this.state.guncellenecekDoktorID.bolumID,
        hastaneID:this.state.guncellenecekDoktorID.hastaneID,
        
      }
      fetch('https://randevusistemi.azurewebsites.net/api/doktor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(doktor),
        })
        .then((response) => response.json())
          .then((responseJson) => {
              console.log('response object:',responseJson);
              this.setState({guncellemodalVisible:false});
              this.setState({errormessage:'Doktor Guncelleme İşlemi Başarılı'});
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
  
  
  render() {
    return (
      
      <View style={{marginTop: Platform.OS == 'ios' ? 21 : 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'white'
      }}>
         <MenuButton navigation={this.props.navigation}/>
         
        <View style={{flex:4}}>
        
         <Text style={{fontSize:24,textAlign:'center', marginTop:90}}>
           Admin Doktor İşlemleri
         </Text>
         <Text style={{marginVertical:15,
           width:300,
                height: 40,
              }}>{this.state.errormessage}</Text>
        </View>
        <View style={{flex:3}}>
         <Image style={{width: 64, height: 74 ,margin: 16}}
          source={{uri:'https://cdn.onlinewebfonts.com/svg/img_325791.png'}}
         />
        </View>
        <View style={{flex:2}}>
             
                          <Modal        
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.eklemodalVisible}
                                        onRequestClose={() => {
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                          


                                          {/* pickerlargelecek */}

                                          <Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.doktorHastaneID}
                                                 onValueChange={(cli) => this.setState({doktorHastaneID:cli})}>
                                                {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l.hastaneID} label={l.hastaneAdi} key={i}  /> })}
                                           </Picker>

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
                                           onPress={this.hastaneIdBolumGetir}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Bölümleri Getir</Text>
                                          </TouchableOpacity>

                                           < Picker 
                                                 style={{height:50,width:300}}
                                                 selectedValue={this.state.doktorBolumID}
                                                 onValueChange={(cli) => this.setState({doktorBolumID: cli})}>
                                                {this.state.hastaneIdyeGoreBolumler.map((l, i) => {return <Picker.Item value={l.bolumID} label={l.bolumAdi} key={i}  /> })}
                                           </Picker>
                                          <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.doktorAdi}
                                            onChangeText={(doktorAdi)=>this.setState({doktorAdi})}
                                          />

                                            <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Soyadı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.doktorSoyadi}
                                            onChangeText={(doktorSoyadi)=>this.setState({doktorSoyadi})}
                                          />

                                            <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Email Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.doktorEmail}
                                            onChangeText={(doktorEmail)=>this.setState({doktorEmail})}
                                          />

                                           <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor TC Kimlik Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.doktorTCKN}
                                            onChangeText={(doktorTCKN)=>this.setState({doktorTCKN})}
                                          />

                                          <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Şifre Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.doktorPassword}
                                            onChangeText={(doktorPassword)=>this.setState({doktorPassword})}
                                          />

                                          
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.doktorEkle}>
                                              <Text style={{color:'white'}}>Doktor Ekle</Text>
                                            </TouchableOpacity>
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
                                            this.setState({eklemodalVisible:true});
                                            }}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Doktor Ekle</Text>
                                      </TouchableOpacity>
                
          </View>
        <View style={{flex:2}}>
             
                          <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.silmodalVisible}
                                        onRequestClose={() => {
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                          
                                           <Picker 
                                                 style={{height:50,width:100}}
                                                 selectedValue={this.state.silinecekDoktorID}
                                                 onValueChange={(cli) => this.setState({silinecekDoktorID: cli})}>
                                                {this.state.doktorlar.map((l, i) => {return <Picker.Item value={l} label={l.doktorAdi} key={i}  /> })}
                                           </Picker>
                                          
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.doktorSil}>
                                              <Text style={{color:'white'}}>Doktor Sil</Text>
                                            </TouchableOpacity>
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
                                           onPress={this.silModalShow}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Doktor Sil</Text>
                                      </TouchableOpacity>
              
        </View>
      
        <View style={{flex:2}}>
             
                          <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.guncellemodalVisible}
                                        onRequestClose={() => {
                                          Alert.alert('Modal has been closed.');
                                        }}>
                                          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                        

                                          <Picker 
                                                 style={{height:50,width:100}}
                                                 selectedValue={this.state.guncellenecekDoktorID}
                                                 onValueChange={(cli) => this.setState({guncellenecekDoktorID: cli})}>
                                                {this.state.doktorlar.map((l, i) => {return <Picker.Item value={l} label={l.doktorAdi} key={i}  /> })}
                                           </Picker>


                                           <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekdoktorAdi}
                                            onChangeText={(guncellenecekdoktorAdi)=>this.setState({guncellenecekdoktorAdi})}
                                          />

                                            <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Soyadı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekdoktorSoyadi}
                                            onChangeText={(guncellenecekdoktorSoyadi)=>this.setState({guncellenecekdoktorSoyadi})}
                                          />

                                            <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Email Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekdoktorEmail}
                                            onChangeText={(guncellenecekdoktorEmail)=>this.setState({guncellenecekdoktorEmail})}
                                          />

                                           <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor TC Kimlik Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekdoktorTCKN}
                                            onChangeText={(guncellenecekdoktorTCKN)=>this.setState({guncellenecekdoktorTCKN})}
                                          />

                                          <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Doktor Şifre Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekdoktorPassword}
                                            onChangeText={(guncellenecekdoktorPassword)=>this.setState({guncellenecekdoktorPassword})}
                                          />
                                         
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.doktorGuncelle}>
                                              <Text style={{color:'white'}}>Doktor Güncelle</Text>
                                            </TouchableOpacity>
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
                                           onPress={this.guncelleModalShow}>
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Doktor Güncelle</Text>
                                      </TouchableOpacity>
              
        </View>

      </View>
    );
  }
}
