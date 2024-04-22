const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("posts", {
    user: 0,
    images: 0,
  });

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: `not found` });
  }
});

usersRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    ...req.body,
    passwordHash: passwordHash,
  });

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
});

usersRouter.put("/:id", async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const updateUser = { ...req.body, passwordHash };
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateUser, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.status(200).json(updatedUser);
});

usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).end();
});

module.exports = usersRouter;
