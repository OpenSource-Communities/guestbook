# Contributors Directory

This directory contains individual JSON files for each contributor to the guestbook.

## 📖 How to Add Yourself

**For complete instructions on adding yourself as a contributor, please see:**

➡️ **[Contributor Guide](../docs/guides/contributor-guide.md)** - Step-by-step instructions

## 🧪 How to Test Your Contribution

**Want to test your contribution locally before submitting?**

➡️ **[Testing Guide](../docs/guides/testing-your-contribution.md)** - Verify your contribution works

## 📁 What's in This Directory

- **`username.json`** - Individual contributor files (310 total)
- **`example-contributor.json`** - Template showing the correct format
- **`.gitkeep`** - Ensures this directory is tracked in git

## 🚀 Quick Start

1. Create a file named `your-github-username.json`
2. Fill it with your information:
   ```json
   {
     "name": "Your Full Name",
     "github": "your-github-username",
     "profile": "https://your-website.com",
     "contributions": ["code", "doc", "ideas"]
   }
   ```
3. Test locally: `npm run contributors:preview your-github-username`
4. Submit your PR!

**That's it!** The README will be automatically updated after your PR is merged.

---

📖 **Need more help?** Check the [full contributor guide](../docs/guides/contributor-guide.md)!