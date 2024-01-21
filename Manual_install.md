# Manual Install
Deploy yourself:
download the source code from a release we make allot of changed so if you download the main branch there may be problems.
So get it from the releases.

Then get a API key from: https://newsapi.org/

Unzip the code.

Run this commands:
```
npm install
npm install express
npm install dotenv
```

Then the packages will be installed!

In the root folder create a file called ".env"
Make this the content:
```
NEWS_API_KEY=Your newsapi.org api key
```

Then create a file called index.js

Don't open it for now.

Open the package.json file.
above dependencies add these lines:
```
"main": "index.js",
"scripts": {
"dev": "node ."
},
```

Now open the index.js make this the content:
```js
require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const filePath = path.join(__dirname, req.url);

  if (!path.extname(filePath)) {
    req.url += '.html';
  }

  next();
}, express.static(__dirname, { extensions: ['html'] }));

app.get('/api/news', async (req, res) => {
  try {
    const newsHandler = require('./api/news.js');

    await newsHandler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Now open the API folder and then open the news.js file.
Edit it and replace the file with:
```js
const fetch = require('node-fetch');

async function handler(req, res) {
  const { country } = req.query;

  try {
    const apiKey = process.env.NEWS_API_KEY;
    console.log('API Key:', apiKey); 

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;
```

Then run 
```
npm run dev
```

Go to the URL
And your SSearch is installed!
