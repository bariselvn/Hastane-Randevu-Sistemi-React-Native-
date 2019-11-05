import React from 'react';
import {Platform,Dimensions} from 'react-native'
import {createDrawerNavigator,createAppContainer} from 'react-navigation'

import AdminMenuDrawer from '../../components/Admin/AdminMenuDrawer';
import HastaneIslemScreen from '../../screens/Admin/HastaneIslemScreen';
import BolumIslemScreen from '../../screens/Admin/BolumIslemScreen';
import DoktorIslemScreen from '../../screens/Admin/DoktorIslemScreen';
import RandevuIslemScreen from '../../screens/Admin/RandevuIslemScreen';
const WIDHT = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDHT*0.83,
    contentComponent:({navigation}) =>{
        return (<AdminMenuDrawer navigation={navigation}/>)
    }

}
const DrawerNavigator = createDrawerNavigator({
    HastaneIslem : {
    screen:HastaneIslemScreen ,
    
    },
     BolumIslem: {
    screen: BolumIslemScreen,
    
    },
    DoktorIslem: {
    screen: DoktorIslemScreen,
    
    },
    RandevuIslem :{
        screen: RandevuIslemScreen,
    }
},
DrawerConfig
);

export default createAppContainer(DrawerNavigator);