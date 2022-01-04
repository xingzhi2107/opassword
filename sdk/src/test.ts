import { OPasswordApis } from './apis';

async function run() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDgyNDk0LCJleHAiOjE2MzI2NjY0OTR9.cuC8zs--Pz55mc_WfLDuU3Gz5TwUjEQaDyR64ntRIww';
  const api = new OPasswordApis('https://opassword.word-collect.com', token);

  // const res = await api.createPasswordInfo({
  //   name: 'apple1',
  //   account: 'zhenguolin@me.com',
  //   encryptedPassword: 'adfkajasdkfajskdfjaskdfjaksdfaksdfjaksdfasdf',
  //   webSite: 'https://appleid.apple.com',
  //   note: "it's note",
  // });
  // console.log(res);

  // const res2 = await api.patchUpdatePasswordInfo({
  //   id: 1,
  //   encryptedPassword: '1234556',
  // });
  // console.log(res2);

  const res3 = await api.fetchPasswordInfoIds();
  console.log(res3);

  const res4 = await api.fetchPasswordInfos({
    ids: res3.data.ids,
    cols: ['account', 'name'],
  });
  console.log(res4.data.items);
}

run();
