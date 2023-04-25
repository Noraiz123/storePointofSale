import { toast } from 'react-toastify';
import { createCashflow, deleteCashflow, getCashflow, updateCashflow } from '../api/cashflow';
import { actionTypes } from '../constants/actionTypes';

const createCashflowAction = (payload) => {
  return {
    type: actionTypes.createCashflow,
    payload,
  };
};

const getCashflowAction = (payload) => {
  return {
    type: actionTypes.getCashflow,
    payload,
  };
};

const deleteCashflowAction = (payload) => {
  return {
    type: actionTypes.deleteCashflow,
    payload,
  };
};

const updateCashflowAction = (payload) => {
  return {
    type: actionTypes.updateCashflow,
    payload,
  };
};

export const CreateCashflow = (data) => async (dispatch) => {
  const res = await createCashflow(data);
  if (res.status === 200) {
    dispatch(createCashflowAction(res.data));
    toast.success('Cashflow Created Successfully');
  }

  return res
};

export const GetCashflow = (data, filter) => async (dispatch) => {
  const res = await getCashflow(data, filter);
  if (res.status === 200) {
    dispatch(getCashflowAction(res.data));
  }
};

export const DeleteCashflow = (id, data, filters) => async (dispatch) => {
  const res = await deleteCashflow(id);
  if (res.status === 200) {
    const vendors = await getCashflow(data, filters);
    dispatch(deleteCashflowAction(vendors.data));
    toast.success('Cashflow Deleted Successfully');
  }
};

export const UpdateCashflow = (id, data) => async (dispatch) => {
  const res = await updateCashflow(id, data);
  if (res.status === 200) {
    dispatch(updateCashflowAction(res.data));
    toast.success('Cashflow Updated Successfully');
  }
};
