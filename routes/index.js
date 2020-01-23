var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

async function getUser (id) {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.steamtrades.com/')

    await page.focus('input[placeholder="Search by Steam ID, vanity name, or profile URL..."]')
    await page.keyboard.type(id)
    const button = await page.$$('i.fa-search')
    await button[1].click()
    await page.waitForNavigation();
    let bodyHTML = await page.evaluate(() => document.body.innerHTML)
    return {
      bodyHTML: bodyHTML
    }
}


router.get('/user/:id',(req, res, next) => {
   getUser(req.params.id)
    .then ( bar => {
       res.send(bar)
     } )
    .catch(next); // error passed on to the error handling route
})

module.exports = router;
