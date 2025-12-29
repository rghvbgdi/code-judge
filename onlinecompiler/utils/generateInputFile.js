const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dirInputs = path.join(process.cwd(), 'tmp', 'inputs');

const generateInputFile = async (input) => {
  const jobId = uuidv4();
  const filename = `${jobId}.txt`;
  const filePath = path.join(dirInputs, filename);

  await fs.mkdir(dirInputs, { recursive: true });
  await fs.writeFile(filePath, input || '');

  return filePath;
};

module.exports = generateInputFile;
