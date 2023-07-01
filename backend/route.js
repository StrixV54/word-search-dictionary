import express from "express";
import google from "googlethis";

const router = express.Router();

const options = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: true, // If set to true sponsored results will be parsed
  additional_params: {
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: "en",
  },
};

router.get("/dict/:text", (req, res) => {
  const data = "amazing"; //"define " + req.params.text;
  console.log(data);
  const response = async (data) => {
    const googres = await google.search(data, options);
    res.send(`${JSON.stringify(googres)}`);
  };
  response(data);
});

export default router;
