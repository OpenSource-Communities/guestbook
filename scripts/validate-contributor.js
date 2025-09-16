#!/usr/bin/env node

/**
 * Validates all contributor JSON files
 */

const fs = require('fs');
const path = require('path');

function validateContributorFile(filepath) {
    const filename = path.basename(filepath);
    const username = filename.replace('.json', '');
    
    // Skip template files
    if (filename === 'example-contributor.json' || filename === '.gitkeep' || filename === 'README.md') {
        return { valid: true, skipped: true };
    }
    
    let data;
    try {
        const content = fs.readFileSync(filepath, 'utf8');
        data = JSON.parse(content);
    } catch (e) {
        return {
            valid: false,
            errors: [`Invalid JSON: ${e.message}`]
        };
    }
    
    const errors = [];
    const warnings = [];
    
    // Check required fields
    const required = ['name', 'github', 'contributions'];
    required.forEach(field => {
        if (!data[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });
    
    // Check github username matches filename
    if (data.github && data.github !== username) {
        errors.push(`GitHub username '${data.github}' doesn't match filename '${filename}'`);
    }
    
    // Check contributions is an array
    if (data.contributions && !Array.isArray(data.contributions)) {
        errors.push('contributions must be an array');
    } else if (data.contributions && data.contributions.length === 0) {
        errors.push('contributions array cannot be empty');
    }
    
    // Validate contribution types
    const validContributions = [
        'a11y', 'audio', 'blog', 'bug', 'business', 'code', 'content', 'data',
        'design', 'doc', 'eventOrganizing', 'example', 'financial', 'fundingFinding',
        'ideas', 'infra', 'maintenance', 'mentoring', 'platform', 'plugin',
        'projectManagement', 'promotion', 'question', 'research', 'review',
        'security', 'talk', 'test', 'tool', 'translation', 'tutorial',
        'userTesting', 'video'
    ];
    
    if (data.contributions && Array.isArray(data.contributions)) {
        data.contributions.forEach(contrib => {
            if (!validContributions.includes(contrib)) {
                warnings.push(`Unknown contribution type: ${contrib}`);
            }
        });
    }
    
    // Check profile URL format
    if (data.profile && !data.profile.startsWith('http')) {
        warnings.push('profile should be a full URL starting with http:// or https://');
    }
    
    return {
        valid: errors.length === 0,
        errors,
        warnings,
        data
    };
}

function main() {
    console.log('🔍 Validating contributor files...\n');
    
    const contributorsDir = path.join(process.cwd(), 'contributors');
    
    if (!fs.existsSync(contributorsDir)) {
        console.log('❌ Contributors directory not found!');
        process.exit(1);
    }
    
    const files = fs.readdirSync(contributorsDir).filter(f => f.endsWith('.json'));
    
    if (files.length === 0) {
        console.log('❌ No contributor JSON files found!');
        process.exit(1);
    }
    
    let totalFiles = 0;
    let validFiles = 0;
    let skippedFiles = 0;
    let errorFiles = 0;
    let totalWarnings = 0;
    
    files.forEach(file => {
        const filepath = path.join(contributorsDir, file);
        const result = validateContributorFile(filepath);
        
        if (result.skipped) {
            skippedFiles++;
            return;
        }
        
        totalFiles++;
        
        if (result.valid && result.warnings.length === 0) {
            console.log(`✅ ${file}`);
            validFiles++;
        } else if (result.valid && result.warnings.length > 0) {
            console.log(`⚠️  ${file}`);
            result.warnings.forEach(warning => {
                console.log(`   ⚠️  ${warning}`);
            });
            validFiles++;
            totalWarnings += result.warnings.length;
        } else {
            console.log(`❌ ${file}`);
            result.errors.forEach(error => {
                console.log(`   ❌ ${error}`);
            });
            if (result.warnings) {
                result.warnings.forEach(warning => {
                    console.log(`   ⚠️  ${warning}`);
                });
                totalWarnings += result.warnings.length;
            }
            errorFiles++;
        }
    });
    
    console.log('\n📊 Validation Summary:');
    console.log(`  Files checked: ${totalFiles}`);
    console.log(`  Valid: ${validFiles}`);
    console.log(`  Errors: ${errorFiles}`);
    console.log(`  Warnings: ${totalWarnings}`);
    if (skippedFiles > 0) {
        console.log(`  Skipped: ${skippedFiles} (template files)`);
    }
    
    if (errorFiles > 0) {
        console.log('\n❌ Validation failed! Fix the errors above.');
        process.exit(1);
    } else {
        console.log('\n✅ All contributor files are valid!');
    }
}

if (require.main === module) {
    main();
}