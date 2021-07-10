const Router = require("express").Router();

//Get all links
Router.get("/links/", (req, res) => {
  res.render("links/list");
});

//Add new link
Router.get("/links/add-link", (req, res) => {
  res.render("links/add-link");
});
Router.post("/links/add-link", (req, res) => {
  res.send("adding one");
});

//Edit one link
Router.get("/link/edit/:id", (req, res) => {
  res.send("Edit one");
});

Router.put("/link/edit/:id", (req, res) => {
  res.send("Editing");
});

//Delete one link

Router.delete("/links/delete/:id", (req, res) => {
  res.send("Deleting");
});

module.exports = Router;
