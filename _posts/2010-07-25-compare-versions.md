---
id: 71
title: 'Compare versions of application'
date: '2010-07-25T13:13:37+00:00'
author: Satal

guid: 'http://satalketo.com/2010/07/compare-versions-of-application/'
redirect_from:
    - /blog/2010/07/25/compare-versions/
    - /2010/07/25/compare-versions/
permalink: /compare-versions/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '162'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

It is common for you to want to check whether your application is the latest version of the application. It is possible to compare the version of your application against a version number that you have as a string

You can achieve this by doing something like;

```vbnet
Dim curVer As Version = My.Application.Info.Version
Dim availVer As Version = New Version("1.0.0.2")
If availVer > curVer Then
    'The available version is newer
Else
    'You either have the latest version or a future version.
End If
```