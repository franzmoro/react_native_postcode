'use strict';

const wd = require('wd');
const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');
const { APPIUM_PORT, WEBDRIVER_CAPS } = require('./test_config');
const APP_DIR = path.resolve('.');

module.exports = {
  getDriver,
  createDriver,
  buildApp,
  startAppium,
  stop,
};

let driver;
let appiumChildProcess;

function getDriver() {
  return new Promise(resolve => {
    process.nextTick(() => resolve(driver));
  });
}

function createDriver() {

  if (driver) {
    return Promise.resolve(driver);
  }

  return buildApp().then(() => {
    return startAppium();
  }).then(() => {
    return waitPort(APPIUM_PORT);
  }).then(() => {
    return createWebDriver();
  });
}

function buildApp() {

  try {
    const buildDir = fs.readdirSync(`${APP_DIR}/${WEBDRIVER_CAPS.app}`);
    if (buildDir.length) {
      return Promise.resolve();
    }
  } catch (error) {
    // return Promise.reject(error);
  }

  return new Promise(resolve => {
    const build = spawn(`${APP_DIR}/scripts/build-tests.sh`);
    build.on('close',resolve);
    build.stdout.pipe(process.stdout);
    build.stderr.pipe(process.stderr);
  });
}

function logsHandler(driver) {
  driver.on('status', info => {
    console.log(info); // eslint-disable-line
  });
  driver.on('command', (meth, path, data) => {
    console.log(' > ' + meth.yellow, path.grey, data || ''); // eslint-disable-line
  });
  driver.on('http', (meth, path, data) => {
    console.log(' > ' + meth.magenta, path, (data || '').grey); // eslint-disable-line
  });
}

function startAppium() {
  return checkPort(APPIUM_PORT).catch(error => {
    new Promise(resolve => {
      appiumChildProcess = spawn('appium');
      process.on('exit', () => {
        appiumChildProcess.kill('SIGHUP');
      });
      appiumChildProcess.stderr.pipe(process.stderr);
      // appium.stdout.pipe(process.stdout);
      resolve();
    });
  });
}

function checkPort(port) {
  return new Promise((resolve,reject) => {
    const client = net.connect(port,resolve);
    client.on('error', err => {
      client.destroy();
      reject();
    });
  });
}

function waitPort(port) {
  return checkPort(port).catch(e => new Promise((resolve,reject) => {
    setTimeout(() => waitPort(port).then(resolve,reject));
  }));
}

function createWebDriver() {
  const serverConfig = {host:'localhost',port:4723};
  driver = wd.promiseChainRemote(serverConfig);
  logsHandler(driver);
  return driver.init(WEBDRIVER_CAPS);
}

function stop() {
  return driver.quit().then(() => {
    return appiumChildProcess.kill('SIGHUP');
  });
}
