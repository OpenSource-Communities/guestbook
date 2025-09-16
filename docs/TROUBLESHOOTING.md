# Troubleshooting Guide

## Common Issues and Solutions

### npm command not found
**Problem:** When running `npm install`, you get "command not found"

**Solution:** You need to install Node.js:
- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS version
- After installation, restart your terminal

### Permission denied when running scripts
**Problem:** Getting permission errors when running npm scripts

**Solution:** The scripts need to be executable:
```bash
chmod +x scripts/*.sh
```

### JSON validation errors
**Problem:** Your contributor file shows as invalid

**Common causes:**
1. **Missing comma:** Each line except the last needs a comma
2. **Wrong quotes:** Use double quotes (") not single quotes (')
3. **Username mismatch:** The filename must match the github field

**Example of correct format:**
```json
{
  "name": "Jane Doe",
  "github": "janedoe",
  "profile": "https://github.com/janedoe",
  "contributions": ["code", "doc"]
}
```

### Preview script shows "File not found"
**Problem:** Running `npm run contributors:preview username` shows file not found

**Solutions:**
1. Make sure you're in the repository root directory
2. Check that your file is named correctly: `contributors/username.json`
3. Use lowercase for the filename

### Contributions not showing in README after merge
**Problem:** Your PR was merged but you don't see your profile in the README

**Explanation:** The GitHub Action needs a few minutes to run and update the README. Check back in 5-10 minutes.

### Test script errors
**Problem:** The test script fails with various errors

**Solutions:**
1. Make sure you have all-contributors-cli installed: `npm install`
2. Check that your JSON file is valid
3. Ensure you're running from the repository root directory

**Note:** All scripts are now JavaScript-based, so you only need Node.js installed (no Python required)

## Still Having Issues?

If you're still experiencing problems:

1. Check [GitHub Discussions](https://github.com/OpenSource-Communities/guestbook/discussions)
2. Search existing issues
3. Create a new issue with:
   - The command you ran
   - The full error message
   - Your operating system

## Alternative: Manual Validation

If the scripts aren't working for you:

1. Create your JSON file manually
2. Validate it at [jsonlint.com](https://jsonlint.com/)
3. Ensure:
   - Filename matches your GitHub username
   - All required fields are present
   - Valid contribution types are used
4. Submit your PR

The GitHub Actions will validate your contribution when you submit the PR!