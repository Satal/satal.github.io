---
id: 97
title: 'Is Access installed and what version?'
date: '2010-09-10T08:45:52+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/figure-out-if-access-is-installed-and-what-version-it-is/'
redirect_from:
    - /blog/2010/09/10/is-access-installed-what-version/
    - /2010/09/10/is-access-installed-what-version/
permalink: /is-access-installed-what-version/
rank_math_description:
    - 'VB.NET functions to identify if Microsoft Access is installed and what version of Access it is'
rank_math_facebook_description:
    - 'VB.NET functions to identify if Microsoft Access is installed and what version of Access it is'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '145'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example, I’m going to provide you with a simple class that allows for you to check whether Access is installed on the computer and also figure out which version of the Access it is.

The version function uses late binding.

```vbnet
Imports Microsoft.Win32

Namespace MS.Office
    Public Class Access
        Public Shared Function isInstalled() As Boolean
            Dim regClasses As RegistryKey = Registry.ClassesRoot
            Dim rtn As Boolean
            Dim reg As RegistryKey = regClasses.OpenSubKey("Access.Application")
            If reg Is Nothing Then
                rtn = False
            Else
                rtn = True
            End If
            reg.Close()

            Return rtn
        End Function

        Public Shared Function version() As String
            Dim rtn As String = ""
            Dim objApp As Object

            If isInstalled() Then
                objApp = CreateObject("Access.Application")
                rtn = objApp.Version
            End If

            Return rtn
        End Function
    End Class
End Namespace
```