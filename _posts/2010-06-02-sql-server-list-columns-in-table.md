---
id: 37
title: 'SQL Server list columns in table'
date: '2010-06-02T10:15:52+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/sql-server-list-columns-in-table/'
permalink: /blog/2010/06/02/sql-server-list-columns-in-table/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '183'
categories:
    - All
    - Computer
    - Programming
---

This is one method of getting a list of all the columns in a table on SQL Server

```sql
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=@TABLE_NAME
```