---
id: 52
title: 'Track number of times a file is downloaded'
date: '2010-06-14T10:49:06+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/track-number-of-times-a-file-is-downloaded/'
permalink: /blog/2010/06/14/track-number-of-times-a-file-is-downloaded/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '177'
categories:
    - All
    - Computer
    - Programming
tags:
    - ASP.NET
    - VB.NET
---

Being able to track how many times a file has been downloaded from your website is a useful bit of information. One method of doing this is by making it so that the user is instead of being sent directly to the file is sent to a web page which then sends the user the file.

I haven’t added any code that figures out where the file is stored on the server or what the file should be called when its downloaded, as I assume that you should be able to get that information yourself, either by hard-coding or by getting the information from a database.

The documentLocation variable should hold the location that the file is stored. The documentName variable should hold the name that the browser should suggest saving the file as to the user.

```vbnet
Dim file As IO.FileInfo
Dim documentLocation As String = ""
Dim documentName As String = ""

file = New IO.FileInfo(Server.MapPath(documentLocation))

If file.Exists Then
    Response.ContentType = "application/octet-stream"
    Response.AddHeader("Content-Disposition", "attachment; filename=" & getDownloadFileName(documentName))
    Response.TransmitFile(Server.MapPath(documentLocation))
Else
    Response.Write("Unable to locate the file specified, perhaps it has been deleted")
End If
```