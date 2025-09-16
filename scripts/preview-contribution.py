#!/usr/bin/env python3
"""
Simple preview script for contributor JSON files
Shows how the contributor will appear without modifying any files
"""

import json
import sys
import os
from pathlib import Path

def preview_contributor(username):
    """Preview how a contributor will appear in the README"""
    
    contributor_file = Path(f"contributors/{username}.json")
    
    if not contributor_file.exists():
        print(f"❌ File not found: {contributor_file}")
        print(f"💡 Create {contributor_file} first!")
        return False
    
    try:
        with open(contributor_file, 'r') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in {contributor_file}: {e}")
        return False
    except Exception as e:
        print(f"❌ Error reading {contributor_file}: {e}")
        return False
    
    # Validate required fields
    required = ['name', 'github', 'contributions']
    missing = [field for field in required if field not in data or not data[field]]
    
    if missing:
        print(f"❌ Missing required fields: {missing}")
        return False
    
    # Check username match
    if data['github'] != username:
        print(f"❌ Username mismatch:")
        print(f"   Filename: {username}.json")
        print(f"   JSON github field: {data['github']}")
        print(f"   These must match!")
        return False
    
    print("✅ Contributor file validation passed!")
    print()
    
    # Show preview
    name = data['name']
    github = data['github']
    profile = data.get('profile', f'https://github.com/{github}')
    contributions = data['contributions']
    
    print("🎨 Preview of your contributor profile:")
    print("=" * 50)
    print(f"👤 Name: {name}")
    print(f"🔗 Profile: {profile}")
    print(f"📷 Avatar: https://github.com/{github}.png")
    print(f"🎯 Contributions: {', '.join(contributions)}")
    print()
    
    # Show contribution icons
    contribution_icons = {
        'a11y': '♿️', 'audio': '🔊', 'blog': '📝', 'bug': '🐛',
        'business': '💼', 'code': '💻', 'content': '🖋', 'data': '🔣',
        'design': '🎨', 'doc': '📖', 'eventOrganizing': '📋', 'example': '💡',
        'financial': '💵', 'fundingFinding': '🔍', 'ideas': '🤔', 'infra': '🚇',
        'maintenance': '🚧', 'mentoring': '🧑‍🏫', 'platform': '📦', 'plugin': '🔌',
        'projectManagement': '📆', 'promotion': '📣', 'question': '💬', 'research': '🔬',
        'review': '👀', 'security': '🛡️', 'talk': '📢', 'test': '⚠️',
        'tool': '🔧', 'translation': '🌍', 'tutorial': '✅', 'userTesting': '📓',
        'video': '📹'
    }
    
    print("🏷️  Your contribution icons:")
    for contrib in contributions:
        icon = contribution_icons.get(contrib, '❓')
        print(f"   {icon} {contrib}")
    
    print()
    print("📱 How it will look in the README:")
    print("=" * 50)
    
    # Generate HTML preview (simplified)
    icons_html = ' '.join([f'<a href="#{contrib}-{github}" title="{contrib.title()}">{contribution_icons.get(contrib, "❓")}</a>' 
                          for contrib in contributions])
    
    html_preview = f'''
<td align="center" valign="top" width="14.28%">
  <a href="{profile}">
    <img src="https://github.com/{github}.png?s=100" width="100px;" alt="{name}"/>
    <br />
    <sub><b>{name}</b></sub>
  </a>
  <br />
  {icons_html}
</td>'''
    
    print(html_preview)
    print()
    print("=" * 50)
    print("✅ Your contribution looks great!")
    print()
    print("🚀 Next steps:")
    print(f"  1. git add {contributor_file}")
    print(f"  2. git commit -m 'Add {name} as a contributor'")
    print(f"  3. git push origin your-branch-name")
    print(f"  4. Create your pull request on GitHub!")
    print()
    print("💡 After your PR is merged, this exact profile will appear in the README automatically!")
    
    return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/preview-contribution.py your-username")
        print("Example: python3 scripts/preview-contribution.py johndoe")
        sys.exit(1)
    
    username = sys.argv[1]
    success = preview_contributor(username)
    
    if not success:
        print()
        print("🔧 Need help?")
        print("  - Check the template in docs/guides/contributor-guide.md")
        print("  - Validate JSON syntax at https://jsonlint.com/")
        print("  - Ask questions in GitHub Discussions")
        sys.exit(1)

if __name__ == "__main__":
    main()