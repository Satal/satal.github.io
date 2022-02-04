---
id: 91
title: 'Get the username of the currently logged in user'
date: '2010-08-17T14:22:16+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/get-the-username-of-the-currently-logged-in-user/'
permalink: /blog/2010/08/17/current-windows-username/
rank_math_description:
    - 'A VB.NET function to get the username for the currently logged in Windows user'
rank_math_facebook_description:
    - 'A VB.NET function to get the username for the currently logged in Windows user'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '151'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - Windows
---

If you want to get the username for the currently logged in user you can use the following code;

```vbnet
Public Shared ReadOnly Property Username() As String
    Get
        Return System.Environment.UserName
    End Get
End Property
```