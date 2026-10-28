const puppeteer = require('puppeteer');

    describe('Mi segundo test en Puppeteer', () => {
        it('Debería abrir una página y redirigir a otra', async () => { 
            const browser = await puppeteer.launch({
                headless: false,
                defaultViewport: null
            });
        const page = await browser.newPage()
        await page.goto('https://yahoo.com')
        await page.waitForSelector('img')
        await page.reload()
        
        await page.goto('https://pptr.dev/')

        await page.waitForSelector('img[align=right]')
        await browser.close()
        }, 20000) 
})