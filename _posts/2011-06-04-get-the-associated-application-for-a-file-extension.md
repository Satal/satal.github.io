---
title: 'Get the associated application for a file extension'
date: '2011-06-04T11:47:15+00:00'
author: Satal

redirect_from:
    - /blog/2011/06/04/get-the-associated-application-for-a-file-extension/
    - /2011/06/04/get-the-associated-application-for-a-file-extension/
permalink: /get-the-associated-application-for-a-file-extension/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
rank_math_focus_keyword:
    - 'File extension'
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

```vbnet
''' <summary>
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