#!/bin/bash

echo "🔍 Verifying migration completion..."

# Count contributor files
json_files=$(find contributors/ -name "*.json" ! -name "example-contributor.json" | wc -l)
echo "📁 JSON files: $json_files"

# Count contributors in README
readme_contributors=$(grep -c "align=\"center\"" README.md)
readme_contributors=$((readme_contributors - 1)) # Subtract header row
echo "📄 README contributors: $readme_contributors"

# Check badge count
badge_count=$(grep -o "all_contributors-[0-9]*" README.md | head -1 | cut -d'-' -f2)
echo "🏷️  Badge count: $badge_count"

# Verify README is complete
if grep -q "ALL-CONTRIBUTORS-LIST:END" README.md; then
    echo "✅ README properly closed"
else
    echo "❌ README missing closing tags"
fi

# Check for validation errors
echo "🔍 Running validation..."
python3 scripts/validate-contributor.py > /tmp/validation.log 2>&1
if [ $? -eq 0 ]; then
    echo "✅ All contributor files valid"
else
    echo "❌ Validation errors found:"
    cat /tmp/validation.log
fi

# Summary
echo ""
echo "📊 Migration Summary:"
echo "  Expected: 310 contributors"
echo "  JSON files: $json_files"
echo "  README entries: $readme_contributors" 
echo "  Badge count: $badge_count"

if [ "$json_files" -eq 310 ] && [ "$readme_contributors" -eq 310 ] && [ "$badge_count" -eq 310 ]; then
    echo "✅ Migration successful! All counts match."
else
    echo "⚠️  Count mismatch detected. Review needed."
fi

echo ""
echo "🚀 Next steps:"
echo "1. Commit and push all changes"
echo "2. Test the GitHub Action with a sample contributor"
echo "3. Update course materials to reference new process"
echo "4. Pin announcement issue for contributors"