---
id: 100
title: 'Tell if Microsoft Office Save As PDF add in is installed'
date: '2010-09-10T11:25:27+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/tell-if-microsoft-office-save-as-pdf-add-in-is-installed/'
permalink: /blog/2010/09/10/tell-if-microsoft-office-save-as-pdf-add-in-is-installed/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - ''
rank_math_description:
    - 'A VB.NET function to identify whether the ''Save As PDF'' add-in for Microsoft Office 2007 has been installed'
rank_math_facebook_description:
    - 'A VB.NET function to identify whether the ''Save As PDF'' add-in for Microsoft Office 2007 has been installed'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '142'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example I’m going to show you how to check whether the Microsoft Office 2007 Save As PDF addin (available from [here](https://www.microsoft.com/en-gb/download/details.aspx?id=7)) is installed.

```
<pre class="brush: vbnet; gutter: true">Public Shared Function isPDFSaverInstalled() As Boolean
    Dim rtn As Boolean
    Dim key As RegistryKey = Registry.LocalMachine.OpenSubKey("SoftwareMicrosoftWindowsCurrentVersionUninstall{90120000-00B0-0409-0000-0000000FF1CE}")
    rtn = key IsNot Nothing
    key.Close()
    Return rtn
End Function
```