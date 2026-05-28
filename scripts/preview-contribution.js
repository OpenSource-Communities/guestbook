#!/usr/bin/env node

/**
 * Simple preview script for contributor JSON files
 * Shows how the contributor will appear without modifying any files
 */

const fs = require('fs');
const path = require('path');

function previewContributor(username) {
    const contributorFile = path.join('contributors', `${username}.json`);
    
    if (!fs.existsSync(contributorFile)) {
        console.log(`❌ File not found: ${contributorFile}`);
        console.log(`💡 Create ${contributorFile} first!`);
        return false;
    }
    
    let data;
    try {
        const content = fs.readFileSync(contributorFile, 'utf8');
        data = JSON.parse(content);
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(`❌ Invalid JSON in ${contributorFile}: ${e.message}`);
        } else {
            console.log(`❌ Error reading ${contributorFile}: ${e.message}`);
        }
        return false;
    }
    
    // Validate required fields
    const required = ['name', 'github', 'contributions'];
    const missing = required.filter(field => !data[field] || (Array.isArray(data[field]) && data[field].length === 0));
    
    if (missing.length > 0) {
        console.log(`❌ Missing required fields: ${missing.join(', ')}`);
        return false;
    }
    
    // Check username match
    if (data.github !== username) {
        console.log(`❌ Username mismatch:`);
        console.log(`   Filename: ${username}.json`);
        console.log(`   JSON github field: ${data.github}`);
        console.log(`   These must match!`);
        return false;
    }
    
    console.log('✅ Contributor file validation passed!');
    console.log();
    
    // Show preview
    const name = data.name;
    const github = data.github;
    const profile = data.profile || `https://github.com/${github}`;
    const contributions = data.contributions;
    
    console.log('🎨 Preview of your contributor profile:');
    console.log('='.repeat(50));
    console.log(`👤 Name: ${name}`);
    console.log(`🔗 Profile: ${profile}`);
    console.log(`📷 Avatar: https://github.com/${github}.png`);
    console.log(`🎯 Contributions: ${contributions.join(', ')}`);
    console.log();
    
    // Show contribution icons
    const contributionIcons = {
        'a11y': '♿️', 'audio': '🔊', 'blog': '📝', 'bug': '🐛',
        'business': '💼', 'code': '💻', 'content': '🖋', 'data': '🔣',
        'design': '🎨', 'doc': '📖', 'eventOrganizing': '📋', 'example': '💡',
        'financial': '💵', 'fundingFinding': '🔍', 'ideas': '🤔', 'infra': '🚇',
        'maintenance': '🚧', 'mentoring': '🧑‍🏫', 'platform': '📦', 'plugin': '🔌',
        'projectManagement': '📆', 'promotion': '📣', 'question': '💬', 'research': '🔬',
        'review': '👀', 'security': '🛡️', 'talk': '📢', 'test': '⚠️',
        'tool': '🔧', 'translation': '🌍', 'tutorial': '✅', 'userTesting': '📓',
        'video': '📹'
    };
    
    console.log('🏷️  Your contribution icons:');
    contributions.forEach(contrib => {
        const icon = contributionIcons[contrib] || '❓';
        console.log(`   ${icon} ${contrib}`);
    });
    
    console.log();
    console.log('📱 How it will look in the README:');
    console.log('='.repeat(50));
    
    // Generate HTML preview (simplified)
    const iconsHtml = contributions
        .map(contrib => `<a href="#${contrib}-${github}" title="${contrib.charAt(0).toUpperCase() + contrib.slice(1)}">${contributionIcons[contrib] || '❓'}</a>`)
        .join(' ');
    
    const htmlPreview = `
<td align="center" valign="top" width="14.28%">
  <a href="${profile}">
    <img src="https://github.com/${github}.png?s=100" width="100px;" alt="${name}"/>
    <br />
    <sub><b>${name}</b></sub>
  </a>
  <br />
  ${iconsHtml}
</td>`;
    
    console.log(htmlPreview);
    console.log();
    console.log('='.repeat(50));
    console.log('✅ Your contribution looks great!');
    console.log();
    console.log('🚀 Next steps:');
    console.log(`  1. git add ${contributorFile}`);
    console.log(`  2. git commit -m 'Add ${name} as a contributor'`);
    console.log(`  3. git push origin your-branch-name`);
    console.log(`  4. Create your pull request on GitHub!`);
    console.log();
    console.log('💡 After your PR is merged, this exact profile will appear in the README automatically!');
    
    return true;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 1) {
        console.log('Usage: node scripts/preview-contribution.js your-username');
        console.log('Example: node scripts/preview-contribution.js johndoe');
        process.exit(1);
    }
    
    const username = args[0];
    const success = previewContributor(username);
    
    if (!success) {
        console.log();
        console.log('🔧 Need help?');
        console.log('  - Check the template in docs/guides/contributor-guide.md');
        console.log('  - Validate JSON syntax at https://jsonlint.com/');
        console.log('  - Ask questions in GitHub Discussions');
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}