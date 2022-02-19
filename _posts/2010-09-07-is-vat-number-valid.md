---
id: 95
title: 'Check if a VAT Number is valid'
date: '2010-09-07T11:41:46+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/check-if-a-vat-number-is-valid/'
permalink: /is-vat-number-valid/
rank_math_description:
    - 'A VB.NET function to check whether a specified VAT number is valid'
rank_math_facebook_description:
    - 'A VB.NET function to check whether a specified VAT number is valid'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '147'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example, I’m going to show you how to check whether a VAT Number is valid or not.

For this piece of code you will need to import “System.Text.RegularExpressions”

```vbnet
Public Shared Function isValidVATNumber(ByVal theVATNumber As String) As Boolean
    Dim startChar As String = "^"
    Dim endChar As String = "$"
    Dim rtn As Boolean = False
    Dim i As Integer = 8
    Dim valString As String
    Dim sum As Integer = 0

    'Check that the string matches the requirements
    rtn = Regex.IsMatch(theVATNumber, startChar & "([A-Z{2}])*(([1-9]d{8})|([1-9]d{11}))" & endChar, RegexOptions.Multiline)

    If rtn Then
        'Now perform the validation
        valString = theVATNumber

        If Regex.IsMatch(valString, startChar & "[A-Z]{2}", RegexOptions.Multiline) Then
            valString = valString.Substring(2)
        End If

        While i >= 2
            sum += (i * CInt(valString.Substring(0, 1)))
            valString = valString.Substring(1)
            i -= 1
        End While

        While sum > 0
            sum -= 97
        End While

        rtn = ((sum * -1) = CInt(valString))
    End If

    Return rtn
Function
```