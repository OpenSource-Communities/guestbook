# Testing the New Contributor System

This guide helps you test and verify that the new conflict-free contributor system is working correctly.

## For New Contributors: How to Test Your Contribution

### 0. Test Locally First (Recommended!)

Before submitting your PR, you can test your contributor file locally:

```bash
# Quick preview - shows exactly how your profile will look
npm run contributors:preview your-github-username

# Full validation - checks for any errors
npm run contributors:validate
```

**Example:**
```bash
# If your GitHub username is "johndoe"
npm run contributors:preview johndoe
```

This will show you:
- ✅ Validation results
- 🎨 Preview of your profile  
- 📱 Exact HTML that will appear in README
- 🏷️ Your contribution icons

### 1. After Creating Your PR

When you submit your PR with your `contributors/username.json` file, you can test several things:

#### ✅ **Immediate Validation (Before Merge)**
Your PR will automatically trigger validation checks. Look for:

1. **Green checkmarks** in your PR - this means validation passed
2. **Automated comment** welcoming you to the project
3. **No merge conflicts** reported (this should never happen with the new system!)

#### ✅ **After Your PR is Merged**
Once a maintainer merges your PR, watch for these automatic actions:

1. **Within 1-2 minutes**: A GitHub Action will run
2. **Within 5 minutes**: The README should update with your profile
3. **Automated welcome comment** on your merged PR

### 2. How to Verify You're in the README

#### Option A: Check the Live README
1. Go to the [main repository page](../../)
2. Scroll down to the "Contributors" section
3. Look for your profile picture and name
4. Your profile should appear in the contributor table

#### Option B: Check the Badge Count
1. Look at the contributors badge: ![Contributors](https://img.shields.io/badge/all_contributors-310-orange.svg)
2. The number should have increased by 1 after your contribution
3. Click the badge to jump to the contributors section

#### Option C: Search for Your Username
1. Press `Ctrl+F` (or `Cmd+F` on Mac) on the README page
2. Search for your GitHub username
3. You should find your profile in the contributors table

### 3. What Your Profile Should Look Like

Your contributor entry will appear like this:

```html
<td align="center" valign="top" width="14.28%">
  <a href="https://your-profile-url">
    <img src="https://github.com/yourusername.png?s=100" width="100px;" alt="Your Name"/>
    <br />
    <sub><b>Your Name</b></sub>
  </a>
  <br />
  <a href="#code-yourusername" title="Code">💻</a>
  <a href="#doc-yourusername" title="Documentation">📖</a>
  <!-- More contribution icons based on your JSON file -->
</td>
```

## For Maintainers: How to Test the System

### 1. Test with a Sample Contributor

Create a test contributor to verify the automation:

```bash
# 1. Create a test contributor file
cat > contributors/test-user-$(date +%s).json << 'EOF'
{
  "name": "Test User",
  "github": "test-user-123",
  "profile": "https://example.com",
  "contributions": ["code", "doc"]
}
EOF

# 2. Commit and push
git add contributors/test-user-*.json
git commit -m "test: add test contributor to verify automation"
git push origin main

# 3. Watch the GitHub Actions tab for the workflow to run

# 4. Check that README was updated automatically

# 5. Clean up the test file
git rm contributors/test-user-*.json
git commit -m "test: remove test contributor"
git push origin main
```

### 2. Monitor the GitHub Actions

1. **Go to the Actions tab** in your repository
2. **Look for "Update Contributors" workflow** runs
3. **Check the logs** for any errors or issues
4. **Verify the README commit** was created automatically

### 3. Test Validation

```bash
# Test with invalid JSON
echo '{ invalid json }' > contributors/invalid-test.json
git add contributors/invalid-test.json
git commit -m "test: invalid contributor file"
git push

# This should fail validation - check the Actions tab
# Then clean up:
git rm contributors/invalid-test.json
git commit -m "test: remove invalid file"
git push
```

## Troubleshooting Common Issues

### ❌ "My profile isn't showing up"

**Possible causes:**
1. **GitHub Action still running** - check the Actions tab, wait 5-10 minutes
2. **Validation failed** - check your JSON file format
3. **Wrong filename** - must be `your-exact-github-username.json`
4. **Missing required fields** - ensure you have `name`, `github`, and `contributions`

**How to fix:**
```bash
# Validate your JSON file
python3 scripts/validate-contributor.py

# Check if your username matches the filename
# File: contributors/johndoe.json
# Content: "github": "johndoe"  ← must match!
```

### ❌ "GitHub Action failed"

**Check these:**
1. **Actions tab** for error details
2. **JSON syntax** - use a JSON validator online
3. **Required fields** - name, github, contributions must be present
4. **Username format** - only letters, numbers, and hyphens

### ❌ "Badge count didn't increase"

This usually means:
1. **Action is still running** - wait a few more minutes
2. **Validation failed** - check the Actions logs
3. **Duplicate contributor** - username already exists

## Testing Checklist

### For Contributors ✅
- [ ] My PR has green checkmarks (validation passed)
- [ ] I received a welcome comment on my PR
- [ ] My PR was merged without conflicts
- [ ] My profile appears in the README within 10 minutes
- [ ] The contributors badge count increased by 1
- [ ] I can find my username by searching the README

### For Maintainers ✅
- [ ] GitHub Actions run automatically on contributor file changes
- [ ] Validation catches invalid JSON files
- [ ] README updates automatically after merge
- [ ] Welcome comments are posted on successful contributions
- [ ] Multiple simultaneous PRs don't cause conflicts
- [ ] Old contributor data is preserved correctly

## Performance Testing

### Stress Test: Multiple Simultaneous Contributors

To test the conflict-free nature:

1. **Create 5+ test contributor files** simultaneously
2. **Submit them in separate PRs** at the same time
3. **Merge them quickly** one after another
4. **Verify no conflicts occur** and all are processed correctly

```bash
# Example: Create multiple test files
for i in {1..5}; do
  cat > contributors/stress-test-$i.json << EOF
{
  "name": "Stress Test User $i",
  "github": "stress-test-$i",
  "contributions": ["code"]
}
EOF
done
```

## Expected Behavior

### ✅ **What Should Happen**
1. **PR validation** runs automatically
2. **Welcome comment** appears on valid PRs
3. **Merge happens** without conflicts
4. **GitHub Action runs** within 2 minutes of merge
5. **README updates** with new contributor
6. **Success comment** posted on merged PR
7. **Badge count increases** by 1

### ⏱️ **Timing Expectations**
- **Validation**: Instant (on PR creation/update)
- **Merge**: Manual (when maintainer approves)
- **Action trigger**: 30 seconds after merge
- **README update**: 2-5 minutes after merge
- **Badge update**: Immediate with README update

## Getting Help

If testing reveals issues:

1. **Check GitHub Actions logs** first
2. **Validate your JSON** using the validation script
3. **Ask in Discussions** with specific error details
4. **Create an issue** if you find a bug in the system

## Success Metrics

The system is working correctly when:
- ✅ **Zero merge conflicts** on contributor PRs
- ✅ **100% automation** - no manual README editing needed
- ✅ **Fast processing** - updates within 5 minutes
- ✅ **Perfect validation** - catches errors before merge
- ✅ **Beginner friendly** - simple JSON file creation

---

**Ready to test?** Follow the [docs/guides/contributor-guide.md](docs/guides/contributor-guide.md) instructions to add yourself and see the magic happen! ✨
