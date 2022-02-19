---
id: 28
title: 'How to create a Die in code'
date: '2010-05-25T14:31:13+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/how-to-create-a-die-in-code/'
redirect_from:
    - /blog/2010/05/25/create-a-die-in-code/
    - /2010/05/25/create-a-die-in-code/
permalink: /create-a-die-in-code/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '191'
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
---

Something that people sometimes want to do is create a Die in code, I thought I would supply code on one method of doing this.

```vbnet
Public Class Die
    Private Shared rndGen As New Random
    Private _numFaces As Integer
    Private _curValue As Integer
#Region "Properties"
    Public Property NumberOfFaces() As Integer
        Get
            Return _numFaces
        End Get
        Set(ByVal value As Integer)
            If value <= 0 Then
                Throw New ArgumentOutOfRangeException()
            End If
            _numFaces = value
        End Set
    End Property
    Public Property CurrentValue() As Integer
        Get
            Return _curValue
        End Get
        Set(ByVal value As Integer)
            _curValue = value
        End Set
    End Property
#End Region
#Region "Constructors"
    Public Sub New(ByVal numFaces As Integer)
        'If the value is inappropriate then NumberOfFaces property will throw
        'an exception so we don't need to here
        NumberOfFaces = numFaces
    End Sub
#End Region
#Region "Methods"
    Public Function roll() As Integer
        _curValue = rndGen.Next(1, _numFaces + 1)
        Return _curValue
    End Function
#End Region
End Class
```