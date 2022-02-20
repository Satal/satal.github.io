---
id: 803
title: 'Creating dynamic sub-menu in Excel'
date: '2017-03-04T15:54:52+00:00'
author: Satal

guid: 'https://satalketo.com/?p=803'
redirect_from:
    - /blog/2017/03/04/creating-dynamic-sub-menu-excel/
    - /2017/03/04/creating-dynamic-sub-menu-excel/
permalink: /creating-dynamic-sub-menu-excel/
snap_isAutoPosted:
    - '1'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:408:"a:1:{i:0;a:11:{s:2:"do";s:1:"1";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"838060768872566785";s:7:"postURL";s:55:"https://twitter.com/SatalKeto/status/838060768872566785";s:5:"pDate";s:19:"2017-03-04 16:17:12";}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - ''
rank_math_description:
    - 'In this post, we will create a dynamic sub-menu in Excel, which will provide different options based on the choice made in the first drop down list.'
rank_math_focus_keyword:
    - 'Dynamic Sub-Menu'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '104'
image: /wp-content/uploads/2017/02/Excel-Dynamic-Sub-Menu-Final-Drop-Downs-1.png
categories:
    - Excel
tags:
    - Excel
    - 'How To'
---

Excel is a powerful tool and has a lot of opportunities that people aren’t aware of. In this post, I’m going to talk about one of these, the ability to easily make a dynamic sub-menu.

## The Example

We are going to make a simple look up, which when you specify a country will give you a list of major cities. For this example, we are only going to use five countries and ten cities in each. If we were doing this for all countries and all cities we might choose to use a different method.

### Creating the data for the dynamic sub-menu

The first thing we are going to do is create six tables, one table for the names of the countries and one table for each of the countries. In my case, I have chosen Belgium, Croatia, Italy, Spain and the UK, and Googled a list of ten cities in each of them.![The tables for the dynamic sub-menu](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Tables.png)

You’ll notice for I have made the column header for each table to be a description of what the table contains. This is just for clarify. Depending on how clear you like your references to be, you could also go ahead and specify a name for each of the tables by going into Table Tools &gt; Design, then updating the Table Name. It is important that you don’t name any of the tables just their country name, you’ll see why later. Instead, I would suggest something like UKCities.

![Changing the table name](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Changing-Table-Name.png)

### Creating the named ranges

When we are creating the drop down lists we will need to use named ranges to specify the information that should be displayed. You cannot specify a table as the Data Validation source, therefore we need to use a named range.

To define a new named range we can go to the Formulas tab and click on the Define Name button.

![](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Define-Name.png)

This will then give us a pop-up where we specify the name of the named range and what cells it refers to. You will need to type in the table name and column as selecting the cells will give you absolute references.

![Add new named range](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-New-Named-Range.png)

We now have our countries named range created and can create the first of the two drop downs. This can easily be achieved by selecting the cell you wish to add the drop down to and selecting the Data Validation button in the Data tab.

![Data Validation Button](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Data-Validation-Button.png)

Once you’ve opened up the Data Validation box, you’ll need to change the Allow type to List. This will then allow you to specify the source for the drop down list, in our case, it’s going to be the Countries named range.

![Creating the countries menu](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Countries-Data-Validation.png)

Once you’ve done that you will have the following:

![Country drop down list](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Country-Drop-Down.png)

Now for the dynamic sub-menu part of this, for this, we are going to use the INDIRECT function. What the INDIRECT function does is allow you to specify a cell or range through text. In our case, we are going to take each of the country names and turn them into a named range for their cities.

To achieve this we just need to follow the steps above, creating a named range called UK for the table of UK Cities.

![UK Cities named range](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-UK-Cities.png)

Once we have done that for all of the sub-lists we can then create the drop down list for the cities. For clarity, I have changed the name of the country cell to SELECTED\_COUNRTY, though you don’t need to do this. We then add data validation to the Cities cell using the formula

```
=INDIRECT(SELECTED_COUNTRY)
```

Which will look like this.

![Data Validation for the dynamic sub-menu](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Sub-Menu.png)

When you click on OK, you might get a warning that this formula gives an error, that is fine and to be expected. What is causing this is that there currently isn’t a country selected. Your users won’t be shown this.

We are now complete, if you select one of the countries then the options available in the city cell will be those specified in the corresponding table. If you add an item to the table it will automatically be added without having to worry about changing the named range.

![](/assets/images/2017/02/Excel-Dynamic-Sub-Menu-Final-Drop-Downs.png)

## Why I chose to use Tables

It is possible for you to create named ranges within using tables but I have chosen to use them for a few reasons:

- You can add new items without worrying about the size of the named range;
- You can easily sort them; and,
- Personal preference but I like that they have clearly defined areas, where all content within them is related to the one subject.