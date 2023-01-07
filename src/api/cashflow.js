import instance from './request';

export function createCashflow(data) {
  return instance.post('/cashflow', data);
}

export function getCashflow(data, filter) {
  return instance.get(`/cashflow?page=${filter.page}&&per_page=${filter.perPage}`, { params: data });
}

export function deleteCashflow(id) {
  return instance.delete(`/cashflow/${id}`);
}

export function updateCashflow(id, data) {
  return instance.patch(`/cashflow/${id}`, data);
}
