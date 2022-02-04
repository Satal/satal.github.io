---
id: 107
title: 'Get the associated application for a file extension'
date: '2011-06-04T11:47:15+00:00'
author: Satal

guid: 'http://satalketo.com/2011/06/get-the-associated-application-for-a-file-extension/'
permalink: /blog/2011/06/04/get-the-associated-application-for-a-file-extension/
snapEdIT:
    - '1'
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapTW:
    - 's:142:"a:1:{i:0;a:5:{s:4:"doTW";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;}}";'
rank_math_description:
    - 'A VB.NET method to identify the application associated with a particular file extension'
rank_math_focus_keyword:
    - 'File extension'
rank_math_facebook_description:
    - 'A VB.NET method to identify the application associated with a particular file extension'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '136'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - Programming
    - VB.NET
---

Sometimes its necessary for us to identify what application is associated with a particular file extension, the following snippet of code will read the Windows registry to identify what application a particular file extension is opened with by default.

```
<pre class="brush: vbnet; gutter: true">''' <summary>
''' This method deals with getting the path of the application that is specified to open
''' a particular extension
''' </summary>
''' <param name="ext">The extension to get the associated application for</param>
''' <returns>The path of the application that is associated to the specified extension</returns>
''' <remarks>Returns a zero length string if the extension is not found</remarks>
Public Shared Function getApplicationForExtension(ByVal ext As String) As String
    Dim key As Microsoft.Win32.RegistryKey = Microsoft.Win32.Registry.ClassesRoot
    Dim secondKey As String
    Dim rtn As String = ""

    If Not ext.StartsWith(".") Then
        ext = "." & ext
    End If

    key = key.OpenSubKey(ext)

    If key IsNot Nothing Then
        secondKey = key.GetValue("").ToString()

        If secondKey <> "" Then
            key = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(secondKey & "ShellOpenCommand")
            rtn = key.GetValue("").ToString()
            rtn = System.Text.RegularExpressions.Regex.Match(rtn, """(.*?)""").Groups(0).Value
        End If
    End If

    Return rtn
End Function
```