import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.statement, action) => {
  switch (action.type) {
    case actionTypes.getStatement: {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
