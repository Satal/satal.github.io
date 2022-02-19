---
id: 96
title: 'Is Outlook installed and what version?'
date: '2010-09-10T08:40:47+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/figure-out-if-outlook-is-installed-and-what-version-it-is/'
redirect_from:
    - /blog/2010/09/10/is-outlook-installed-what-version/
    - /2010/09/10/is-outlook-installed-what-version/
permalink: /is-outlook-installed-what-version/
rank_math_description:
    - 'VB.NET functions to identify if Microsoft Outlook is installed and what version of Outlook it is'
rank_math_facebook_description:
    - 'VB.NET functions to identify if Microsoft Outlook is installed and what version of Outlook it is'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '146'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'Microsoft Outlook'
    - VB.NET
---

In this VB.Net Tutorial/Code Example, I’m going to provide you with a simple class that allows for you to check whether Outlook is installed on the computer and also figure out which version of the Outlook it is.

{code}Imports Microsoft.Win32

Namespace MS.Office  
Public Class Outlook  
Public Shared Function isInstalled() As Boolean  
Dim regClasses As RegistryKey = Registry.ClassesRoot  
Dim rtn As Boolean

Dim reg As RegistryKey = regClasses.OpenSubKey(“Outlook.Application”)  
If reg Is Nothing Then  
rtn = False  
Else  
rtn = True  
End If  
reg.Close()

Return rtn  
End Function

Public Shared Function version() As String  
Dim rtn As String = “”  
Dim objApp As Object

If isInstalled() Then  
objApp = CreateObject(“Outlook.Application”)  
rtn = objApp.Version  
End If

Return rtn  
End Function  
End Class  
End Namespace{/code}