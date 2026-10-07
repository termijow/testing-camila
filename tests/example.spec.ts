import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('html').click();
  await page1.goto('https://www.uniminuto.edu/');
  await page1.goto('https://www.uniminuto.edu/');
  await page1.getByRole('heading', { name: 'ACTUALIDAD UNIMINUTO' }).click();
  await page1.locator('.owl-item.active > .s-sliderRec__item > picture > .img-fluid').first().click();
});