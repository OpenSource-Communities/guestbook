#!/bin/bash

# Local testing script for contributors
# This allows contributors to test their JSON file and see how it will appear in the README

echo "🧪 Testing your contributor file locally..."

# Check if contributor file is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/test-locally.sh your-username"
    echo "Example: ./scripts/test-locally.sh johndoe"
    exit 1
fi

USERNAME=$1
CONTRIBUTOR_FILE="contributors/${USERNAME}.json"

# Check if the contributor file exists
if [ ! -f "$CONTRIBUTOR_FILE" ]; then
    echo "❌ File not found: $CONTRIBUTOR_FILE"
    echo "💡 Make sure you've created your contributor file first!"
    exit 1
fi

echo "📁 Found contributor file: $CONTRIBUTOR_FILE"

# Validate the JSON file
echo "🔍 Validating JSON format..."
if ! python3 -c "import json; json.load(open('$CONTRIBUTOR_FILE'))" 2>/dev/null; then
    echo "❌ Invalid JSON format in $CONTRIBUTOR_FILE"
    echo "💡 Check your JSON syntax - use quotes around all strings!"
    exit 1
fi

echo "✅ JSON format is valid"

# Validate required fields
echo "🔍 Checking required fields..."
python3 << EOF
import json
import sys

with open('$CONTRIBUTOR_FILE', 'r') as f:
    data = json.load(f)

errors = []
required_fields = ['name', 'github', 'contributions']

for field in required_fields:
    if field not in data:
        errors.append(f"Missing field: {field}")
    elif not data[field]:
        errors.append(f"Empty field: {field}")

if data.get('github') != '$USERNAME':
    errors.append(f"GitHub username '{data.get('github')}' doesn't match filename '$USERNAME.json'")

if not isinstance(data.get('contributions', []), list):
    errors.append("contributions must be an array")
elif len(data.get('contributions', [])) == 0:
    errors.append("contributions array is empty")

if errors:
    print("❌ Validation errors:")
    for error in errors:
        print(f"  - {error}")
    sys.exit(1)
else:
    print("✅ All required fields present and valid")
    print(f"📝 Name: {data['name']}")
    print(f"👤 GitHub: @{data['github']}")
    if 'profile' in data and data['profile']:
        print(f"🔗 Profile: {data['profile']}")
    print(f"🎯 Contributions: {', '.join(data['contributions'])}")
EOF

if [ $? -ne 0 ]; then
    exit 1
fi

# Create a backup of current README
echo "💾 Creating backup of current README..."
cp README.md README.md.backup

# Create a test all-contributors config
echo "⚙️  Setting up test environment..."
cp .all-contributorsrc .all-contributorsrc.backup

# Add just this contributor to test
echo "🔄 Testing contributor addition..."
python3 << EOF
import json

# Read contributor data
with open('$CONTRIBUTOR_FILE', 'r') as f:
    contributor_data = json.load(f)

# Create minimal all-contributors config for testing
config = {
    "projectName": "guestbook",
    "projectOwner": "OpenSource-Community", 
    "repoType": "github",
    "repoHost": "https://github.com",
    "files": ["README.md"],
    "imageSize": 100,
    "commit": false,
    "commitConvention": "angular",
    "contributors": [
        {
            "login": contributor_data["github"],
            "name": contributor_data["name"],
            "avatar_url": f"https://github.com/{contributor_data['github']}.png",
            "profile": contributor_data.get("profile", f"https://github.com/{contributor_data['github']}"),
            "contributions": contributor_data["contributions"]
        }
    ]
}

# Write test config
with open('.all-contributorsrc.test', 'w') as f:
    json.dump(config, f, indent=2)

print("✅ Test configuration created")
EOF

# Copy test config over main config temporarily
cp .all-contributorsrc.test .all-contributorsrc

# Generate test README section
echo "🎨 Generating test preview..."
npx all-contributors generate

# Show the contributor section
echo ""
echo "🎉 SUCCESS! Here's how your contribution will appear:"
echo "=================================================="
echo ""

# Extract just the contributor table for preview
python3 << EOF
import re

with open('README.md', 'r') as f:
    content = f.read()

# Find the contributors section
start_marker = "<!-- ALL-CONTRIBUTORS-LIST:START"
end_marker = "<!-- ALL-CONTRIBUTORS-LIST:END -->"

start = content.find(start_marker)
end = content.find(end_marker)

if start != -1 and end != -1:
    contributors_section = content[start:end + len(end_marker)]
    print(contributors_section)
else:
    print("Could not extract contributors section")
EOF

echo ""
echo "=================================================="
echo ""

# Restore original files
echo "🔄 Restoring original files..."
mv README.md.backup README.md
mv .all-contributorsrc.backup .all-contributorsrc
rm -f .all-contributorsrc.test

echo "✅ Test complete! Your contributor file looks good."
echo ""
echo "🚀 Next steps:"
echo "  1. git add $CONTRIBUTOR_FILE"
echo "  2. git commit -m 'Add $USERNAME as a contributor'"
echo "  3. git push origin your-branch-name"
echo "  4. Create your pull request on GitHub!"
echo ""
echo "💡 Remember: The actual README will be updated automatically after your PR is merged!"