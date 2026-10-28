const puppeteer = require('puppeteer');

    describe('Mi primer test en Puppeteer', () => {
        it('Debería abrir una página y cerrarla', async () => {
            const browser = await puppeteer.launch({
                headless: false,
                slowMo: 200,
            });

            const page = await browser.newPage();
            await page.goto('https://www.google.com');
            await page.waitForTimeout(3000);
            await browser.close();
        }, 7000);
    });