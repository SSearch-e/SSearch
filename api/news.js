const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { country } = req.query;
  
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`; 

    const response = await fetch(`${apiUrl}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
