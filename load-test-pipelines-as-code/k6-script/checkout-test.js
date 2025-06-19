// import http from 'k6/http';
// import { check, group } from 'k6';

// export default function() {
//   group('Checkout flow', () => {
//     let res = http.get('https://www.apache.org/');
//     check(res, {
//       'status is 200': (r) => r.status === 200
//     });
//   });
// }
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'https://magento.softwaretestingboard.com/customer/account/login/'; 
  const payload = JSON.stringify({
    email: 'demo@ymail.com',
    password: 'demo@123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'login success message present': (r) => r.body && r.body.includes('Welcome'), // Adjust based on API response
  });

  sleep(1); // Simulate user think time
}
