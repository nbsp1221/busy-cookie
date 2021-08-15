import { HttpClient } from '@fortune-assistant/utils-http-client';
import { scheduler } from '@fortune-assistant/utils-scheduler';

const httpClient = new HttpClient();

scheduler.scheduleJob('*/5 * * * * *', async () => {
  const response = await httpClient.get('https://www.paybooc.co.kr/app/paybooc/Main.do');

  console.log('every 5 seconds');
  console.log(response.data);
});
