---
id: 109
title: 'Installed Excel versions and location'
date: '2011-08-04T15:37:00+00:00'
author: Satal

guid: 'http://satalketo.com/2011/08/what-versions-of-excel-are-installed-and-where/'
redirect_from:
    - /blog/2011/08/04/installed-excel-versions/
    - /2011/08/04/installed-excel-versions/
permalink: /installed-excel-versions/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
rank_math_primary_category:
    - ''
rank_math_description:
    - 'A piece of VB.NET code that identifies what versions of Microsoft Excel are installed on a computer and where they are installed.'
rank_math_focus_keyword:
    - Excel
rank_math_facebook_description:
    - 'A piece of VB.NET code that identifies what versions of Microsoft Excel are installed on a computer and where they are installed.'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '134'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - Programming
    - VB.NET
---

Microsoft Excel is probably one of the most used pieces of software on the planet. Spreadsheets are used heavily throughout the business world and Microsoft have enjoyed their Office suite taking a large proportion of businesses

![The Microsoft Excel 2007 splash screen](https://samjenkins.com/wp-content/uploads/2011/08/excel-logo-300x157.jpg)

There was a question recently on [Stack Overflow](http://stackoverflow.com/questions/6882010/how-to-choose-which-excel-version-to-open-using-vb-net "The question") which I felt was a challenge to answer as I couldn’t find anywhere online which appeared to give an answer on how to do it. After some time going through the registry, I was able to identify how to figure out which versions of Excel were installed.  
The following snippet of code is what I came up with to answer the question, the variable rtn is a Dictionary which stores the version of Excel as the key and the directory in which Excel is installed as the value.

```vbnet
Dim reg As RegistryKey
Dim subKey As RegistryKey
Dim rtn As New Dictionary(Of String, String)

reg = Registry.LocalMachine.OpenSubKey("SOFTWAREMicrosoftOffice")
If reg IsNot Nothing Then
    For Each subKeyName As String In reg.GetSubKeyNames
        subKey = reg.OpenSubKey(subKeyName)
        If subKey IsNot Nothing Then
            If subKey.GetSubKeyNames().Contains("Excel") Then
                subKey = subKey.OpenSubKey("ExcelInstallRoot")
                rtn.Add(subKeyName, subKey.GetValue("Path").ToString)
            End If
        End If
    Next
End If

For Each kvp In rtn
    MessageBox.Show(String.Format("Version: {0} at '{1}Excel.exe'", kvp.Key, kvp.Value))
Next
```

The code was tested on a Windows XP machine with Microsoft Excel 2003 and 2007 installed on it. In the variable rtn you have a dictionary of the versions (the key) and the directory that Excel is installed in (the value). As you can see in the MessageBox bit at the end of my code, you’ll need to add “Excel.exe” to the end of it as the value only contains the directory.