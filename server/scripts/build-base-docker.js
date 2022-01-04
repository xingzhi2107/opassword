const utils = require('./utils');

class BuildBaseImage {
  constructor(imageName, dockerFilePath, dependenceFilePaths) {
    this.imageName = imageName;
    this.dockerFilePath = dockerFilePath;
    this.dependenceFilePaths = dependenceFilePaths;
  }

  async run(focusBuild) {
    if (focusBuild || this.shouldBuild()) {
      console.log(`base image: ${this.imageName}: start build......`);
      await this.doBuild();
      console.log(`base image: ${this.imageName}: build success!`);
    } else {
      console.log(`base image: ${this.imageName}: not should build, skip!`);
    }
  }

  shouldBuild() {
    const lastImageGitCommit = this.getLatestImageGitCommit();
    if (lastImageGitCommit === null) {
      return true;
    }

    return this.hasDependenceFilesChanged(lastImageGitCommit);
  }

  async doBuild() {
    const headGitHash = utils.getHeadGitHash();
    const imageSource = `${this.imageName}:${headGitHash}`;
    let cmd = `docker build -f ${this.dockerFilePath} -t ${imageSource} .`;

    await utils.execP(cmd);

    const aliasCmd = `docker tag ${imageSource} ${this.imageName}:latest`;
    utils.simpleExec(aliasCmd);

    this.cleanUpImages();
  }

  cleanUpImages() {
    const images = this.dockerTargetImages();

    if (images.length <= 1) {
      console.log('not should clean up!');
      return;
    }

    images.slice(1).forEach((item) => {
      const cmd = `docker rmi ${item.imageId}`;
      utils.simpleExec(cmd);
    });

    console.log('clean up!');
  }

  getLatestImageGitCommit() {
    const images = this.dockerTargetImages();
    if (images.length === 0) {
      return null;
    } else {
      return images[0].tag;
    }
  }

  hasDependenceFilesChanged(diffWithCommit) {
    return this.dependenceFilePaths.some((path) =>
      this.hasFileChanged(diffWithCommit, path),
    );
  }

  hasFileChanged(diffWithCommit, filePath) {
    const cmd = `git diff ${diffWithCommit} HEAD -- ':${filePath}'`;
    const cmdResult = utils.simpleExec(cmd);

    return cmdResult.trim() !== '';
  }

  dockerTargetImages() {
    const cmd = 'docker images';
    const cmdResult = utils.simpleExec(cmd);
    return cmdResult
      .split('\n')
      .map((line) => {
        const cols = line
          .split('  ')
          .filter((item) => item !== '')
          .map((item) => item.trim());

        const [repository, tag, imageId, created, size] = cols;

        return {
          repository,
          tag,
          imageId,
          created,
          size,
        };
      })
      .filter((img) => img.repository === this.imageName)
      .filter((img) => img.tag !== 'latest');
  }
}

const buildBaseImage = new BuildBaseImage(
  'opassword-server-base',
  'base.docker',
  ['yarn.lock'],
);
const args = process.argv.slice(2);
const isFocus = args.some((item) => item === '-f');
buildBaseImage.run(isFocus);
