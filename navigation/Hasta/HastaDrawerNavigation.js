import React from 'react';
import {Platform,Dimensions} from 'react-native'
import {createDrawerNavigator,createAppContainer} from 'react-navigation'

import HastaMenuDrawer from '../../components/Hasta/HastaMenuDrawer';
import RandevuAlScreen from '../../screens/Hasta/RandevuAlScreen';
import ProfilScreen from '../../screens/Hasta/ProfilScreen';
import SettingsScreen from '../../screens/Hasta/SettingsScreen';

const WIDHT = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDHT*0.83,
    contentComponent:({navigation}) =>{
        return (<HastaMenuDrawer navigation={navigation}/>)
    }

}
const DrawerNavigator = createDrawerNavigator({
    RandevuAl : {
    screen: RandevuAlScreen,
    params: { hastaId: 'tanımlanmadı'}
    },
    Profil : {
    screen: ProfilScreen,
    params: { hastaId: 'tanımlanmadı'}
    },
    Settings : {
    screen: SettingsScreen,
    params: { hastaId: 'tanımlanmadı'}
    },
    
},
DrawerConfig
);

export default createAppContainer(DrawerNavigator);