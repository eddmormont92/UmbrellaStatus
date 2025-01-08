const express = require('express');
const fetchUmbrellaStatus = require('./scraper'); // Import the scraper function
const fetchCdfStatus = require('./scraper2'); // Import the scraper function
const fetchDnsStatus = require('./scraper3'); // Import the scraper function
const fetchSwgStatus = require('./scraper4'); // Import the scraper function

const app = express();
const PORT = 3000;

app.get('/status', async (req, res) => {
  try {
    // Fetch data from all scraper functions
    const umbrellaStatus = await fetchUmbrellaStatus();
    const cdfStatus = await fetchCdfStatus();
    const dnsStatus = await fetchDnsStatus();
    const swgStatus = await fetchSwgStatus();

    // Respond with all statuses
    res.json({
      status: 'success',
     Umbrella: umbrellaStatus,
     CDF: cdfStatus,
     DNS: dnsStatus,
     SWG: swgStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch data',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
