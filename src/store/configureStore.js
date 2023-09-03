import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Importe o rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;