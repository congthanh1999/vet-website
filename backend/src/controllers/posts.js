const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

postsRouter.get("/", async (req, res) => {
  const post = await Post.find({}).populate("user", {
    passwordHash: 0,
    posts: 0,
  });

  res.status(200).json(post);
});

postsRouter.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: `not found` });
  }
});

postsRouter.post("/", async (req, res) => {
  const user = req.user;
  const newPost = new Post({ ...req.body, user: user._id });
  const savedPost = await newPost.save();

  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  res.status(201).json(savedPost);
});

postsRouter.put("/:id", async (req, res) => {
  const updatePost = { ...req.body };
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatePost, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.status(200).json(updatedPost);
});

postsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  user.posts = user.posts.filter(
    (post) => post._id.toString() !== deletedPost._id.toString()
  );
  await user.save();

  res.status(204).end();
});

module.exports = postsRouter;
