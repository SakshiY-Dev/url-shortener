const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/url");

router.post("/shorten", async (req, res) => {
  let { original_URL } = req.body;

  if (!original_URL) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    if (!/^https?:\/\//i.test(original_URL)) {
      original_URL = "http://" + original_URL;
    }

    let existing = await Url.findOne({ original_URL });
    if (existing) {
      return res.json({
        short_url: `${process.env.BASE_URL || "http://localhost:5000"}/${
          existing.short_code
        }`,
      });
    }

    const short_code = nanoid(6);
    const new_URL = await Url.create({ original_URL, short_code });

    res.json({
      short_url: `${
        process.env.BASE_URL || "http://localhost:5000"
      }/${short_code}`,
    });
  } catch (error) {
    console.error("Shorten error:", error);
    res.status(500).json({ error: "Server error while creating short URL" });
  }
});
router.get("/admin/list", async (req, res) => {
  const { admin_key } = req.query;

  if (admin_key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const urls = await Url.find().sort({ createdAt: -1 });

    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
