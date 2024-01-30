const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { q } = req.query;
  
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`; 

    const response = await fetch(`${apiUrl}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
