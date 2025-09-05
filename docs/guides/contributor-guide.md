# Contributors Directory

Welcome to the guestbook contributors directory! 🎉

## How to Add Yourself as a Contributor

Instead of editing the main README.md file (which causes merge conflicts), you'll add yourself by creating your own contributor file.

### Step-by-Step Instructions

1. **Create your contributor file**
   - In this `contributors/` directory, create a new file named `your-github-username.json`
   - Replace `your-github-username` with your actual GitHub username (lowercase)

2. **Add your information**
   Copy this template and fill in your details:

   ```json
   {
     "name": "Your Full Name",
     "github": "your-github-username",
     "profile": "https://your-website.com",
     "contributions": ["code", "doc", "ideas"]
   }
   ```

3. **Available contribution types**
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

4. **Example file**
   If your GitHub username is `johndoe`, create `contributors/johndoe.json`:

   ```json
   {
     "name": "John Doe",
     "github": "johndoe", 
     "profile": "https://johndoe.dev",
     "contributions": ["code", "doc", "tutorial"]
   }
   ```

5. **Test locally (optional)**
   Want to see how your contribution will look before submitting? You have two options:
   
   **Option A: Quick Preview (Recommended)**
   ```bash
   # Preview how your profile will appear (safe, no file changes)
   npm run contributors:preview your-github-username
   ```
   
   **Option B: Full Test (Advanced)**
   ```bash
   # Validate your JSON file
   npm run contributors:validate
   
   # Full test with temporary README generation
   npm run contributors:test your-github-username
   ```
   
   Both will show you exactly how your profile will appear in the README!

6. **Submit your pull request**
   - Your PR should only add ONE file: your `contributors/your-username.json` file
   - Title your PR: "Add [Your Name] as a contributor"
   - No need to edit any other files!

7. **Automatic processing**
   Once your PR is merged, a GitHub Action will automatically:
   - Add you to the all-contributors system
   - Update the main README.md with your information
   - You'll appear in the contributors table!

8. **Verify it worked**
   Want to confirm your contribution was successful? See: [testing-your-contribution.md](testing-your-contribution.md)


## Need Help?

- Check out existing contributor files for examples
- Ask questions in [GitHub Discussions](../../discussions)
- Review the [Contributing Guidelines](../../CONTRIBUTING.md)
