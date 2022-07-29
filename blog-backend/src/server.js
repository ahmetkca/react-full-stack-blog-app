import express from 'express';
import bodyParser from 'body-parser';

import { MongoClient } from 'mongodb';

const MONGO_ROOT_USER = "citiz1x";
const MONGO_ROOT_PASSWORD = "S3cret"
const MONGO_CONNSTR = `mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@localhost:27017`;

const app = express();

app.use(bodyParser.json());

app.get('/hello/world', async (_, res) => {
  const client = new MongoClient(MONGO_CONNSTR, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log(client);
    res.status(200).json({ hello: "world" })
  } catch (error) {
    res.status(500).json({ message: "Error: cannot connect to mongodb.", error });
  } finally {
    await client.close();
  }
})

app.get('/api/articles', async (_, res) => {
  const client = new MongoClient(MONGO_CONNSTR, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db('my-blog');
    const articles = await db.collection('articles').find({}).toArray();
    console.log(articles);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error: connection to mongodb.", error });
  } finally {
    await client.close();
  }
})

app.get('/api/articles/:articleName', async (req, res) => {
  const client = new MongoClient(MONGO_CONNSTR, { useNewUrlParser: true });
  try {
    const articleName = req.params.articleName;
    await client.connect();
    const db = client.db('my-blog');
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    if (!articleInfo) return res.status(404).json({ message: `The article with name ${articleName} not found.` });
    res.status(200).json(articleInfo);
  } catch (error) {
    res.status(500).json({ message: "Error: connection to mongodb.", error });
  } finally {
    await client.close();
  }
})

app.post("/api/articles/:articleName/upvote", async (req, res) => {
  const articleName = req.params.articleName;
  if (!articleName) return res.status(400).json({ message: "No article name provided. " });

  const client = new MongoClient(MONGO_CONNSTR, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db('my-blog');

    const filter = { name: articleName };

    const options = {};

    const updateDoc = {
      $inc: {
        upvotes: 1,
      }
    };

    const updateResult = await db.collection('articles').updateOne(filter, updateDoc, options);
    console.log(
      `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`,
    );
    if (updateResult.matchedCount === 0) return res.status(404).json({ message: `No article with name ${articleName} found` });

    const updatedArticle = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error: connection to mongodb.", error });
  } finally {
    await client.close();
  }
})

app.post('/api/articles/:articleName/add-comment', async (req, res) => {
  const articleName = req.params.articleName;
  if (!articleName) return res.status(400).json({ message: "No article name provided. " });

  const client = new MongoClient(MONGO_CONNSTR, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db('my-blog');

    const filter = { name: articleName };

    const updateDoc = {
      $push: {
        comments: req.body.comment,
      },
    };

    const updateResult = await db.collection('articles').updateOne(filter, updateDoc, {});
    if (updateResult.matchedCount === 0) return res.status(404).json({ message: "No article with provided name found." });

    const updatedArticle = await db.collection('articles').findOne(filter);
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error: cannot connect to mongodb.", error });
  } finally {
    await client.close();
  }
})

app.listen(8000, () => console.log('Listening on port 8000...'));

