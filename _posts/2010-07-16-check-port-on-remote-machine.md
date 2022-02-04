---
id: 66
title: 'Check whether a port is open on a remote machine'
date: '2010-07-16T08:03:49+00:00'
author: Satal

guid: 'http://satalketo.com/2010/07/check-whether-a-port-is-open-on-a-remote-machine/'
permalink: /blog/2010/07/16/check-port-on-remote-machine/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '164'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

Sometimes you would like to know whether a port is open on a remote machine. Now while this is no nmap, the following code should give you an idea on how to check whether a port is open.

```vbnet
Private Function isRemotePortOpen(ByVal hostName As String, ByVal port As Integer) As Boolean
    Dim client As TcpClient = Nothing
    Dim rtn as Boolean
    Try
        client = New TcpClient(Host, PortNumber)
        rtn = True
    Catch ex As SocketException
        rtn = False
    Finally
        If Not client Is Nothing Then
            client.Close()
        End If
    End Try
    Return rtn
End Function
```