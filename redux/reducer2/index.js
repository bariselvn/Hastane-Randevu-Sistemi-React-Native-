
var initialState = {
    doktorId: 'defaultuser',
    doktorAdi: 'denemeBasarili',
    doktorMail:'asdas@mail.com'
};

export default function reducer1(state = initialState, action) {
    switch (action.type) {
        case 'UpdateDoktorId':
            return Object.assign({}, state, { doktorId: action.payload.doktorId });
        case 'UpdateAdi':
            return Object.assign({}, state, { hdoktorAdi: action.payload.doktorAdi });
        case 'UpdateMail':
            return Object.assign({}, state, {
                doktorMail: action.payload.doktorMail,            
            });
        
        default:
            return state;
    }
}