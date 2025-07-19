
const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.post('/create', async (req, res) => {
  const { question, options } = req.body;

  try {
    const poll = new Poll({
      question,
      options: options.map(text => ({ text }))
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Could not create poll' });
  }
});

router.get('/', async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});

router.post('/:pollId/vote', async (req, res) => {
  const { optionIndex } = req.body;

  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Could not vote' });
  }
});

module.exports = router;
