
var initialState = {
    hastaId: 'defaultuser',
    hastaAdi: 'denemeBasarili',
    hastaMail:'asdas@mail.com'
};

export default function reducer1(state = initialState, action) {
    switch (action.type) {
        case 'UpdateId':
            return Object.assign({}, state, { hastaId: action.payload.hastaId });
        case 'UpdateAdi':
            return Object.assign({}, state, { hastaAdi: action.payload.hastaAdi });
        case 'UpdateMail':
            return Object.assign({}, state, {
                hastaMail: action.payload.hastaMail,            
            });
        
        default:
            return state;
    }
}