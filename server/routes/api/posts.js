const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    title: req.body.title,
    description: req.body.description,
    items: {
      item: {
        itemName: req.body.items.item.itemName,
        quantity: req.body.items.item.quantity,
        price: req.body.items.item.price,
        itemDescription: req.body.items.item.itemDescription
      }
    },
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://vue-express_123:vue-express_123@vue-express-txuwo.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('posts');
}

module.exports = router;
