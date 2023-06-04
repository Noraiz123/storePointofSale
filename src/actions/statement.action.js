import {actionTypes} from '../constants/actionTypes';
import {getStatement} from "../api/statement";

const getStatementAction = (payload) => {
  return {
    type: actionTypes.getStatement,
    payload,
  };
};

export const GetStatement = (data) => async (dispatch) => {
  const res = await getStatement(data);
  if (res.status === 200) {
    dispatch(getStatementAction(res.data));
  }
};
