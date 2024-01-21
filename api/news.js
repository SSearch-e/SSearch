const fetch = require('node-fetch');

export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`; 

    const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
    const data = await response.json();

    console.log(`${apiUrl}?apiKey=${apiKey}`);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
