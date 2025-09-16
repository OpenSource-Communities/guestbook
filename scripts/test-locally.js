#!/usr/bin/env node

/**
 * Local testing script for contributors
 * This allows contributors to test their JSON file and see how it will appear in the README
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function testContributor(username) {
    console.log('🧪 Testing your contributor file locally...');
    
    const contributorFile = path.join('contributors', `${username}.json`);
    
    // Check if the contributor file exists
    if (!fs.existsSync(contributorFile)) {
        console.error(`❌ File not found: ${contributorFile}`);
        console.error('💡 Make sure you\'ve created your contributor file first!');
        process.exit(1);
    }
    
    console.log(`📁 Found contributor file: ${contributorFile}`);
    
    // Validate the JSON file
    console.log('🔍 Validating JSON format...');
    let data;
    try {
        const content = fs.readFileSync(contributorFile, 'utf8');
        data = JSON.parse(content);
        console.log('✅ JSON format is valid');
    } catch (e) {
        console.error(`❌ Invalid JSON format in ${contributorFile}`);
        console.error('💡 Check your JSON syntax - use quotes around all strings!');
        process.exit(1);
    }
    
    // Validate required fields
    console.log('🔍 Checking required fields...');
    const errors = [];
    const requiredFields = ['name', 'github', 'contributions'];
    
    requiredFields.forEach(field => {
        if (!data[field]) {
            errors.push(`Missing field: ${field}`);
        } else if (field === 'contributions' && (!Array.isArray(data[field]) || data[field].length === 0)) {
            errors.push('contributions must be a non-empty array');
        }
    });
    
    if (data.github !== username) {
        errors.push(`GitHub username '${data.github}' doesn't match filename '${username}.json'`);
    }
    
    if (errors.length > 0) {
        console.error('❌ Validation errors:');
        errors.forEach(error => console.error(`  - ${error}`));
        process.exit(1);
    }
    
    console.log('✅ All required fields present and valid');
    console.log(`📝 Name: ${data.name}`);
    console.log(`👤 GitHub: @${data.github}`);
    if (data.profile) {
        console.log(`🔗 Profile: ${data.profile}`);
    }
    console.log(`🎯 Contributions: ${data.contributions.join(', ')}`);
    
    // Create backups
    console.log('💾 Creating backup of current README...');
    if (fs.existsSync('README.md')) {
        fs.copyFileSync('README.md', 'README.md.backup');
    }
    if (fs.existsSync('.all-contributorsrc')) {
        fs.copyFileSync('.all-contributorsrc', '.all-contributorsrc.backup');
    }
    
    // Create test all-contributors config
    console.log('⚙️  Setting up test environment...');
    const testConfig = {
        projectName: "guestbook",
        projectOwner: "OpenSource-Community",
        repoType: "github",
        repoHost: "https://github.com",
        files: ["README.md"],
        imageSize: 100,
        commit: false,
        commitConvention: "angular",
        contributors: [
            {
                login: data.github,
                name: data.name,
                avatar_url: `https://github.com/${data.github}.png`,
                profile: data.profile || `https://github.com/${data.github}`,
                contributions: data.contributions
            }
        ]
    };
    
    fs.writeFileSync('.all-contributorsrc', JSON.stringify(testConfig, null, 2));
    console.log('✅ Test configuration created');
    
    // Generate test README section
    console.log('🎨 Generating test preview...');
    try {
        execSync('npx all-contributors generate', { stdio: 'inherit' });
    } catch (e) {
        console.error('❌ Error generating preview');
        // Restore files
        restoreFiles();
        process.exit(1);
    }
    
    // Show the contributor section
    console.log('\n🎉 SUCCESS! Here\'s how your contribution will appear:');
    console.log('==================================================\n');
    
    // Extract and show the contributor section
    try {
        const readmeContent = fs.readFileSync('README.md', 'utf8');
        const startMarker = '<!-- ALL-CONTRIBUTORS-LIST:START';
        const endMarker = '<!-- ALL-CONTRIBUTORS-LIST:END -->';
        
        const startIndex = readmeContent.indexOf(startMarker);
        const endIndex = readmeContent.indexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
            const contributorsSection = readmeContent.substring(startIndex, endIndex + endMarker.length);
            console.log(contributorsSection);
        } else {
            console.log('Could not extract contributors section');
        }
    } catch (e) {
        console.error('Error reading README:', e.message);
    }
    
    console.log('\n==================================================\n');
    
    // Restore original files
    restoreFiles();
    
    console.log('✅ Test complete! Your contributor file looks good.\n');
    console.log('🚀 Next steps:');
    console.log(`  1. git add ${contributorFile}`);
    console.log(`  2. git commit -m 'Add ${username} as a contributor'`);
    console.log(`  3. git push origin your-branch-name`);
    console.log('  4. Create your pull request on GitHub!');
    console.log('\n💡 Remember: The actual README will be updated automatically after your PR is merged!');
}

function restoreFiles() {
    console.log('🔄 Restoring original files...');
    
    if (fs.existsSync('README.md.backup')) {
        fs.renameSync('README.md.backup', 'README.md');
    }
    if (fs.existsSync('.all-contributorsrc.backup')) {
        fs.renameSync('.all-contributorsrc.backup', '.all-contributorsrc');
    }
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 1) {
        console.log('Usage: node scripts/test-locally.js your-username');
        console.log('Example: node scripts/test-locally.js johndoe');
        process.exit(1);
    }
    
    const username = args[0];
    
    try {
        testContributor(username);
    } catch (e) {
        console.error('Error:', e.message);
        restoreFiles();
        process.exit(1);
    }
}

// Handle interruptions
process.on('SIGINT', () => {
    console.log('\n\nInterrupted! Restoring files...');
    restoreFiles();
    process.exit(1);
});

if (require.main === module) {
    main();
}