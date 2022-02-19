---
id: 31
title: 'Response.Write from within a class'
date: '2010-05-25T21:51:59+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/responsewrite-from-within-a-class/'
redirect_from:
    - /blog/2010/05/25/responsewrite-from-within-a-class/
    - /2010/05/25/responsewrite-from-within-a-class/
permalink: /responsewrite-from-within-a-class/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '188'
categories:
    - All
    - Computer
    - Programming
tags:
    - ASP.NET
    - VB.NET
---

In developing websites in ASP.Net I frequently use Response.Write to debug the code behind, but when using classes you cannot directly access Response.Write.  
The method of performing Respone.Write from within a class is to do the following;

```vbnet
HttpContext.Current.Response.Write("Your text")
```