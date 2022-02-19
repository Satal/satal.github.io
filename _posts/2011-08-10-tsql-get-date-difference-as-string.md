---
id: 13178
title: 'TSQL get date difference as string'
date: '2011-08-10T15:20:07+00:00'
author: Satal

guid: 'http://satalketo.com/2011/08/tsql-get-date-difference-as-string/'
redirect_from:
    - /blog/2011/08/10/tsql-get-date-difference-as-string/
    - /2011/08/10/tsql-get-date-difference-as-string/
permalink: /tsql-get-date-difference-as-string/
snap_MYURL:
    - ''
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapEdIT:
    - '1'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapTW:
    - 's:142:"a:1:{i:0;a:5:{s:4:"doTW";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;}}";'
rank_math_description:
    - 'A TSQL function for returning the difference between two dates in an easy to read format'
rank_math_focus_keyword:
    - TSQL
rank_math_facebook_description:
    - 'A TSQL function for returning the difference between two dates in an easy to read format'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '133'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - Programming
---

I found myself recently needing to be able to present the user with the difference between two dates as a string, unfortunately the data had to come straight from SQL Server into the application that they was using ready to be displayed. After spending quite some time looking around the Internet to try and find a TSQL function that would work, I came up with my own and decided to share it with you.

The following creates a function on the SQL Server database;

```sql
CREATE FUNCTION dbo.DateDiffAsString (@STARTDATE AS DATETIME, @ENDDATE AS DATETIME)

RETURNS VARCHAR(30)
BEGIN
DECLARE @TEMPDATE DATETIME, @YEARS INT, @MONTHS INT, @DAYS INT, @RTN VARCHAR(30)
SELECT @TEMPDATE = @STARTDATE

SELECT @YEARS = DATEDIFF(yy, @TEMPDATE, @ENDDATE) - CASE WHEN (MONTH(@STARTDATE) > MONTH(@ENDDATE)
OR (MONTH(@STARTDATE) = MONTH(@ENDDATE)
  AND DAY(@STARTDATE) > DAY(@ENDDATE))) THEN 1 ELSE 0 END
SELECT @TEMPDATE = DATEADD(yy, @YEARS, @TEMPDATE)
SELECT @MONTHS = DATEDIFF(m, @TEMPDATE, @ENDDATE) - CASE WHEN (DAY(@STARTDATE) > DAY(@ENDDATE)) THEN 1 ELSE 0 END
SELECT @TEMPDATE = DATEADD(m, @MONTHS, @TEMPDATE)
SELECT @DAYS = DATEDIFF(d, @TEMPDATE, @ENDDATE)

SELECT @RTN = CASE WHEN @YEARS > 0 THEN CAST(@YEARS AS VARCHAR(3)) + CASE WHEN @YEARS > 1 THEN  ' years 'ELSE ' year ' END ELSE '' END
 + CAST(@MONTHS AS VARCHAR(2)) + CASE WHEN @MONTHS <> 1 THEN ' months ' ELSE ' month ' END
 + CAST(@DAYS AS VARCHAR(2)) + CASE WHEN @DAYS <> 1 THEN ' days' ELSE ' day' END

RETURN(@RTN)
END
```

And you would call it like this;

```sql
SELECT dbo.DateDiffAsString('2010-06-03 00:00:00.000', GETDATE()) AS Diff
```

Which will return something like “1 year 5 months 4 days” (obviously depending on when you run it)