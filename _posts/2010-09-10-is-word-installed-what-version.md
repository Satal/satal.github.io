---
title: 'Is Word installed and what version?'
date: '2010-09-10T08:48:32+00:00'
author: Satal

redirect_from:
    - /blog/2010/09/10/is-word-installed-what-version/
    - /2010/09/10/is-word-installed-what-version/
permalink: /is-word-installed-what-version/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example, I’m going to provide you with a simple class that allows for you to check whether Word is installed on the computer and also figure out which version of the Word it is.

The version function uses late binding.

```csharp
Imports Microsoft.Win32

Namespace MS.Office
    Public Class Word
        Public Shared Function isInstalled() As Boolean
            Dim regClasses As RegistryKey = Registry.ClassesRoot
            Dim rtn As Boolean
            Dim reg As RegistryKey =  regClasses.OpenSubKey("Word.Application")
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
                objApp = CreateObject("Word.Application")
                rtn = objApp.Version
            End If

            Return rtn
        End Function
    End Class
End Namespace
```