#!/usr/bin/env python3
"""
Validation script for contributor JSON files
This script validates that contributor JSON files follow the expected format
"""

import json
import os
import sys
import re
from pathlib import Path

# Valid contribution types based on all-contributors specification
VALID_CONTRIBUTIONS = {
    "a11y", "audio", "blog", "bug", "business", "code", "content", "data",
    "design", "doc", "eventOrganizing", "example", "financial", "fundingFinding",
    "ideas", "infra", "maintenance", "mentoring", "platform", "plugin",
    "projectManagement", "promotion", "question", "research", "review",
    "security", "talk", "test", "tool", "translation", "tutorial", "userTesting",
    "video"
}

def validate_json_file(filepath):
    """Validate a single contributor JSON file"""
    errors = []
    warnings = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        return [f"Invalid JSON: {e}"], []
    except Exception as e:
        return [f"Error reading file: {e}"], []
    
    # Check required fields
    required_fields = ['name', 'github', 'contributions']
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")
        elif not data[field]:
            errors.append(f"Empty required field: {field}")
    
    # Validate name
    if 'name' in data:
        if not isinstance(data['name'], str):
            errors.append("Field 'name' must be a string")
        elif len(data['name'].strip()) == 0:
            errors.append("Field 'name' cannot be empty")
    
    # Validate github username
    if 'github' in data:
        github = data['github']
        if not isinstance(github, str):
            errors.append("Field 'github' must be a string")
        elif not re.match(r'^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$', github):
            errors.append(f"Invalid GitHub username format: {github}")
        else:
            # Check if filename matches GitHub username
            expected_filename = f"{github}.json"
            actual_filename = os.path.basename(filepath)
            if actual_filename != expected_filename:
                warnings.append(f"Filename '{actual_filename}' doesn't match GitHub username '{github}' (should be '{expected_filename}')")
    
    # Validate contributions
    if 'contributions' in data:
        contributions = data['contributions']
        if not isinstance(contributions, list):
            errors.append("Field 'contributions' must be an array")
        elif len(contributions) == 0:
            warnings.append("Field 'contributions' is empty")
        else:
            for contrib in contributions:
                if not isinstance(contrib, str):
                    errors.append(f"Contribution type must be a string: {contrib}")
                elif contrib not in VALID_CONTRIBUTIONS:
                    warnings.append(f"Unknown contribution type: {contrib}")
    
    # Validate optional profile field
    if 'profile' in data:
        profile = data['profile']
        if not isinstance(profile, str):
            errors.append("Field 'profile' must be a string")
        elif profile and not re.match(r'^https?://', profile):
            warnings.append(f"Profile URL should start with http:// or https://: {profile}")
    
    # Check for unexpected fields
    expected_fields = {'name', 'github', 'contributions', 'profile'}
    extra_fields = set(data.keys()) - expected_fields
    if extra_fields:
        warnings.append(f"Unexpected fields: {', '.join(extra_fields)}")
    
    return errors, warnings

def main():
    """Main validation function"""
    contributors_dir = Path("contributors")
    
    if not contributors_dir.exists():
        print("❌ Contributors directory not found")
        sys.exit(1)
    
    json_files = list(contributors_dir.glob("*.json"))
    if not json_files:
        print("❌ No JSON files found in contributors directory")
        sys.exit(1)
    
    total_errors = 0
    total_warnings = 0
    
    print(f"🔍 Validating {len(json_files)} contributor files...\n")
    
    for filepath in sorted(json_files):
        errors, warnings = validate_json_file(filepath)
        
        if errors or warnings:
            print(f"📁 {filepath.name}:")
            
            for error in errors:
                print(f"  ❌ {error}")
                total_errors += 1
            
            for warning in warnings:
                print(f"  ⚠️  {warning}")
                total_warnings += 1
            
            print()
        else:
            print(f"✅ {filepath.name}")
    
    print(f"\n📊 Validation Summary:")
    print(f"  Files checked: {len(json_files)}")
    print(f"  Errors: {total_errors}")
    print(f"  Warnings: {total_warnings}")
    
    if total_errors > 0:
        print("\n❌ Validation failed! Please fix the errors above.")
        sys.exit(1)
    elif total_warnings > 0:
        print("\n⚠️  Validation passed with warnings. Consider fixing the warnings above.")
        sys.exit(0)
    else:
        print("\n✅ All files are valid!")
        sys.exit(0)

if __name__ == "__main__":
    main()