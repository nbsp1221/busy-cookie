import dotenv from 'dotenv';
import { HttpClient } from '@fortune-assistant/utils-http-client';
import { scheduler } from '@fortune-assistant/utils-scheduler';

dotenv.config();

const PAYBOOC_SESSION_ID = process.env.PAYBOOC_SESSION_ID ?? '';

function consoleLog(log: unknown) {
  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })}]`, log);
}

function startPayboocAttendanceCheck() {
  consoleLog('페이북 시작');

  const httpClient = new HttpClient({
    headers: {
      contentType: 'application/x-www-form-urlencoded',
      cookie: `JSESSIONID=${PAYBOOC_SESSION_ID}`,
    },
  });

  const attendanceCheck = async () => {
    const response = await httpClient.post<string, { resData: { returnMessage: string } }>(
      'https://paybooc.co.kr/app/paybooc/RLoginDailyEventJson.do',
      'retKey=json&encEvntNo=186tCXAUmCfxcrAKd5PVew%3D%3D&opType=apply'
    );

    consoleLog(`출석 체크 시도 - ${response.data.resData.returnMessage}`);
  };

  attendanceCheck();

  scheduler.schedule('0 0 9 * * *', async () => {
    attendanceCheck();
  }, {
    timezone: 'Asia/Seoul',
  });

  scheduler.schedule('*/5 * * * *', async () => {
    const response = await httpClient.get<string>('https://paybooc.co.kr/app/paybooc/Main.do');
    consoleLog(`세션 유지 시도 - ${response.statusCode}`);
  }, {
    timezone: 'Asia/Seoul',
  });
}

startPayboocAttendanceCheck();
