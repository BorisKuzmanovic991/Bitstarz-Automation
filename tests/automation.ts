import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    page.setDefaultTimeout(60000);

  await page.goto('https://test.bitstarz.com/');

  // Sign up process
  await page.click('button:has-text("Sign Up")');
  await page.fill('input[placeholder="Enter your email"]', 'b.kuzmanovic7+47@gmail.com');
  await page.click('button:has-text("Continue")');
  await page.fill('input[placeholder="Create username"]', 'borisautomation');
  await page.click('button:has-text("Continue")');
  await page.fill('input[placeholder="Password"]', 'Bk1234567.');
  await page.click('button:has-text("Continue")');
  await page.click('#sign-up-modal :text("EUR")');
  await page.click('button:has-text("Confirm")');
  await page.click('button:has-text("Yes, totally!")');

  // Validate error message
  const errorMessageExists = await page.waitForSelector('div[role="status"] >> div');
  expect(errorMessageExists).toBeTruthy();

  // Scroll down the page
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight / 2); // Scroll down by half of the viewport height
  });

  // Click on the "Jackpotz Mania Logo" link
  await page.click('a[href="/promo/jackpotz-mania"]');


   // Wait for the FAQ items to load
  await page.waitForSelector('.c-jackpotz-mania-faq-item', { timeout: 90000 });


   // Select the first three FAQ items
   const faqItems = await page.$$('.c-jackpotz-mania-faq-item');
   for (let i = 0; i < 3; i++) {
     const faqItem = faqItems[i];
     const questionElement = await faqItem.$('.c-jackpotz-mania-faq-item__text');
     const descriptionElement = await faqItem.$('.c-jackpotz-mania-faq-item__icon-svg');
 
     if (questionElement && descriptionElement) {
       const question = await questionElement.textContent();
       console.log('Question:', question);
 
       const description = await descriptionElement.getAttribute('xlink:href');
       console.log('Description:', description);
 
       
     } else {
       console.log('Question or description element not found');
        }
    }
    // Scroll back to the top of the page
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

  // Search for a game
  await page.fill('input#gameSearchInput', 'book of dead');
  console.log("Searching for the game...");

  // Wait for the search results container to be visible 
  const searchResultsContainer = await page.waitForSelector('div[aria-label="Search results"]', { timeout: 1000000 });
  console.log("Search results container is visible.");

  // Wait for the "Book of Dead" text element within the search results container
  await searchResultsContainer.waitForSelector('text="Book of Dead"', { timeout: 60000 });
  console.log("Game found in the search results.");

  // Click on the "Book of Dead" game
await page.click('a[href="/slots/book-of-dead"]');

  // Get the title of the game
  const gameTitle = await page.textContent('.game-frame .game-title');
  console.log('Game Title:', gameTitle);
});
