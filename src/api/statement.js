import instance from './request';

export function getStatement(data) {
  return instance.get(`/statement`, {params: data});
}
