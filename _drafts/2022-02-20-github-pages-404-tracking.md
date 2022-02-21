---
title: Detect 404s on Github Pages
date: '2022-02-20T11:30:11+00:00'

permalink: /github-pages-404-detection/
author: Satal

tags:
  - Github Pages
  - Google Analytics
  - Markdown
  - Jekyll
---

As part of my work to move my life to Markdown, I've moved my site SamJenkins.com to a static site generator called [Jekyll](https://jekyllrb.com/) and deployed it to Github.

## Why run your site on Github?

I have previously been a strong advocate of running sites on WordPress, as long as they were properly maintained and updated.

## Setting Up Google Tag Manager

### Adding Page Title As A Variable

Unfortunately, Google Tag Manager doesn't collect the page title by default. We are therefore going to have to set it up ourselves.

Go to Variables -> New User-Defined Variables
