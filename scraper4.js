const puppeteer = require('puppeteer-core');

async function fetchSwgStatus() {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser', // Path to your Chromium or Chrome browser
      headless: true, // Run in headless mode
    });

    const page = await browser.newPage();

    // Navigate to the page
    await page.goto('https://status.umbrella.com/#/', { waitUntil: 'networkidle2' });

    // Extract the service status
    const serviceStatus = await page.evaluate(() => {
      const statusElement = document.querySelector('#serviceSecureWebGateway');
      if (statusElement) {
        const textContent = statusElement.innerText.trim().toLowerCase();
        return textContent.includes('online') ? 'Online' : 'Service Degraded';
      }
      return 'Estado no encontrado';
    });

    // Close the browser
    await browser.close();

    // Return the extracted status
    return serviceStatus
  } catch (error) {
    console.error('Error fetching SWG status:', error);
    return 'Error fetching status';
  }
}

// Export the function
module.exports = fetchSwgStatus;
