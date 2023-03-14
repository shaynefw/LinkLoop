const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        if (dbThoughtData.length === 0) {
          res.status(404).json({ message: "No thoughts found" });
        } else {
          res.json(dbThoughtData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get thought by ID
  getThoughtById({ params }, res) {
    Thought.findById(params.thoughtId)
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this username!" });
        }
        res.json({ message: "Thought created successfully!", dbUserData });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update thought by ID
  updateThoughtById({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $set: body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Thought updated successfully!", dbThoughtData });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Reaction added successfully!", dbThoughtData });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete thought by ID
  deleteThoughtById({ params }, res) {
    Thought.findByIdAndDelete(params.thoughtId)
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this username!" });
        }
        res.json({ message: "Thought deleted successfully!", dbUserData });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Reaction added successfully!", dbThoughtData });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Reaction deleted successfully!", dbThoughtData });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
