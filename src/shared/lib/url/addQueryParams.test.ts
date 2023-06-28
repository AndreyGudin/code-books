import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
  test('test with one parameter', () => {
    const params = getQueryParams({ test: 'value' });
    expect(params).toBe('?test=value');
  });

  test('test with multiply parameter', () => {
    const params = getQueryParams({ test: 'value', second: '2' });
    expect(params).toBe('?test=value&second=2');
  });

  test('test with undefined', () => {
    const params = getQueryParams({ test: 'value', second: undefined });
    expect(params).toBe('?test=value');
  });
});
