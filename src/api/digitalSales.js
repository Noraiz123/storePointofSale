import instance from './request';

export function createSales(data) {
  return instance.post(`/digitalSales`, data);
}
