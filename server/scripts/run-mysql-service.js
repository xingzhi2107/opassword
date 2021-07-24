const utils = require('./utils');

const CONTAINER_NAME = 'mysql.opassword.service';
const PASSWORD = '123';

async function run() {
  try {
    const result = await utils.execP(`docker start ${CONTAINER_NAME}`);
    return;
  } catch(err) {
    if (err.stderr.includes('No such container:')) {
      // normal, do noting
    } else {
      throw err;
    }
  }

  const cmd = `docker run --name ${CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=${PASSWORD} -d mysql:5.7 --character-set-server=utf8 --collation-server=utf8_general_ci`;
  await utils.execP(cmd);
}

run();
