---
id: 64
title: 'Calculate SHA384 hash of string or file'
date: '2010-06-23T21:59:43+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/calculate-sha384-hash-of-string-or-file/'
redirect_from:
    - /blog/2010/06/23/sha384-hash-of-string-or-file/
    - /2010/06/23/sha384-hash-of-string-or-file/
permalink: /sha384-hash-of-string-or-file/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:231:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";'
rank_math_primary_category:
    - ''
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '166'
categories:
    - All
    - Computer
    - Programming
    - Security
    - Uncategorized
tags:
    - VB.NET
---

This class implements the IHasher interface that you can find [here](https://samjenkins.com/interface-for-hashing-classes/ "Interface for Hashing classes").

```vbnet
'''
''' SHA384 hash class from Satal Keto's library
''' https://samjenkins.com
''' Version 1.0.0.1
'''
Imports System.IO
Imports System.Security.Cryptography
Namespace Security.Hash
    Public Class SHA384Hash
        Implements IHasher
        Public Function hashOfFile(ByVal fileToHash As String) As String Implements IHasher.hashOfFile
            Dim rdr As FileStream
            Dim sha As New SHA384CryptoServiceProvider
            Dim bytes() As Byte
            Dim rtn As String = ""
            If File.Exists(fileToHash) Then
                rdr = New FileStream(fileToHash, FileMode.Open, FileAccess.Read)
                bytes = sha.ComputeHash(rdr)
                rtn = ByteArrayToString(bytes)
            End If
            Return rtn
        End Function
        Public Function hashOfString(ByVal stringToHash As String) As String Implements IHasher.hashOfString
            Dim sha As New SHA384CryptoServiceProvider
            Dim bytesToHash() As Byte = System.Text.Encoding.ASCII.GetBytes(stringToHash)
            bytesToHash = sha.ComputeHash(bytesToHash)
            Dim strResult As String = ""
            For Each b As Byte In bytesToHash
                strResult += b.ToString("x2")
            Next
            Return strResult
        End Function
        Private Function ByteArrayToString(ByVal arrInput() As Byte) As String
            Dim sb As New System.Text.StringBuilder(arrInput.Length * 2)
            For i As Integer = 0 To arrInput.Length - 1
                sb.Append(arrInput(i).ToString("X2"))
            Next
            Return sb.ToString().ToLower
        End Function
    End Class
End Namespace
```