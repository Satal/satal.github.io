---
id: 78
title: 'Get an instance of a form dynamically at runtime'
date: '2010-08-04T14:36:27+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/get-an-instance-of-a-form-dynamically-at-runtime/'
redirect_from:
    - /blog/2010/08/04/get-an-instance-of-a-form-dynamically-at-runtime/
    - /2010/08/04/get-an-instance-of-a-form-dynamically-at-runtime/
permalink: /get-an-instance-of-a-form-dynamically-at-runtime/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - ''
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '158'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - WinForms
---

There is sometimes a need for you to be able to dynamically choose a form to load at runtime, in order to achieve this you’re able to use the following code, you will need to ensure that you import System.Reflection in order for this to work.

It is also recommended that you check for the existence of the form in your project prior to trying to get an instance of it, you can do this through the code available in my article [Check whether a form exists](https://samjenkins.com/check-to-see-whether-a-form-exists-at-runtime/).

```vbnet
#Region "Exceptions"
    Public Class FormNotFoundException
        Inherits ApplicationException
        Public Sub New(ByVal message As String)
            MyBase.New(message)
        End Sub
    End Class
#End Region
    ''' <summary>
    ''' This method deals with returning a Form object of the form that the name was supplier for
    ''' </summary>
    ''' <param name="formName">The name of the form that you wish to have returned</param>
    ''' <returns>The form with the name that was specified</returns>
    ''' <remarks>You should check whether the form exists using the doesFormExist function</remarks>
    Public Shared Function getForm(ByVal formName As String) As Form
        Dim myAssembly As Assembly
        Dim frm As Form = Nothing
        Dim assemblyName As String

        Try
            myAssembly = Assembly.GetEntryAssembly

            assemblyName = myAssembly.FullName.Split(",")(0)
            frm = myAssembly.CreateInstance(assemblyName & "." & formName)
        Catch exNull As NullReferenceException
            Throw New FormNotFoundException("The form name specified does not relate to a valid form. Please note that form names are case sensitive")
        Catch ex As Exception
            Throw ex
        End Try

        If frm Is Nothing Then
            Throw New FormNotFoundException("The form name specified does not relate to a valid form. Please note that form names are case sensitive")
        End If

        Return frm
    End Function
```

Please note the reason that we are using Assembly.GetEntryAssembly rather than Assembly.GetExecutingAssembly is that if we was to put our code into a DLL for example, then the executing assembly would be the dll which in most cases wouldn’t contain the forms. Obviously if your forms and the code that gets the form are held in the DLL then you would want to use Assembly.GetExecutingAssembly.