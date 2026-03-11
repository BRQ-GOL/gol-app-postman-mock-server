const fs = require("fs");
const path = require("path");

const MOCKS_DIR = path.resolve("mocks");
const OUTPUT = path.resolve("collection.json");

function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error parsing JSON: ${filePath}`);
    throw error;
  }
}

function readDirRecursive(dir) {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith(".")) 
    .sort((a, b) => a.name.localeCompare(b.name));

  const items = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const children = readDirRecursive(fullPath);

      if (children.length > 0) {
        items.push({
          name: entry.name,
          item: children,
        });
      }

      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      const json = readJSON(fullPath);
      items.push(json);
    }
  }

  return items;
}

function buildCollection() {
  if (!fs.existsSync(MOCKS_DIR)) {
    console.error(`❌ Directory not found: ${MOCKS_DIR}`);
    process.exit(1);
  }

  const collection = {
    info: {
      name: "GOL App Mock Server",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: readDirRecursive(MOCKS_DIR),
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(collection, null, 2) + "\n");

  console.log(`✅ Collection generated: ${OUTPUT}`);
}

buildCollection();