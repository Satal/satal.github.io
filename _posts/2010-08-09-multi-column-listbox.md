---
id: 87
title: 'Using a ListView as a multi column ListBox'
date: '2010-08-09T10:49:15+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/using-a-listview-as-a-multi-column-listbox/'
redirect_from:
    - /blog/2010/08/09/multi-column-listbox/
    - /2010/08/09/multi-column-listbox/
permalink: /multi-column-listbox/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - ''
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '155'
image: /wp-content/uploads/2010/08/listview-tasks-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - ListBox
    - VB.NET
---

In order for you to get the ListView to act like a multicolumn ListBox you need to set the following properties

| Property Name | New Value | Reason |
|---|---|---|
| FullRowSelect | True | If FullRowSelect is left on its default value of False then when a user selects a row then it will only be a single column which appears to be selected rather than the entire row, which is generally not what you want. |
| HideSelection | False | If HideSelection is left on its default value of True then when the form that contains the ListView doesn’t have focus then the selection is hidden. |
| MultiSelect | False | If you want the user to have the ability to select more than one row then you would need to leave the property value as True but normally you would only want the user to be able to select one row. |
| View | Details | In order for the ListView to appear similar to the ListBox you need to change the view to Details as otherwise the items that you enter may appear as icons. |

Once you have set the ListView properties appropriately, then you will need to click on the arrow on the top right of the ListView control on your form and click on “Edit Columns”.

![Viewing the ListView's available tasks](https://samjenkins.com/wp-content/uploads/2010/08/listview-tasks.jpg "Viewing the ListView's available tasks")

You will then be presented with the following form, which allows for you to define the columns that will be in the ListView control.

![View the collection of column headers](https://samjenkins.com/wp-content/uploads/2010/08/columnheader-editor.jpg "View the collection of column headers")

When you click on “Add” you will be displayed the following. Change the “Text” property to the text that you wish to appear as the column header. If you wish to set the “Width” property then do so, but later I will talk about how to resize your columns to the appropriate width after you have inserted the data.

![Add a ColumnHeader](https://samjenkins.com/wp-content/uploads/2010/08/add-columnheader.jpg "Add a ColumnHeader")

Repeat this for each column that you wish to have in your ListView.

Now that you have dealt with having the appropriate columns we can now start thinking about inserting data into the ListView through our code. You can insert data into the ListView by doing something similar to the following;

```vbnet
Public Class Form1
    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        Dim arr(3) As String
        
        arr(0) = "Column 1 Line 1"
        arr(1) = "Column 2 Line 1"
        arr(2) = "Column 3 Line 1"
        arr(3) = "Column 4 Line 1"
        ListView1.Items.Add(New ListViewItem(arr))
        
        arr(0) = "Column 1 Line 2"
        arr(1) = "Column 2 Line 2"
        arr(2) = "Column 3 Line 2"
        arr(3) = "Column 4 Line 2"
        ListView1.Items.Add(New ListViewItem(arr))
        
        arr(0) = "Column 1 Line 3"
        arr(1) = "Column 2 Line 3"
        arr(2) = "Column 3 Line 3"
        arr(3) = "Column 4 Line 3"
        ListView1.Items.Add(New ListViewItem(arr))
        
        arr(0) = "Column 1 Line 4"
        arr(1) = "Column 2 Line 4"
        arr(2) = "Column 3 Line 4"
        arr(3) = "Column 4 Line 4"
        ListView1.Items.Add(New ListViewItem(arr))
        
        arr(0) = "Column 1 Line 5"
        arr(1) = "Column 2 Line 5"
        arr(2) = "Column 3 Line 5"
        arr(3) = "Column 4 Line 5"
        ListView1.Items.Add(New ListViewItem(arr))
    End Sub
End Class
```

You would probably be looping through some data set adding to the ListView but this shows you how you can add the data. Arr(0) is the first column, arr(1) is the second column, arr(2) is the third column and guess what arr(3) is the fourth column. The result of the above code is;

![Output 1](https://samjenkins.com/wp-content/uploads/2010/08/output-1.jpg "Output 1")

Now as you can see we have 4 columns with data in them, but each of the columns are wider than they need to be so how can we get it so that so that the columns are resized to be the appropriate width? They we can do this is by using the following code.

```vbnet
Private Sub autoSizeColumns(ByVal lstv As ListView)
    For Each c As ColumnHeader In lstv.Columns
        c.Width = -2
    Next
End Sub
```

Which gives you the following result;

![Output 2](https://samjenkins.com/wp-content/uploads/2010/08/output-2.jpg "Output 2")

There are two options when setting the width;

-2 Will look like what you have above. This is that each of the columns are resized to the width of the content of the column, but if you look at Column 4 you will notice that the width of the column has been set to the remainder of the ListView control.

-1 Will give you the form shown below. Again each of the columns are resized to the width of the content of the column and this time Column4 doesn’t extend for the rest of the ListView control.

![Output 3](https://samjenkins.com/wp-content/uploads/2010/08/output-3.jpg "Output 3")

**Sorting a column**

One thing that you find that you commonly want to do is to sort a column according to the content of the column.

In order to do this you will need to get the ListViewComparer class from [http://www.vb-helper.com/howto\_net\_listview\_sort\_clicked\_column.html](http://www.vb-helper.com/howto_net_listview_sort_clicked_column.html) and add it to your solution.

Once you have done this then you will need to add the private field that is specified in the latter half of the above webpage called m\_SortingColumn and implement the ColumnClick event for your ListView with the appropriate code again from the latter half of the above webpage.