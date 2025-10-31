---
title: 'Check whether the current user is an administrator'
date: '2010-08-17T10:45:17+00:00'
author: Satal

redirect_from:
    - /blog/2010/08/17/check-whether-the-current-user-is-an-administrator/
    - /2010/08/17/check-whether-the-current-user-is-an-administrator/
permalink: /check-whether-the-current-user-is-an-administrator/
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