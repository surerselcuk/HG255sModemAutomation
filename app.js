const {Builder, By, Key, until, webdriver} = require('selenium-webdriver');



let modemRestart = async ()=>{
    let driver = await new Builder().forBrowser('chrome').setChromeOptions('--headless --disable-gpu').build();


    try {
        
        await driver.get('http://192.168.1.1');
        await driver.findElement(By.id('index_username')).clear();
        await driver.findElement(By.id('index_username')).sendKeys('user');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('password',Key.RETURN);
        await driver.wait(until.titleIs('Home Gateway HG255s'), 30000);

        await driver.get('http://192.168.1.1/html/advance.html#internet');
        let ip = await driver.wait(until.elementLocated(By.id('wan_IPv4Addr_label_ctrl')), 30000).getText();
        await   restart(ip,driver);


    }
    finally {

        await driver.quit();
    }


};

let restart = async (ip,driver) => {
    if(ip.substring(0,3)=='100') {
        await driver.get('http://192.168.1.1/html/advance.html#device_mngt');
        let buttonRestart = await driver.wait(until.elementLocated(By.id('rebootId')), 10000);
        await buttonRestart.click();
        let buttonRestartOk = await driver.wait(until.elementLocated(By.id('dev_mngt_modal_id_ok')), 10000);
        await buttonRestartOk.click();
    }

};

 setInterval(()=>{modemRestart();},1000*60*10);
 setTimeout(()=>{modemRestart();},1000*60);
