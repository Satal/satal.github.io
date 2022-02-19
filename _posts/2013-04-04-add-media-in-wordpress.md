---
id: 269
title: 'Problems with Add Media in WordPress'
date: '2013-04-04T19:21:25+00:00'
author: Satal

guid: 'http://satalketo.com/?p=269'
permalink: /add-media-in-wordpress/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - ''
rank_math_description:
    - 'Fix the problem when WordPress plugins conflict stopping the admin from being able to use the ''Add Media'' button or switch between ''Visual'' and ''Text'' mode'
rank_math_focus_keyword:
    - 'Add Media'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '129'
image: /wp-content/uploads/2013/04/ss4-postbox-1.png
categories:
    - All
    - Computer
    - Uncategorized
tags:
    - WordPress
---

[WordPress ](http://www.wordpress.org "WordPress > Blog Tool, Publishing Platform, and CMS")is one of the most popular content management systems on the Internet, it is used by an estimated 17.5% of websites according to W3Techs ([source](http://w3techs.com/technologies/details/cm-wordpress/all/all "Usage statistics and market share of WordPress for websites")). This is one of those many websites, I recently moved my website over from Joomla to the latest version of WordPress.

[![Add a new post in WordPress, including the Add Media button](https://samjenkins.com/wp-content/uploads/2013/04/ss4-postbox-300x195.png)](http://wordpress.org/)  
During my initial setting up of WordPress, I went online to find suggestions of what to get WordPress set up properly as I had never used it before. I ended up following a few guides <del>WPGlaze,</del> [WPTeach](http://wpteach.com/after-the-install-10-things-to-do-after-installing-wordpress/ "After the Install: 10 Things To Do After Installing WordPress") and [Pro Blog Design](http://www.problogdesign.com/wordpress/10-things-to-do-after-installing-wordpress/ "10 Things to do After Installing WordPress"), which involved things like changing the administrator account to installing certain plugins, one of which I really like it’s called [WordPress SEO by Yoast](http://wordpress.org/extend/plugins/wordpress-seo/ "WordPress SEO by Yoast"). I’m not going to get into what I like about this plugin, what I am going to talk about is how JetPack, which is a standard plugin for WordPress does not play well when combined with WordPress SEO.

### So what’s the problem with the Add Media button?

When you have both of these two plugins active at the same time you aren’t able to use the ‘Add Media’ button and you are unable to switch between ‘Visual’ and ‘Text’ mode, which can be rather irritating.

### The solution

After Googling around for quite some time I found many discussions about how they were having the same problem, many discussions pointing blame but I couldn’t find anywhere that just plain and simply told me how to fix it. That was until I found this little puppy [Dreamhost’s Wiki](http://wiki.dreamhost.com/WordPress_Troubleshooting#Problems_Adding_Media_in_WordPress_3.5 "Problems Adding Media in WordPress 3.5"), which explains that all you need to do is make a small modification to the wp-config.php file to add;

```php
define('CONCATENATE_SCRIPTS', false );
```

on the line before

```php
require_once(ABSPATH . 'wp-settings.php');
```

After having made this change to my wp-config.php file I was able to yet again use the ‘Add Media’ button and to switch between ‘Visual’ and ‘Text’ design views when writing posts within WordPress.