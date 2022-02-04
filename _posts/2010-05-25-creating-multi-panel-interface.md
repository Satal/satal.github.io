---
id: 30
title: 'Creating multi panel interface easily'
date: '2010-05-25T21:39:45+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/creating-multi-panel-interface-easily/'
permalink: /blog/2010/05/25/creating-multi-panel-interface/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '189'
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
    - WinForms
---

So if you’re like me you want to produce applications which look as professional as possible. One way that we do this is to use many  
different panels to display the different pages of content on one form.

In this article I will discuss one method of making this process easier at development time.

The method that I am now using is to have a TabControl docked in my form. Then for each of the different panels/pages I want I put it on a different tab. Then as you would with any application, you deal with the anchoring and the dockings for each of the controls within that TabPage.

Once you have done this you may notice that we still have the tabs showing at the top of the form at runtime and this is definitely not something that we want our users being able to see, so in order to deal with this we need to add the following code to the Form\_Load method.

```vbnet
TabControl1.Appearance = TabAppearance.Buttons
TabControl1.SizeMode = TabSizeMode.Fixed
TabControl1.ItemSize = New Drawing.Size(0,1)
```

What this code does it make the tabs 1 pixel tall and 0 pixels wide, which means that no one will be able to see them.

Once you have this code in place the user is no longer able to navigate through your application by clicking on the tabs, which is great but now we don’t have any way of navigating between the tabs. The code that we need in order to be able to switch between the tabs is;

```vbnet
TabControl1.SelectedTab = TabPage1
```

I would suggest that you go through and set all the TabPages to have meaningful names as you would any other control in your application.

Now that we have finished that if you run your application again you can not see the tabs and will have some method of navigating through the tabs according to what you want to view.

The only problem that I have found with this technique is that although the users can’t see the other tabs if they was to press Ctrl+Tab then they would be able to navigate through the different tabs like that. I currently haven’t been able to find a way of stopping this from happening but if I do find a way of doing this then I will update this with the new information. Of course if you know how I could stop this from happening then feel free to let me know and I’ll ensure that you’re acknowledged.