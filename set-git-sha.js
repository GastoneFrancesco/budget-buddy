const fs = require('fs');
const { execSync } = require('child_process');

// Get the current Git commit hash (first 8 chars)
const gitSha = execSync('git rev-parse HEAD').toString().trim().substring(0, 8);

// Get the current Git commit date (AAAAMMGG)
const gitDateRaw = execSync('git show -s --format=%ci --date=local HEAD').toString().trim();
const gitDate = gitDateRaw.substring(0, 10).replace(/-/g, '');

const envPath = '.env';
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, { encoding: 'utf8' });
} catch (err) {
  // If .env doesn't exist, ignore
}

// Function to update or append variable
function updateEnvVariable(content, key, value) {
  const variableRegex = new RegExp(`${key}=.*`, 'g');
  if (content.match(variableRegex)) {
    return content.replace(variableRegex, `${key}=${value}`);
  } else {
    return `${content}\n${key}=${value}`;
  }
}

envContent = updateEnvVariable(envContent, 'REACT_APP_GIT_SHA', gitSha);
envContent = updateEnvVariable(envContent, 'REACT_APP_GIT_DATE', gitDate);

fs.writeFileSync(envPath, envContent);

console.log('Git SHA and Date written to .env:', gitSha, gitDate);