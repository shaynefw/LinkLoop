const thoughtController = require('../controllers/thought-controller');
const router = require('express').Router();

router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router.route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThoughtById)
  .delete(thoughtController.deleteThoughtById);

router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction);

module.exports = router;