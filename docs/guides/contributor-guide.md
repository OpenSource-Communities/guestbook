# Contributors Directory

Welcome to the guestbook contributors directory! 🎉

## How to Add Yourself as a Contributor

Instead of editing the main README.md file (which causes merge conflicts), you'll add yourself by creating your own contributor file.

### Step-by-Step Instructions

1. **Fork and clone the repository**
   - Fork this repository to your GitHub account
   - Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/guestbook.git
   cd guestbook
   ```

2. **Install dependencies**
   Run the following command in your terminal:
   ```bash
   npm install
   ```

3. **Create your contributor file**
   - In this `contributors/` directory, create a new file named `your-github-username.json`
   - Replace `your-github-username` with your actual GitHub username (lowercase)

4. **Add your information**
   Copy this template and fill in your details:

   ```json
   {
     "name": "Your Full Name",
     "github": "your-github-username",
     "profile": "https://your-website.com",
     "contributions": ["code", "doc", "ideas"]
   }
   ```

   **Profile field:** This should be your personal website URL. If you don't have a personal website, use your GitHub profile URL: `https://github.com/your-username`

5. **Available contribution types**
   You can include any of these contribution types in your `contributions` array:
   - `"code"` - Code contributions
   - `"doc"` - Documentation
   - `"ideas"` - Ideas and planning
   - `"bug"` - Bug reports
   - `"tutorial"` - Tutorials
   - `"design"` - Design
   - `"review"` - Code reviews
   - `"test"` - Testing
   - `"blog"` - Blog posts
   - `"translation"` - Translations
   - `"question"` - Answering questions
   - `"maintenance"` - Maintenance
   - `"infra"` - Infrastructure
   - `"research"` - Research
   - `"talk"` - Talks/presentations
   - `"video"` - Videos
   - `"audio"` - Audio/podcasts
   - `"content"` - Content creation
   - `"data"` - Data contributions
   - `"example"` - Examples
   - `"tool"` - Tools
   - `"plugin"` - Plugin/utility libraries
   - `"platform"` - Packaging/porting
   - `"security"` - Security
   - `"business"` - Business development
   - `"financial"` - Financial support
   - `"fundingFinding"` - Funding finding
   - `"eventOrganizing"` - Event organizing
   - `"projectManagement"` - Project management
   - `"promotion"` - Promotion
   - `"mentoring"` - Mentoring
   - `"userTesting"` - User testing
   - `"a11y"` - Accessibility

6. **Example file**
   If your GitHub username is `johndoe`, create `contributors/johndoe.json`:

   ```json
   {
     "name": "John Doe",
     "github": "johndoe", 
     "profile": "https://johndoe.dev",
     "contributions": ["code", "doc", "tutorial"]
   }
   ```

7. **Test locally (recommended)**
   It's recommended to preview how your contribution will look before submitting:
   
   ```bash
   # Preview how your profile will appear (safe, no file changes)
   npm run contributors:preview your-github-username
   ```
   
   This will:
   - Validate your JSON file
   - Show you how your profile will appear
   - Display next steps for creating your PR
   
   **For advanced testing:**
   ```bash
   # Validate all JSON files
   npm run contributors:validate
   
   # Full test with temporary README generation
   npm run contributors:test your-github-username
   ```

8. **Commit and push your changes**
   After creating your contributor file:
   ```bash
   git add contributors/your-github-username.json
   git commit -m "Add [Your Name] as a contributor"
   git push origin your-branch-name
   ```

9. **Submit your pull request**
   - Your PR should only add ONE file: your `contributors/your-username.json` file
   - Title your PR: "Add [Your Name] as a contributor"
   - No need to edit any other files!

10. **Automatic processing**
   Once your PR is merged, a GitHub Action will automatically:
   - Add you to the all-contributors system
   - Update the main README.md with your information
   - You'll appear in the contributors table!

11. **Verify it worked**
   Want to confirm your contribution was successful? See: [testing-your-contribution.md](testing-your-contribution.md)


## Need Help?

- Check the [Troubleshooting Guide](../TROUBLESHOOTING.md)
- Look at existing contributor files for examples
- Ask questions in [GitHub Discussions](../../discussions)
- Review the [Contributing Guidelines](../../CONTRIBUTING.md)
