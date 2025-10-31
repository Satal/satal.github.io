---
title: 'Tell if Microsoft Office Save As PDF add in is installed'
date: '2010-09-10T11:25:27+00:00'
author: Satal

redirect_from:
    - /blog/2010/09/10/tell-if-microsoft-office-save-as-pdf-add-in-is-installed/
    - /2010/09/10/tell-if-microsoft-office-save-as-pdf-add-in-is-installed/
permalink: /tell-if-microsoft-office-save-as-pdf-add-in-is-installed/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example I’m going to show you how to check whether the Microsoft Office 2007 Save As PDF addin (available from [here](https://www.microsoft.com/en-gb/download/details.aspx?id=7)) is installed.

```vbnet
Public Shared Function isPDFSaverInstalled() As Boolean
    Dim rtn As Boolean
    Dim key As RegistryKey = Registry.LocalMachine.OpenSubKey("SoftwareMicrosoftWindowsCurrentVersionUninstall{90120000-00B0-0409-0000-0000000FF1CE}")
    rtn = key IsNot Nothing
    key.Close()
    Return rtn
End Function
```