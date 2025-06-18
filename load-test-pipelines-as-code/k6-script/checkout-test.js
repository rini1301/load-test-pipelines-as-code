import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
  group('Checkout flow', () => {
    let res = http.get('https://www.apache.org/');
    check(res, {
      'status is 200': (r) => r.status === 200
    });
  });
}
