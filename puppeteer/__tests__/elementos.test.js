const puppeteer = require('puppeteer');

describe('Interactuando con elementos', () => {
    it('Deberia interactuar con los elementos de la pagina', async () => { 
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: null
        });
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.click('#tried-section > label', { button: 'left', delay: 1000})
        await browser.close()
    }, 30000)
})