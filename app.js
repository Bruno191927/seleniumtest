const {Builder, By, Key, until} = require('selenium-webdriver');
const schedule = require('node-schedule');
const {bot1Account,bot1Channels} = require('./components/bots/bot1');
const { bot2Account, bot2Channels } = require('./components/bots/bot2');
const { bot3Account, bot3Channels } = require('./components/bots/bot3');


async function search(emailData,messageDataHeader,messageDataBody,messageDataFooter,data){
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.sleep(1000);
  await driver.get("https://discord.com/login");
  await driver.findElement({name:"email"}).sendKeys(emailData.userName);
  await driver.findElement({name:"password"}).sendKeys(emailData.password);
  await driver.sleep(1000);
  await driver.findElement({css:"button[type='submit']"}).click();
  await driver.sleep(1000);
  await driver.get("https://discord.com/channels/@me");
  for await (const link of data.channels){
    try {
      await driver.sleep(2000);
      await driver.get(link);
      await driver.sleep(7000);

      /**
       * Aqui Probaremos el if del login
       * 
       */
       var currentUrl = await driver.getCurrentUrl();
       console.log('-----link------');
       console.log(currentUrl);
       console.log('----link2-----');
       console.log(link);
 
       if(currentUrl != link){
         console.log('----Links no iguales intentar iterar');
         await driver.sleep(1000);
         await driver.get("https://discord.com/login");
         await driver.findElement({name:"email"}).sendKeys(emailData.userName);
         await driver.findElement({name:"password"}).sendKeys(emailData.password);
         await driver.sleep(1000);
         await driver.findElement({css:"button[type='submit']"}).click();
         await driver.sleep(1000);
         await driver.get("https://discord.com/channels/@me");
         await driver.sleep(2000);
         await driver.get(link);
         await driver.sleep(7000);
       }

      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys(messageDataHeader);
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys(messageDataBody);
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys(messageDataFooter);
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('https:');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('//cdn.discordapp.com/attachments/252643900286697474/940018229911367700/Blue_BasicLight.gif');
      await driver.actions().keyDown(Key.SHIFT).sendKeys(Key.ENTER).keyUp(Key.SHIFT).perform();
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('https:');
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('//discord.gg/rHJNRvwJ2e');
      await driver.findElement({className:'slateTextArea-27tjG0'}).click();
      await driver.findElement({className:'slateTextArea-27tjG0'}).sendKeys('',Key.ENTER);
    } catch (err) {
      console.log('-----------Ha ocurrido un error---------------');
      console.log('Cuenta ---->'+emailData.userName);
      console.log('Canal ---->'+link);
      console.log('-----------Reparar lo antes posible-----------');
      console.log('Error Mensaje');
      console.log(err);
    }
  }
  await driver.close();
}

async function startBot() {
  var probability = Math.floor(Math.random() * 10);
  if( probability <= 4){
    var messageDH = `Hey guys, would really appreciate if you could help me get whitelisted for Los Lobos: A Metawolf Society. Their NFT project is going to have massive utility and the art is absolutely beautiful. The artists that helped create these masterpieces have worked for Disney, Pixar, and Dungeons and Dragons :eyes: `;
    var messageDB = `The whitelist ensures I have a spot to get one of their Metawolves and their supply is super limited. Their whitelist also has special surprise for their first supporters :hot_face:`;
    var messageDF = `Do yourself a favor check them out and join the community, this project is going to CRUSH it. This isn't a project either of us want to miss, it's going to have Crypto Bull level hypeand demand :comet:`;
    search(bot1Account,messageDH,messageDB,messageDF,bot1Channels);
  }
  else if(probability > 4 && probability<= 7 ){

    var messageDH = `If I don't get into the whitelist for this NFT project, I am going to go insane. It has the potential of being the next HYPE project of 2022 and it has INSANE utility :fire:, not to mention the art is phenomenal. The creators of these wolves have worked on projects for Pixar, Nintendo, and Dungeons and Dragons :exploding_head:`;
    var messageDB = `The whitelist for Los Lobos: A Metawolf Society makes sure I have a spot to mint once they launch AND the first 1666 people to whitelist get a SPECIAL surprise for being early supporters of the project.`;
    var messageDF = `This NFT project is going to absolutely KILL it and there is no way I'm missing out on this one, so do yourself and me a favor by joining their community. You won't regret it :rocket:`;
    search(bot2Account,messageDH,messageDB,messageDF,bot2Channels);
  }
  else {
    var messageDH = `This NFT project is about to do crazy numbers and I need to get on the whitelist before it's completely filled up. Los Lobos: A Metawolf Society is going to be the next BIG thing and this whitelist spot guarantees I don't miss out on what will be the next BIG project that everyone hypes :rocket:`;
    var messageDB = `Not only do they have amazing artwork like CloneX and HAPEBEAST, but they plan on bringing SO much utility to their holders and community members :gem:`;
    var messageDF = `This community is about to blow up , and I'm not going to miss out on this project like I did the others. Don't miss out on YOUR chance to become a member of the wolf pack :new_moon:`;
    search(bot3Account,messageDH,messageDB,messageDF,bot3Channels);
  }
}

startBot();

schedule.scheduleJob('0 * * * *',()=> {
  console.log('Ejecucion de 1 hora');
  console.log('---------------------------------------------------');
  startBot();
});


