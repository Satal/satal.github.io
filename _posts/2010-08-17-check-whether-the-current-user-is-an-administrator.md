---
id: 89
title: 'Check whether the current user is an administrator'
date: '2010-08-17T10:45:17+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/check-whether-the-current-user-is-an-administrator/'
permalink: /blog/2010/08/17/check-whether-the-current-user-is-an-administrator/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '153'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

An extremely simple way to check whether the currently logged in user has administrative rights on the local machine;

```vbnet
Public Shared ReadOnly Property IsUserAdmin() As Boolean
    Get
        Return My.User.IsInRole(ApplicationServices.BuiltInRole.Administrator)
    End Get
End Property
```