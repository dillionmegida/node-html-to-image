const puppeteer = require('puppeteer')
const handlebars = require('handlebars')

module.exports = async function({
  html,
  output,
  type,
  content,
  waitUntil = 'load',
  puppeteerArgs = {},
}) {
  if (!html) {
    throw Error('You must provide an html property.')
  }
  if (!output) {
    throw Error('You must provide an output property.')
  }
  const browser = await puppeteer.launch({ ...puppeteerArgs, headless: true })
  const page = await browser.newPage()
  if (content) {
    const template = handlebars.compile(html)
    html = template(content, { waitUntil })
  } 
  await page.setContent(html)
  const element = await page.$('body')
  await element.screenshot({ path: output, type })
  await browser.close()
}
