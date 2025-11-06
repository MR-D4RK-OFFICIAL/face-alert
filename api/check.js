const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

module.exports = (req, res) => {
  if (!fs.existsSync(dataPath)) {
    return res.json({ matches: [] });
  }

  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  // demo result
  const matches = data.map((d) => ({
    name: d.name,
    foundAt: `https://facebook.com/search/photos?q=${encodeURIComponent(
      d.name
    )}`,
  }));

  res.json({ matches });
};
