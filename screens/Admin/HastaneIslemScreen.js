import React, { Component } from 'react';
import { Text, TextInput, View, Platform, Image, Modal, Alert, TouchableOpacity,Picker} from 'react-native';

import MenuButton from '../../components/MenuButton';
export default class HastaneIslemScreen extends Component {
  constructor(props) {
    super(props);
    this.hastaneEkle=this.hastaneEkle.bind(this);
    
    this.hastaneSil=this.hastaneSil.bind(this);

    this.hastaneleriCek=this.hastaneleriCek.bind(this);
    
    this.silModalShow=this.silModalShow.bind(this);

    this.guncelleModalShow=this.guncelleModalShow.bind(this);

    this.hastaneGuncelle=this.hastaneGuncelle.bind(this);

    this.state = {text: '',
                  eklemodalVisible: false,
                  silmodalVisible: false,
                  guncellemodalVisible: false,
                  hastaneler:[],
                  bolumler:[],
                  doktorlar:[],
                  
                  silinecekHastaneID:'',
                  guncellenecekBolum:'',
                  silinecekBolumID:'',
                  guncellenecekDoktor:'',
                  silinecekDoktorID:'',
                  
                  guncellenecekHastaneID:'',

                  hastaneAdi:'',
                  hastaneAdres:'',

                  errormessage:'',
                  

                  guncellenecekHastaneAdi:'',
                  guncellenecekHastaneAdresi:'',
                  

  };
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
  componentDidMount() {
    
      this.hastaneleriCek();
      
      
  
  }

  hastaneEkle(){
    if(this.state.hastaneAdi!='', this.state.hastaneAdres!='') {
    const hastane={
      hastaneAdi:this.state.hastaneAdi,
      hastaneAdres:this.state.hastaneAdres,
     
    }
    fetch('https://randevusistemi.azurewebsites.net/api/hastane', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify(hastane),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('response object:',responseJson.results)
          if(responseJson.results.hastaneAdi!=null){this.setState({eklemodalVisible:false}),this.setState({errormessage:'Hastane Ekleme İşlemi Başarılı'})}
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  hastaneSil(){
    fetch("https://randevusistemi.azurewebsites.net/api/hastane/Sil/"+this.state.silinecekHastaneID.hastaneID).then(res=>{
            
        if(res.ok){
           
           res.json()
           .then(data=>{
             console.log('Silinen Hastane',data.results);
             this.setState({errormessage:'Hastane Silme Başarılı'});
             this.setState({silmodalVisible:false});                
           })
    
          }
          else{             
            console.log('Hatalı hastane servisi işlemi'); 
            return;
          }
                
        })
  }
 silModalShow(){
  this.hastaneleriCek();
  this.setState({silmodalVisible:true});
 }
 guncelleModalShow(){
   this.hastaneleriCek();
   this.setState({guncellemodalVisible:true})
 }
  hastaneGuncelle(){
    if(this.state.guncellenecekHastaneAdi!='', this.state.guncellenecekHastaneAdresi!='') {
      const hastane={
        hastaneAdi:this.state.guncellenecekHastaneAdi,
        hastaneAdres:this.state.guncellenecekHastaneAdresi,
        hastaneID:this.state.guncellenecekHastaneID.hastaneID,
      }
      fetch('https://randevusistemi.azurewebsites.net/api/hastane', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(hastane),
        })
        .then((response) => response.json())
          .then((responseJson) => {
              console.log('response object:',responseJson);
              this.setState({guncellemodalVisible:false});
              this.setState({errormessage:'Hastane Guncelleme İşlemi Başarılı'});
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
           Admin Hastane İşlemleri
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
                                          
                                          <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Hastane Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.hastaneAdi}
                                            onChangeText={(hastaneAdi)=>this.setState({hastaneAdi})}
                                          />

                                            <TextInput 
                                            style={{ marginVertical:10, 
                                              width:300,
                                              height: 40,
                                              backgroundColor:'rgba(255,255,255,0.3)',
                                              borderWidth: 1,
                                              borderRadius:15,
                                              paddingHorizontal:16,}}
                                            placeholder="Hastane Adres Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.hastaneAdres}
                                            onChangeText={(hastaneAdres)=>this.setState({hastaneAdres})}
                                          />

                                          
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.hastaneEkle}>
                                              <Text style={{color:'white'}}>Hastane Ekle</Text>
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
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Hastane Ekle</Text>
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
                                                 selectedValue={this.state.silinecekHastaneID}
                                                 onValueChange={(cli) => this.setState({silinecekHastaneID: cli})}>
                                                {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l} label={l.hastaneAdi} key={i}  /> })}
                                           </Picker>
                                          
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.hastaneSil}>
                                              <Text style={{color:'white'}}>Hastane Sil</Text>
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
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Hastane Sil</Text>
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
                                                 selectedValue={this.state.guncellenecekHastaneID}
                                                 onValueChange={(cli) => this.setState({guncellenecekHastaneID: cli})}>
                                                {this.state.hastaneler.map((l, i) => {return <Picker.Item value={l} label={l.hastaneAdi} key={i}  /> })}
                                           </Picker>


                                          <TextInput
                                          style={{ marginVertical:10, 
                                            width:300,
                                            height: 40,
                                            backgroundColor:'rgba(255,255,255,0.3)',
                                            borderWidth: 1,
                                            borderRadius:15,
                                            paddingHorizontal:16,}}
                                            name="hastaneGuncelle" 
                                            placeholder="Hastane Adı Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekHastaneAdi}
                                            onChangeText={(guncellenecekHastaneAdi)=>this.setState({guncellenecekHastaneAdi})}
                                          />

                                           <TextInput
                                           style={{ marginVertical:10, 
                                            width:300,
                                            height: 40,
                                            backgroundColor:'rgba(255,255,255,0.3)',
                                            borderWidth: 1,
                                            borderRadius:15,
                                            paddingHorizontal:16,}}
                                            name="hastaneGuncelleAdres" 
                                            placeholder="Hastane Adresi Giriniz!" 
                                            placeholderTextColor='black'
                                            value={this.state.guncellenecekHastaneAdresi}
                                            onChangeText={(guncellenecekHastaneAdresi)=>this.setState({guncellenecekHastaneAdresi})}
                                          />
                                         
                                            <TouchableOpacity style={{height:50,
                                                                        width:100,
                                                                        borderRadius: 15,
                                                                        backgroundColor:'black',                                                                       
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'}}
                                              onPress={this.hastaneGuncelle}>
                                              <Text style={{color:'white'}}>Hastane Güncelle</Text>
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
                                          <Text style={{height:50,width:300,color:'white', textAlign:'center', fontSize:24, marginTop:15}}>Hastane Güncelle</Text>
                                      </TouchableOpacity>
              
        </View>

      </View>
    );
  }
}
