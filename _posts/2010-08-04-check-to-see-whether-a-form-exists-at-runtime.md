---
title: 'Check to see whether a form exists at runtime'
date: '2010-08-04T14:43:20+00:00'
author: Satal

redirect_from:
    - /blog/2010/08/04/check-to-see-whether-a-form-exists-at-runtime/
    - /2010/08/04/check-to-see-whether-a-form-exists-at-runtime/
permalink: /check-to-see-whether-a-form-exists-at-runtime/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - WinForms
---

If you want to check whether a form exists in your project at runtime  
you can use the following method, you will need to ensure that you  
import System.Reflection in order for this to work.

```vbnet
''' <summary>
''' This method deals with checking whether a form exists within the current project
''' </summary>
''' <param name="formName">The name of the form that you wish to check its existance</param>
''' <returns>True if the form exists and False if the form doesn't exist</returns>
''' <remarks></remarks>
Public Shared Function formExists(ByVal formName As String) As Boolean
    Dim myAssembly As Assembly
    Dim frm As Form = Nothing
    Dim assemblyName As String

    Try
        myAssembly = Assembly.GetEntryAssembly
        assemblyName = myAssembly.FullName.Split(",")(0)
        frm = myAssembly.CreateInstance(assemblyName & "." & formName)
    Catch ex As Exception
    End Try

    Return frm IsNot Nothing
End Function
```

Please note the reason that we are using Assembly.GetEntryAssembly rather than Assembly.GetExecutingAssembly is that if we was to put our code into a DLL for example, then the executing assembly would be the dll which in most cases wouldn’t contain the forms. Obviously if your forms and the code that gets the form are held in the DLL then you would want to use Assembly.GetExecutingAssembly.