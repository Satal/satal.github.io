---
title: 'Get the username of the currently logged in user'
date: '2010-08-17T14:22:16+00:00'
author: Satal

redirect_from:
    - /blog/2010/08/17/current-windows-username/
    - /2010/08/17/current-windows-username/
permalink: /current-windows-username/
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