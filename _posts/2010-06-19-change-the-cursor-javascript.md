---
id: 58
title: 'Change the cursor in JavaScript'
date: '2010-06-19T12:07:22+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/change-the-cursor/'
redirect_from:
    - /blog/2010/06/19/change-the-cursor-javascript/
    - /2010/06/19/change-the-cursor-javascript/
permalink: /change-the-cursor-javascript/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '172'
categories:
    - All
    - Computer
    - Programming
---

Just a simple JavaScript function to change the cursor

```javascript
/**
 * Posible options
 * 
 * auto
 * crosshair
 * default
 * pointer (hand)
 * help
 * move
 * text
 * wait
 * e-resize, w-resize, n-resize, s-resize, ne-resize, nw-resize, se-resize, sw-resize
 * 
 * onmouseover="changeCursor('crosshair');"
 */
function changeCursor(style)
{
    document.body.style.cursor=style;
}
```