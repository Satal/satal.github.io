---
title: 'Change the cursor in JavaScript'
date: '2010-06-19T12:07:22+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/19/change-the-cursor-javascript/
    - /2010/06/19/change-the-cursor-javascript/
permalink: /change-the-cursor-javascript/
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