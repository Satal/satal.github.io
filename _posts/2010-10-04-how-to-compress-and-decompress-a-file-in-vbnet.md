---
id: 103
title: 'How to compress and decompress a file in VB.Net'
date: '2010-10-04T10:27:11+00:00'
author: Satal

guid: 'http://satalketo.com/2010/10/how-to-compress-and-decompress-a-file-in-vbnet/'
permalink: /blog/2010/10/04/how-to-compress-and-decompress-a-file-in-vbnet/
rank_math_description:
    - 'A couple of VB.NET methods for compressing and decompressing a file'
rank_math_facebook_description:
    - 'A couple of VB.NET methods for compressing and decompressing a file'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '140'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this tutorial/code example, I’m going to provide you with a piece of code to compress and decompress a file in VB.Net without using any additional libraries.

```vbnet
Option Explicit On
Option Strict On

Imports System.IO
Imports System.IO.Compression

Namespace FileSystem
    Public Class Compressor
        ''' <summary>
        ''' This method deals with compressing a file
        ''' </summary>
        ''' <param name="fileLocation">The location of the file to be compressed</param>
        ''' <param name="outFileLocation">The full file path of the file to be saved</param>
        ''' <returns>True if the file was compressed successfully, else false</returns>
        ''' <remarks>If the output file already exists it will be overwritten</remarks>
        Public Shared Function CompressFile(ByVal fileLocation As String, ByVal outFileLocation As String) As Boolean
            Dim rtn As Boolean = True
            Dim fsSource As FileStream = Nothing
            Dim fsDest As FileStream = Nothing
            Dim gzCompress As GZipStream = Nothing
            Dim bufWrite() As Byte

            If Not File.Exists(fileLocation) Then
                Throw New FileNotFoundException
            End If
            If File.Exists(outFileLocation) Then
                File.Delete(outFileLocation)
            End If

            Try
                fsSource = New FileStream(fileLocation, FileMode.Open, FileAccess.Read, FileShare.Read)

                bufWrite = New Byte(CInt(fsSource.Length)) {}

                fsSource.Read(bufWrite, 0, bufWrite.Length)
                fsDest = New FileStream(outFileLocation, FileMode.OpenOrCreate, FileAccess.Write)
                gzCompress = New GZipStream(fsDest, CompressionMode.Compress, True)

                gzCompress.Write(bufWrite, 0, bufWrite.Length)
            Catch ex As Exception
                rtn = False
            Finally
                If fsSource IsNot Nothing Then
                    fsSource.Close()
                End If
                If gzCompress IsNot Nothing Then
                    gzCompress.Close()
                End If
                If fsDest IsNot Nothing Then
                    fsDest.Close()
                End If
            End Try

            Return rtn
        End Function
        ''' <summary>
        ''' This method deals with decompressing a file
        ''' </summary>
        ''' <param name="fileLocation">The location of the file to decompress</param>
        ''' <param name="outFileLocation">The full file path to be saved to</param>
        ''' <returns>True if the decompression was successful, else false</returns>
        ''' <remarks>If the file destination already exists it will be overwritten</remarks>
        Public Shared Function DecompressFile(ByVal fileLocation As String, ByVal outFileLocation As String) As Boolean
            Dim rtn As Boolean = True
            Dim bufWrite(1024) As Byte
            Dim gzStream As GZipStream = Nothing
            Dim fsSource As FileStream = Nothing
            Dim fsDestin As FileStream = Nothing
            Dim counter As Integer
            Dim offset As Integer = 0

            If Not File.Exists(fileLocation) Then
                Throw New FileNotFoundException
            End If
            If File.Exists(outFileLocation) Then
                File.Delete(outFileLocation)
            End If

            Try
                fsDestin = New FileStream(outFileLocation, FileMode.Create)
                fsSource = New FileStream(fileLocation, FileMode.OpenOrCreate)
                gzStream = New GZipStream(fsSource, CompressionMode.Decompress, True)

                counter = gzStream.Read(bufWrite, 0, bufWrite.Length)

                While counter > 0
                    fsDestin.Write(bufWrite, 0, bufWrite.Length)
                    offset += counter
                    counter = gzStream.Read(bufWrite, 0, bufWrite.Length)
                End While
            Catch ex As Exception
                rtn = False
            Finally
                If gzStream IsNot Nothing Then
                    gzStream.Close()
                End If
                If fsSource IsNot Nothing Then
                    fsSource.Close()
                End If
                If fsDestin IsNot Nothing Then
                    fsDestin.Close()
                End If
            End Try

            Return rtn
        End Function
    End Class
End Namespace
```