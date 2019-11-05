import {store} from '../../App'

export function UpdateId(HastaId)
{
    var herhangibirobje={
            type : 'UpdateId',
            payload: {
                hastaId: HastaId
            }     
    };
    store.dispatch(herhangibirobje);

}
export function UpdateDoktorId(doktorId)
{
    var birobje={
        type:'UpdateDoktorId',
        payload:{
            doktorId:doktorId
        }
    }
    store.dispatch(birobje);
}