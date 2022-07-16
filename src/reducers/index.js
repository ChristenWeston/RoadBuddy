import formVisibleReducer from './form-visible-reducer';
import tripListReducer from './trip-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainTripList: tripListReducer,
  firestore: firestoreReducer
});

//We import the firestoreReducer from Redux Firestore and then we specify the firestoreReducer
// will handle the firestore state slice. This root reducer gets imported into src/index.js and is used 
//when we first create and initialize our store. This means that the store we pass down into our application 
//via provider components will now be able to use Firestore.
export default rootReducer;