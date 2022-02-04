---
id: 24
title: 'Generate a password'
date: '2010-05-19T15:28:34+00:00'
author: Satal
guid: 'http://satalketo.com/2010/05/generate-password/'
permalink: /blog/2010/05/19/generate-password/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:231:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'A VB.NET method to generate a random string that could be used as a password'
rank_math_facebook_description:
    - 'A VB.NET method to generate a random string that could be used as a password'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '194'
categories:
    - All
    - Computer
    - Programming
tags:
    - Passwords
    - Programming
    - VB.NET
---

Something that I found that I frequently come across is the need to generate a random string, so I ended up creating a simple shared function that dealt with that for me.

```vbnet
Imports Microsoft.VisualBasic

Public Class PasswordFunctions
    ''' <summary>
    ''' This function generates a random password allowing for the specification of the contents
    ''' </summary>
    ''' <param name="passwordLength">The number of characters to be in the password</param>
    ''' <param name="includeUpperCase">Whether to include upper case characters</param>
    ''' <param name="includeNumbers">Whether to include numbers</param>
    ''' <param name="includeSymbols">Whether to include symbols</param>
    ''' <param name="includeSimilarChars">Whether to include characters which are similar</param>
    ''' <returns>A string with the random password</returns>
    ''' <remarks>This method was produced by Satal Keto (www.satalketo.com)</remarks>
    Public Shared Function generatePassword(Optional ByVal passwordLength As Integer = 12, _
                              Optional ByVal includeUpperCase As Boolean = False, _
                              Optional ByVal includeNumbers As Boolean = False, _
                              Optional ByVal includeSymbols As Boolean = False, _
                              Optional ByVal includeSimilarChars As Boolean = False) As String

        Dim strRtn As String = ""
        Dim strAllowedChars As String
        Dim intCount As Integer
        Dim rnd As New Random()

        strAllowedChars = "abcdefghijkmnopqrstuvwxyz"
        If includeUpperCase Then
            strAllowedChars &= "ABCDEFGHJKLMNPQRSTUVWXYZ"
            If includeSimilarChars Then
                strAllowedChars &= "IO"
            End If
        End If
        If includeNumbers Then
            strAllowedChars &= "23456789"
            If includeSimilarChars Then
                strAllowedChars &= "10"
            End If
        End If
        If includeSymbols Then
            strAllowedChars &= "|$%^&*()_+~-=#[]{};':@,./<>?"
            If includeSimilarChars Then
                strAllowedChars &= "!"
            End If
        End If

        For intCount = 0 To passwordLength
            strRtn &= strAllowedChars.Substring(rnd.Next(0, strAllowedChars.Length - 1), 1)
        Next

        Return strRtn
    End Function

End Class
```