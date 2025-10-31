---
title: 'SQL Server list columns in table'
date: '2010-06-02T10:15:52+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/02/sql-server-list-columns-in-table/
    - /2010/06/02/sql-server-list-columns-in-table/
permalink: /sql-server-list-columns-in-table/
categories:
    - All
    - Computer
    - Programming
---

This is one method of getting a list of all the columns in a table on SQL Server

```sql
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=@TABLE_NAME
```