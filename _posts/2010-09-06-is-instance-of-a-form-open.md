---
id: 93
title: 'Check whether an instance of a form is open'
date: '2010-09-06T09:25:07+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/check-whether-an-instance-of-a-form-is-open/'
permalink: /blog/2010/09/06/is-instance-of-a-form-open/
rank_math_description:
    - 'A VB.NET function to identify whether an instance of a particular form is open'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '149'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - WinForms
---

In this VB.Net Tutorial/Code Example I’ll be showing you how to check to see whether there is an instance of a form open in your application.

```
<pre class="brush: vbnet; gutter: true">''' <summary>
''' This method deals with checking to see whether a particular form is open
''' </summary>
''' <param name="formName">The name of the form that you are looking for</param>
''' <returns></returns>
''' <remarks></remarks>
Public Shared Function isFormOpen(ByVal formName As String) As Boolean
    Dim frm As Form
    Dim i As Integer = 0
    Dim found As Boolean = False

    While i < Application.OpenForms.Count
        frm = Application.OpenForms.Item(i)

        If frm.Name.ToLower = formName.ToLower Then
            found = True
            Exit While
        End If

        i += 1
    End While

    Return found
End Function{/code}
```