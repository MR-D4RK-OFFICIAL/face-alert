const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

module.exports = (req, res) => {
  if (req.method === "POST") {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl)
      return res.status(400).json({ message: "Missing fields" });

    let data = [];
    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    }

    data.push({ name, imageUrl });
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return res.json({ message: "✅ Uploaded successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
