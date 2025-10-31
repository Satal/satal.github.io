---
title: 'How to get all instances of a form'
date: '2010-09-06T09:22:21+00:00'
author: Satal

redirect_from:
    - /blog/2010/09/06/get-all-instances-of-a-form/
    - /2010/09/06/get-all-instances-of-a-form/
permalink: /get-all-instances-of-a-form/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - WinForms
---

Because in VB.Net you’re able to have multiple instances of a form, sometimes you want to be able to get a list of all of the instances of that form that are open, the following function will do this for you.

```vbnet
''' <summary>
''' This method deals with getting all the instances of a form
''' </summary>
''' <param name="formName">The name of the form to look for</param>
''' <returns></returns>
''' <remarks></remarks>
Public Shared Function getAllInstancesOfForm(ByVal formName As String) As List(Of Form)
    Dim frm As Form
    Dim i As Integer = 0
    Dim found As New List(Of Form)

    While i < Application.OpenForms.Count
        frm = Application.OpenForms.Item(i)

        If frm.Name.ToLower = formName.ToLower Then
            found.Add(frm)
        End If

        i += 1
    End While

    Return found
End Function
```