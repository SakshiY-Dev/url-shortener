const express = require("express");
const router = express.Router();
const Url = require("../models/url");

router.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;

    const urlData = await Url.findOne({ short_code: shortcode });

    if (!urlData) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlData.clicks += 1;
    await urlData.save();

    let redirectUrl = urlData.original_URL;
    if (!/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = "http://" + redirectUrl;
    }

    return res.redirect(redirectUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).json({ error: "Server error while redirecting" });
  }
});

module.exports = router;
