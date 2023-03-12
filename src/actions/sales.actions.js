import { toast } from 'react-toastify';
import { createSales } from '../api/digitalSales';
import { actionTypes } from '../constants/actionTypes';

const createSalesAction = (payload) => {
  return {
    type: actionTypes.createExpense,
    payload,
  };
};

export const CreateSales = (data) => async (dispatch) => {
  const res = await createSales(data);
  if (res.status === 200) {
    dispatch(createSalesAction(res.data));
    toast.success('Digital Sale Created Successfully');
  }
};
