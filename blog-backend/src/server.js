import express from 'express';
import bodyParser from 'body-parser';

const articlesInfo = {
  articles: [
    {
      name: "learn-react",
      upvotes: 0,
      comments: [],
    },
    {
      name: 'learn-node',
      upvotes: 0,
      comments: [],
    },
    {
      name: 'my-thoughts-on-resume',
      upvotes: 0,
      comments: [],
    },
  ]
}

const app = express();

app.use(bodyParser.json());

app.post('/api/articles/:articleName/upvote', (req, res) => {
  const articleName = req.params.articleName;
  if (!articleName) return res.status(400).send("Please provide article name.");

  const article = articlesInfo.articles.find(article => article.name === articleName);
  if (!article) return res.status(404).send('Article is not found!');
  console.log(`Article is found (${articleName})`);

  article.upvotes++;
  console.log(`The article named '${articleName}' now has ${article.upvotes} upvote.`);
  res.status(200).send(article);
});

app.get('/api/articles', (_, res) => res.send(articlesInfo));


app.post('/api/articles/:articleName/add-comment', (req, res) => {
  const articleName = req.params.articleName;
  if (!articleName) return res.status(400).send("Please provide article name.");
  const article = articlesInfo.articles.find(article => article.name === articleName);
  if (!article) return res.status(404).send('Article is not found!');
  article.comments.push(req.body.comment);
  console.log(`Adding comment to the article '${articleName}'.`);
  res.status(200).send(article);
})

app.listen(8000, () => console.log('Listening on port 8000...'));

