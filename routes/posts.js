const express = require("express");
const router = express.Router();
const verify = require("../config/verifyToken");

/* Protected route. */
router.get("/", verify, function (req, res) {
  res.json({
    posts: {
      title: "The header can be customized via the options",
      description:
        "Generated jwts will include an iat (issued at) claim by default unless noTimestamp is specified",
    },
    user: req.user,
  });
});

module.exports = router;
