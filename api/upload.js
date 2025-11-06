import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, imageUrl } = req.body;
  if (!name || !imageUrl) {
    return res.status(400).json({ message: "Name and Image URL required" });
  }

  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  data.users.push({ name, imageUrl });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return res.status(200).json({ message: "Image saved successfully!" });
}
