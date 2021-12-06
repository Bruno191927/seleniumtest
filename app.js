const {Builder, By, Key, until} = require('selenium-webdriver');

async function search(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://20607090905.listocrm.com/login.php?reparar=ok");
    await driver.findElement({id:"kt_login_user"}).sendKeys("BrunoAP");
    await driver.findElement({id:"kt_login_password"}).sendKeys("1234");
    await driver.findElement({id:"kt_login1"}).click();
    await driver.findElement({className:"swal2-cancel btn ccazul swal2-styled"}).click();
    await driver.navigate().to("http://20607090905.listocrm.com/almacen/insert_prod.php?ftipo=0");
    await driver.findElement({id:"genera"}).click();
    var textPromise = await driver.findElement({id:"serie"}).getAttribute("value");
    
}

search();