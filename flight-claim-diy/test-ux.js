const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: { dir: './videos/' },
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. Landing Page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'screenshot_landing.png' });
    console.log('Saved landing page screenshot');

    // 2. Click "Start Your Claim Now"
    await page.click('text=Start Your Claim Now');
    await page.waitForURL('**/claim');
    await page.waitForLoadState('networkidle');

    // Step 1
    await page.fill('input[name="airline"]', 'Lufthansa');
    await page.fill('input[name="flightNumber"]', 'LH123');
    await page.fill('input[name="date"]', '2023-10-01');
    await page.screenshot({ path: 'screenshot_claim_step1.png' });
    console.log('Saved claim form step 1');
    await page.click('button:has-text("Next")');

    // Step 2
    await page.fill('input[name="departure"]', 'FRA');
    await page.fill('input[name="arrival"]', 'JFK');
    await page.fill('input[name="distanceKm"]', '6200');
    await page.waitForTimeout(500); // wait for animation
    await page.screenshot({ path: 'screenshot_claim_step2.png' });
    console.log('Saved claim form step 2');
    await page.click('button:has-text("Next")');

    // Step 3
    await page.fill('input[name="delayHours"]', '4');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot_claim_step3.png' });
    console.log('Saved claim form step 3');

    // 4. Submit form
    await page.click('button:has-text("See Results")');
    await page.waitForURL('**/checkout/*');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for framer motion
    await page.screenshot({ path: 'screenshot_checkout.png' });
    console.log('Saved checkout screenshot');

    // 5. Pay (mock)
    await page.click('button:has-text("Pay €9 & Get Letter")');
    await page.waitForURL('**/success/*');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for confetti
    await page.screenshot({ path: 'screenshot_success.png' });
    console.log('Saved success screenshot');

    // 6. Generate letter
    await page.fill('input[id="name"]', 'Max Mustermann');
    await page.fill('input[id="address"]', 'Musterstraße 1, 10115 Berlin');
    await page.click('button:has-text("Generate My Letter")');
    await page.waitForSelector('text=Dear Sir/Madam');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot_letter.png' });
    console.log('Saved generated letter screenshot');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await context.close();
    await browser.close();
  }
})();
