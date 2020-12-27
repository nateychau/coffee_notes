const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/auth", (req,res) => {
  passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private"],
      showDialog: true,
    })
});

router.get("/auth/callback",
  passport.authenticate("spotify", {failureRedirect: "/"}),
  function(req,res) {
    console.log("spotify callback");
    res.redirect("/");
  }
);

module.exports = router;