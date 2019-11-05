import reducer1 from './reducer1/index';
import reducer2 from './reducer2/index';


import {combineReducers} from 'redux'

const reducerCombined = combineReducers({
    reducer1,
    reducer2,
   

});
export default reducerCombined