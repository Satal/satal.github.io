---
title: 'Calculate RIPEMD160 Hash of string or file'
date: '2010-06-23T21:52:53+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/23/ripemd160-hash-of-string-or-file/
    - /2010/06/23/ripemd160-hash-of-string-or-file/
permalink: /ripemd160-hash-of-string-or-file/
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
''' RIPEMD160 hash class from Satal Keto's library
''' https://samjenkins.com
''' Version 1.0.0.1
'''
Imports System.IO
Imports System.Security.Cryptography
Namespace Security.Hash
    Public Class RIPEMD160Hash
        Implements IHasher
        Public Function hashOfFile(ByVal fileToHash As String) As String Implements IHasher.hashOfFile
            Dim rdr As FileStream
            Dim rip As RIPEMD160 = RIPEMD160Managed.Create
            Dim bytes() As Byte
            Dim rtn As String = ""
            If File.Exists(fileToHash) Then
                rdr = New FileStream(fileToHash, FileMode.Open, FileAccess.Read)
                bytes = rip.ComputeHash(rdr)
                rtn = ByteArrayToString(bytes)
            End If
            Return rtn
        End Function
        Public Function hashOfString(ByVal stringToHash As String) As String Implements IHasher.hashOfString
            Dim rip As RIPEMD160 = RIPEMD160Managed.Create
            Dim bytesToHash() As Byte = System.Text.Encoding.ASCII.GetBytes(stringToHash)
            bytesToHash = rip.ComputeHash(bytesToHash)
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