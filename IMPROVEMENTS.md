# Website Improvements Summary

This document summarizes the automated improvements made to the codebase on October 31, 2025.

## Changes Made

### 1. Repository Organization
- ✅ **Added `_pages/` directory to git tracking** - The vCard generator page was previously untracked
- ✅ **Added `robots.txt`** - Helps search engines crawl the site properly with sitemap reference
- ✅ **Removed `.travis.yml`** - Obsolete CI configuration (now using GitHub Actions)
- ✅ **Created `CLAUDE.md`** - Documentation for future AI assistance with this codebase

### 2. Docker & Development Environment
- ✅ **Updated `Dockerfile.dev`**:
  - Ruby 2.7 → Ruby 3.3 (2.7 reached EOL in March 2023)
  - Removed frozen bundle config (more flexible)
  - Removed outdated bundler version pin (1.17.2)
  - Added `--livereload` flag for better development experience
  - Simplified COPY commands

### 3. Dependencies
- ✅ **Updated all npm dev dependencies to latest versions**:
  - `@commitlint/cli: 8.3.5 → 19.8.2`
  - `@commitlint/config-conventional: 8.3.4 → 19.8.0`
  - `cross-env: 7.0.0 → 7.0.3`
  - `eslint: 6.8.0 → 9.15.0`
  - `husky: 4.2.1 → 9.1.7`
  - `stylelint: 13.0.0 → 16.11.0`
  - `stylelint-config-recommended-scss: 4.2.0 → 15.0.0`
  - `stylelint-config-standard: 19.0.0 → 36.0.1`
  - `stylelint-order: 4.0.0 → 6.0.4`
  - `stylelint-scss: 3.14.2 → 6.9.0`
- ✅ **No security vulnerabilities** reported after update

### 4. CI/CD Pipeline
- ✅ **Enhanced GitHub Actions workflow** (`.github/workflows/jekyll.yml`):
  - Added separate `lint` job that runs before build
  - Lints JavaScript with ESLint
  - Lints SCSS with Stylelint
  - Build job now depends on successful linting
  - Uses Node.js 20 with npm caching for speed

### 5. Content Cleanup
- ✅ **Cleaned frontmatter in 93 blog posts**:
  - Removed obsolete `id` fields
  - Removed `guid` fields (WordPress legacy)
  - Removed `snap_*` fields (old social sharing plugin)
  - Removed `spacious_page_layout` (theme-specific)
  - Removed all `rank_math_*` fields (SEO plugin metadata)
  - Kept essential fields: title, date, author, permalink, redirect_from, categories, tags

### 6. File Permissions
- ✅ **Made `run_server.sh` executable** (mode 755)

### 7. Security & SEO Improvements
- ✅ **Converted HTTP to HTTPS URLs**:
  - Converted 90+ HTTP URLs to HTTPS across 39 markdown files
  - Improved security and SEO by using secure links
  - Updated links to: Microsoft Docs, Stack Overflow, Wikipedia, and other external resources
  - All blog posts and pages now use HTTPS for external references

## Files Modified

### Configuration Files
- `.github/workflows/jekyll.yml` - Added linting steps
- `Dockerfile.dev` - Updated Ruby version and improved config
- `package.json` - Updated all dev dependencies
- `run_server.sh` - Made executable

### New Files
- `robots.txt` - Search engine crawler configuration
- `CLAUDE.md` - AI assistant documentation
- `IMPROVEMENTS.md` - This file

### Deleted Files
- `.travis.yml` - Obsolete CI configuration

### Content Files
- 93 blog posts in `_posts/` - Cleaned frontmatter
- 39 markdown files - Converted HTTP to HTTPS URLs
- `_pages/vcard-generator.md` - Now tracked in git

## What Still Needs Manual Review

### HIGH PRIORITY
1. ✅ ~~**HTTP → HTTPS links**~~ - **COMPLETED!** All HTTP URLs converted to HTTPS
2. **Enable Google Analytics**: Analytics configured but disabled in `_config.yml`
3. **Review draft posts**: 8 drafts in `_drafts/` directory from 2022-2023

### MEDIUM PRIORITY
4. **Husky v9 migration**: Husky configuration needs updating from v4 to v9 format
5. **Self-host QRCode.js**: Currently loaded from CDN in vCard generator
6. **Add Open Graph meta tags**: Improve social media sharing

### LOW PRIORITY
7. **Consider archiving old content**: Many posts from 2010-2013 may need modernization
8. **Clean up theme files**: Separate theme development files from personal site content
9. **Performance optimizations**: Lazy loading, compression, etc.

## Testing Recommendations

Before deploying:
1. ✅ Verify linting passes: `npm run eslint && npm run stylelint`
2. ✅ Test local build: `npm run serve` or `./run_server.sh`
3. ⚠️ Check GitHub Actions passes after push
4. ⚠️ Verify site builds and deploys correctly
5. ⚠️ Check robots.txt is accessible at https://samjenkins.com/robots.txt
6. ⚠️ Verify sitemap works: https://samjenkins.com/sitemap.xml

## Docker Build

To rebuild the Docker image with new Ruby version:
```bash
docker-compose -f ./docker/docker-compose.build-image.yml build
```

## Notes

- All changes preserve backwards compatibility
- Redirects are maintained via `redirect_from` in frontmatter
- No content was deleted, only metadata cleanup
- Build process remains unchanged (Jekyll + GitHub Pages)
