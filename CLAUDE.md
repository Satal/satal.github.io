# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Jekyll using the TeXt Theme. The site is hosted on GitHub Pages and deployed automatically via GitHub Actions. The blog contains technical articles about software development, primarily focused on .NET, web development, and IT topics.

## Build and Development Commands

### Local Development
```bash
# Run local development server (via Docker)
./run_server.sh
# Or: docker-compose -f ./docker/docker-compose.default.yml up

# Run using bundle directly
npm run serve
# Or: bundle exec jekyll serve -H 0.0.0.0

# Build for production
npm run build
# Or: JEKYLL_ENV=production bundle exec jekyll build
```

### Testing and Linting
```bash
# Lint JavaScript files
npm run eslint
npm run eslint-fix

# Lint SCSS files
npm run stylelint
npm run stylelint-fix
```

## Content Structure

### Posts
- Location: `_posts/`
- Naming: `YYYY-MM-DD-title.md`
- Front matter: Posts use the `article` layout with default settings defined in `_config.yml`
- Default features enabled: TOC, license, GitHub edit link, page view tracking

### Pages
- Location: `_pages/`
- Custom pages for specialized content (e.g., vcard-generator.md)

### Configuration
- Main config: `_config.yml`
- Site uses the "dark" skin by default
- Posts are paginated (8 per page)
- GitHub repository integration enabled for "Edit on GitHub" links

## Architecture

### Layouts
- `article`: Primary layout for blog posts with TOC, author info, and comments support
- `page`: Generic page layout
- `home`: Homepage with article list
- `archive`: Archive page listing all posts
- `landing`: Landing page layout

### Data Files (`_data/`)
- `authors.yml`: Author profiles
- `navigation.yml`: Site navigation structure
- `locale.yml`: Internationalization strings
- `licenses.yml`: License configurations
- `variables.yml`: Theme variables

### Theme Components
- `_includes/`: Reusable HTML partials (header, footer, comments, analytics, extensions)
- `_sass/`: SCSS stylesheets organized by component, layout, and skin
- Jekyll plugins: jekyll-feed, jekyll-paginate, jekyll-sitemap, jemoji, jekyll-redirect-from

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch via `.github/workflows/jekyll.yml`. The workflow:
1. Checks out code
2. Sets up Ruby 3.1 with bundler caching
3. Builds site with Jekyll (production mode)
4. Deploys to GitHub Pages

## Key Files

- `_config.yml`: Main Jekyll configuration including site metadata, theme settings, and plugin configuration
- `Gemfile`: Ruby dependencies (uses gemspec for theme dependencies)
- `package.json`: Node.js scripts for development workflow
- `run_server.sh`: Quick local development server startup script
