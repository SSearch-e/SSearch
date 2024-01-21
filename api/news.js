const fetch = require('node-fetch');

export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = 'https://newsapi.org/v2/your-news-endpoint'; 

    const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
    const data = await response.json();

    // Return the fetched data as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
