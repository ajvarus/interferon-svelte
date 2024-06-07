// /src/tools/passwordFileParser.js

function parsePasswordsFromFile(fileContent) {
  const lines = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const passwords = [];

  for (const line of lines) {
    const match = line.match(/^(.+)=(.+):(.+)$/);
    if (match) {
      passwords.push({
        password_name: match[1].trim(),
        // username: match[2].trim(),
        password: match[3].trim(),
      });
    } else {
      console.error("Invalid password format:", line);
      return [];
    }
  }

  return passwords;
}

export { parsePasswordsFromFile };
