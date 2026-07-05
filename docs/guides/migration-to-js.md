# Migration from Python to JavaScript Scripts

All contributor scripts have been migrated from Python to JavaScript for better consistency and ease of use.

## What Changed?

### Before (Python-based)
- Required Python 3 installation
- Scripts used `.py` extensions
- Mixed technology stack (Node.js + Python)

### After (JavaScript-based)
- Only requires Node.js (which you already have for npm)
- Scripts use `.js` extensions
- Consistent JavaScript/Node.js stack

## Updated Commands

The npm scripts remain the same:
- `npm run contributors:preview username` - Preview your contribution
- `npm run contributors:validate` - Validate all contributor files
- `npm run contributors:test username` - Full test with README generation

## Benefits

1. **Single dependency**: Only Node.js needed (no Python installation required)
2. **Better Windows support**: Node.js works consistently across all platforms
3. **Faster execution**: No need to spawn Python processes
4. **Easier maintenance**: All scripts in the same language

## For Script Developers

If you need to modify the scripts:
- All scripts are in `scripts/` directory
- Use Node.js built-in modules (fs, path, child_process)
- Follow the existing patterns for consistency
- Make scripts executable: `chmod +x scripts/*.js`

## Backward Compatibility

The old Python scripts are still in the repository but are no longer used by the npm commands. They may be removed in a future cleanup.