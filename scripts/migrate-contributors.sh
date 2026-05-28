#!/bin/bash

# Script to migrate existing contributors to the new JSON file format
# This reads the current .all-contributorsrc and creates individual JSON files

echo "Migrating existing contributors to individual JSON files..."

# Create contributors directory if it doesn't exist
mkdir -p contributors

# Check if .all-contributorsrc exists
if [ ! -f ".all-contributorsrc" ]; then
  echo "No existing .all-contributorsrc file found"
  exit 1
fi

# Check if Python is available for JSON parsing
if ! command -v python3 &> /dev/null; then
    echo "Python3 is required for this script"
    exit 1
fi

# Python script to parse contributors and create JSON files
python3 << 'EOF'
import json
import os

# Read the .all-contributorsrc file
try:
    with open('.all-contributorsrc', 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print("No .all-contributorsrc file found")
    exit(1)
except json.JSONDecodeError:
    print("Error: Invalid JSON in .all-contributorsrc")
    exit(1)

# Create contributors directory
os.makedirs('contributors', exist_ok=True)

# Process each contributor
contributors = data.get('contributors', [])
if not contributors:
    print("No contributors found in .all-contributorsrc")
    exit(0)

for contributor in contributors:
    login = contributor.get('login')
    name = contributor.get('name')
    profile = contributor.get('profile')
    contributions = contributor.get('contributions', [])
    
    if not login or not name:
        print(f"Skipping contributor with missing login or name: {contributor}")
        continue
    
    # Create the contributor data
    contributor_data = {
        "name": name,
        "github": login,
        "contributions": contributions
    }
    
    # Add profile if it exists
    if profile:
        contributor_data["profile"] = profile
    
    # Write to JSON file
    filename = f"contributors/{login}.json"
    try:
        with open(filename, 'w') as f:
            json.dump(contributor_data, f, indent=2, ensure_ascii=False)
        print(f"Created {filename}")
    except Exception as e:
        print(f"Error creating {filename}: {e}")

print(f"Migration complete! Created {len(contributors)} contributor files.")
EOF

echo ""
echo "Migration summary:"
echo "- Individual JSON files created in contributors/ directory"
echo "- Original .all-contributorsrc preserved as backup"
echo "- Run 'git add contributors/' to stage the new files"
echo "- The GitHub Action will automatically update the README after merge"