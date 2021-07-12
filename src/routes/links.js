const Router = require("express").Router();
const Link = require("../models/LinksModel");

//Get all links
Router.get("/links", async (req, res) => {
  const links = await Link.find().sort({ date: "desc" }).lean();

  res.render("links/list", { links });
});

//Add new link
Router.get("/links/new-link", (req, res) => {
  res.render("links/new-link");
});
Router.post("/links/new-link", async (req, res) => {
  const { title, url, description } = req.body;

  const link = new Link({
    title,
    url,
    description
  });
  await link.save();

  res.redirect("/links");
});

//Edit one link
Router.get("/link/edit/:id", (req, res) => {
  res.send("Edit one");
});

Router.put("/link/edit/:id", (req, res) => {
  res.send("Editing");
});

//Delete one link

Router.delete("/links/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Link.findByIdAndRemove({ _id: id });
  res.redirect("/links");
});

module.exports = Router;
