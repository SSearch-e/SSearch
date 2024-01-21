# SSearch
The official repo for SSearch (SecureSearch)

We still need allot of websites in our json but when we have allot we will be one of the most secure search engines!

SSearch is a open-source search engine
That can run on almost anything! Because it does not use complex server code,
SSearch is just HTML, CSS, JS and JSON.

Deploy on vercel?

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSSearch-e%2FSSearch&env=NEWS_API_KEY&envDescription=The%20News%20API%20key%20is%20for%20newsapi.org%20get%20a%20API%20key%20there!&demo-title=SSearch%20live%20website&demo-description=The%20official%20live%20SSearch%20website&demo-url=https%3A%2F%2Fssearch-eta.vercel.app&demo-image=https%3A%2F%2Fssearch-eta.vercel.app%2Fimages%2Flogo.png)

Install:
You can deploy it on vercel (easy)

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



Website: https://ssearch-eta.vercel.app/
Blog: https://ssearch-blog.vercel.app/

Latest website ui update: https://github.com/SSearch-e/SSearch/releases/tag/1.0.4

Screenshots:

![SSearch home page](https://ssearch-eta.vercel.app/ssearch-eta.vercel.app_.png)


![SSearch results for google](https://ssearch-eta.vercel.app/ssearch-eta.vercel.app_search_q=google.png)

Old website archive: https://ssearch-eta.vercel.app/old/

Old screenshots:

![SSearch home page](https://github.com/SSearch-e/SSearch/assets/110413038/e9f73817-10af-43d9-bd9e-da74e2f0c8d0)


![SSearch results for google](https://github.com/SSearch-e/SSearch/assets/110413038/10fb73da-4adf-48b8-99b7-6189fe4417d7)
