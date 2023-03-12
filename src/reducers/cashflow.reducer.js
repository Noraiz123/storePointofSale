import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.cashFlow, action) => {
  switch (action.type) {
    case actionTypes.getCashflow: {
      const { cashflow, currentPage, totalPages, noOfCashflow, totalPayable, totalReceivable, cashflowStats } =
        action.payload;
      return {
        ...state,
        cashflow,
        currentPage,
        totalPages,
        noOfCashflow,
        totalPayable,
        totalReceivable,
        cashflowStats,
      };
    }
    case actionTypes.createCashflow: {
      return { ...state, cashFlow: state.concat(action.payload) };
    }
    case actionTypes.deleteCashflow: {
      const { cashflow, currentPage, totalPages, noOfCashflow, totalPayable, totalReceivable, cashflowStats } =
        action.payload;
      return {
        ...state,
        cashflow,
        currentPage,
        totalPages,
        noOfCashflow,
        totalPayable,
        totalReceivable,
        cashflowStats,
      };
    }
    case actionTypes.updateCashflow: {
      return { ...state, cashflow: state.cashflow.map((e) => (e._id === action.payload._id ? action.payload : e)) };
    }
    default:
      return state;
  }
};
