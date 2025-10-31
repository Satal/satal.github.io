---
title: 'Get the ID for the last inserted record'
date: '2010-06-03T16:12:58+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/03/id-for-last-inserted-record/
    - /2010/06/03/id-for-last-inserted-record/
permalink: /id-for-last-inserted-record/
categories:
    - All
    - Computer
    - Programming
---

When you’re dealing with SQL Server doing inserts, you commonly want the identity to be a number which increments from 1. But one of the problems with this being automatically incremented is that you don’t immediately know what the ID for the last item you added is.

SQL Server provides the capability for you to get this information by using the following SQL.

```sql
SELECT @@IDENTITY
```

The only problem with this SQL is that it will return the ID for the last entry that anyone inserted. So if you have a multi-user system and you insert something and someone else inserts something after you, but before you perform the SQL above then you will get the ID for the record that they just entered. This obviously is a very small possibility as you will generally want to find the ID out immediately after adding the record, so the probability of someone inserting a record in the millisecond between your insert and query is extremely unlikely.

If you think that this risk is too high to take then I would suggest using a Unique identifier (UID) instead of a number which increments. The reason for this is that then you can have the programming language generate a new UID, then insert that into the table and obviously as the programming language generated the UID then it should know what that UID is. The UID is random enough that it is negligible that there will be two that are the same during your applications life time.