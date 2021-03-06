const Router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAuthenticated } = require("../helpers/authorize");
const Link = require("../models/LinksModel");

//Get all links
Router.get("/links", isAuthenticated, async (req, res) => {
  const links = await Link.find({ user: req.user })
    .sort({ date: "desc" })
    .lean();

  res.render("links/list", { links, name: req.user.name });
});

//Add new link
Router.get("/links/new-link", isAuthenticated, (req, res) => {
  res.render("links/new-link");
});
Router.post(
  "/links/new-link",
  isAuthenticated,
  body("title", "Title is required").not().isEmpty(),
  body("url", "Url is required").not().isEmpty(),

  async (req, res) => {
    const { title, url, description } = req.body;

    const validations = validationResult(req);
    const errors = validations.errors;
    if (!validations.isEmpty()) {
      // req.flash("error_msg");
      // res.redirect("/links/new-link");
      res.render("links/new-link", {
        title,
        url,
        description,
        errors
      });
    } else {
      const link = new Link({
        title,
        url,
        description,
        user: req.user
      });
      await link.save();

      console.log("yes");
      res.redirect("/links");
    }
  }
);

//Edit one link
Router.get("/links/edit/:id", isAuthenticated, async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id });
  const { _id, title, url, description } = link;

  res.render("links/edit-link", { _id, title, url, description });
});

Router.put(
  "/links/edit/:id",
  isAuthenticated,
  body("title", "Title is required").not().isEmpty(),
  body("url", "Url is required").not().isEmpty(),
  async (req, res) => {
    const _id = req.params.id;
    const { title, url, description } = req.body;

    const validation = validationResult(req);

    //See if there are errors
    if (!validation.isEmpty()) {
      const errors = validation.errors;
      res.render("links/edit-link", {
        _id,
        title,
        url,
        description,
        errors
      });
    } else {
      await Link.findByIdAndUpdate(_id, { title, url, description });
      req.flash("success_msg", "Link Updated Successfully");
      res.redirect("/links");
    }
  }
);

//Delete one link

Router.delete("/links/delete/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  await Link.findByIdAndRemove({ _id: id });
  res.redirect("/links");
});

module.exports = Router;
