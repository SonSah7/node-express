import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

// generate a 32-byte base64-encoded secret key
function generateSecretKey() {
    return crypto.randomBytes(32).toString('base64');
}

function createEnvFile() {
    const envPath = path.join(process.cwd(), '.env');

    if (fs.existsSync(envPath)) {
        console.log('.env file already exists. Skipping secret generation.');
        return;
    }

    const secretKey = generateSecretKey();
    const envContent = `SESSION_SECRET=${secretKey}\n`;

    fs.writeFileSync(envPath, envContent);
    console.log(`Generated session secret and saved to .env: ${secretKey}`);
}

function addToGitignore() {
    const gitignorePath = path.join(process.cwd(), '.gitignore');

    if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignoreContent.includes('.env')) {
            fs.appendFileSync(gitignorePath, '\n.env\n');
            console.log('.env added to .gitignore');
        }
    } else {
        console.log('.gitignore not found! Creating one.');
        fs.writeFileSync(gitignorePath, '.env\n');
        console.log('.gitignore created and .env added.');
    }
}

createEnvFile();
addToGitignore();
