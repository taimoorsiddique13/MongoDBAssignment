const Item = require("../models/Item");

exports.createItem = (req, res) => {
  const item = new Item(req.body);
  item
    .save()
    .then((savedItem) => res.json(savedItem))
    .catch((err) => res.status(400).json(err));
};

exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json(err));
};

exports.updateItem = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(err));
};

exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Deleted" }))
    .catch((err) => res.status(500).json(err));
};
