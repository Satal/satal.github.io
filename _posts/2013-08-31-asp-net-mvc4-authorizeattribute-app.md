---
id: 494
title: 'ASP.NET MVC4 AuthorizeAttribute throughout app'
date: '2013-08-31T20:48:10+00:00'
author: Satal

guid: 'http://satalketo.com/?p=494'
redirect_from:
    - /blog/2013/08/31/asp-net-mvc4-authorizeattribute-app/
    - /2013/08/31/asp-net-mvc4-authorizeattribute-app/
permalink: /asp-net-mvc4-authorizeattribute-app/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'How to apply the AuthorizeAttribute to all actions within your ASP.NET MVC 4 web application, while white listing specific actions for anonymous access'
rank_math_focus_keyword:
    - AuthorizeAttribute
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '117'
image: /wp-content/uploads/2013/08/Access-control-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Security
tags:
    - ASP.NET
    - 'C#'
    - 'Computer Security'
    - Microsoft
    - MVC
---

If you’re developing a website where there should only be a couple of publicly accessible pages in ASP.NET MVC, then at first you may try to go through all your controllers decorating them with the AuthorizeAttribute. Although you will still want to allow anonymous users access to the login page otherwise anonymous users can never become logged in users, in MVC4 you can specify that you want to allow anonymous access to a particular action within a controller which requires the users be logged in by the decorating the actions that you want to be publicly accessible with the AllowAnonymousAttribute

![Control access to your webpages with the AuthorizeAttribute](/assets/images/2013/08/Access-control.jpg)

Nice and simple right? Well, what happens when another developer comes onto the team and creates a new controller without decorating it with the AuthorizeAttribute? I’ve dealt with this before by creating a unit test which checks that all actions in an application have the AuthorizeAttribute applied to them either through the controller or directly, I can already hear the unit test purists weeping at my abuse of unit tests, but it worked.

But what works better is by having a system that automatically makes all actions have the AuthorizeAttribute applied to it unless you specifically apply the AllowAnonymouseAttribute. As we know whitelisting will always trump blacklisting when it comes to security, so this method will allow you to feel a little more at ease about there not being any unwanted anonymous access. The way that we can achieve this is by going to the FilterConfig class in the App\_Start directory of your ASP.NET MVC 4 application.

![FilterConfig in the App_Start folder of your solution](/assets/images/2013/08/2013-08-31-21_42_39-TwoFactorAuthentication-Microsoft-Visual-Studio.png)

Within the FilterConfig.cs class, we want to add a new filter for the AuthorizeAttribute as below.

```csharp
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AuthorizeAttribute());
        }
    }
```

Once this is done, you’re good to go! That’s it, seriously. The only thing you’ll want to do is go through and apply the AllowAnonymousAttribute to all the actions that you want anonymous users to be able to access, although if you’ve started your project from the ASP.NET 4 Internet template your Register and Login actions will already be set up and ready to go.

```csharp
    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public ActionResult Login(LoginModel model, string returnUrl)
    {
        // Do your stuff here
    }
```