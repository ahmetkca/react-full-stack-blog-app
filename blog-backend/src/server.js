import express from 'express';
import bodyParser from 'body-parser';

const articlesInfo = {
  articles: [
    {
      name: "learn-react",
      upvotes: 0,
    },
    {
      name: 'learn-node',
      upvotes: 0,
    },
    {
      name: 'my-thoughts-on-resume',
      upvotes: 0,
    },
  ]
}

const app = express();

app.use(bodyParser.json());



app.listen(8000, () => console.log('Listening on port 8000...'));

