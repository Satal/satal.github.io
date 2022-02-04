---
id: 625
title: 'Logging SQL Queries in MVC With Entity Framework 6'
date: '2013-12-05T07:16:40+00:00'
author: Satal

guid: 'http://satalketo.com/?p=625'
permalink: /blog/2013/12/05/logging-sql-queries-mvc/
snap_isAutoPosted:
    - '1'
snapFB:
    - 's:274:"a:1:{i:0;a:9:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
snapLI:
    - 's:286:"a:1:{i:0;a:9:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
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
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '110'
image: /wp-content/uploads/2013/12/Entity-Framework-Logo-1.png
categories:
    - All
    - Computer
    - Programming
tags:
    - ASP.NET
    - 'C#'
    - 'Entity Framework'
    - MVC
    - Programming
---

As developers we’re inclined to want to understand what is happening under the hood or at least know that we can check if we wanted to. This is the case with Entity Framework, which performs some magic to provide access to a database and allowing us to perform actions against it. While 99% of the time we are more than happy to treat Entity Framework as a black box, sometimes we like to look under the covers and see what the Entity Framework is doing. In this article I will show you how to log the SQL queries that are being performed by the Entity Framework in an ASP.NET MVC application.

[![Entity Framework Logo](https://samjenkins.com/wp-content/uploads/2013/12/Entity-Framework-Logo.png)](http://msdn.microsoft.com/en-gb/data/ef.aspx)

## What is Entity Framework?

[Entity Framework](http://msdn.microsoft.com/en-gb/data/ef.aspx "Entity Framework Homepage") is an open source (as of version 6) object relational mapping framework provided by Microsoft as part of the .NET Framework. The idea behind Entity Framework is to produce a level of abstraction between the database and the objects that the developer interacts with, allowing for developers to ignore the mapping of tables to classes.

## Why do we want to log?

In this article we will be covering how to create a log that will store the SQL query performed, the amount of time that it took to run and any exceptios that occurred because of it. This will allow us to identify particularly slow running queries, which in turn will allow us to focus our efforts when we are looking at optimising our website.

## Is this dependant on a particular logging framework

While not quite as passionate as the OS wars some people are very precious about their choice of logging framework and would likely close this article immediately if I suggested that they needed to use an alternative, so to keep my readership up and as I’m such a nice guy this article is logging framework agnostic. I have purposefully chosen to work against a dummy logging framework that simply outputs the logged information to the debug window to demonstrate the functionality, so feel free to swap in your logging framework of choice.

## Introducing the DbCommandInterceptor

The Entity Framework provides us with the ability to log by inheriting from the DbCommandInterceptor class, this provides us with the capability to, as the name would suggest, intercept the database command before it is performed against the database as well as being informed after the database command has been executed.

This capability is provided by overriding some of the DbCommandInterceptor’s methods, which are broken into two types;

1. **Executing methods** – For executing the command, by not passing the command through to the base DbCommandInterceptor from your inherited type you can avoid the specified command being performed against the database.
2. **Executed methods** – For when the command has been executed already allowing you to inspect the result before it is passed back to the calling method.

These methods are provided for each of the command methods;

- **NonQuery** – For a command that is not intended to retrieve data from the database (inserts and updates).
- **Reader** – For a command that is intended to retrieve a data reader allowing for the result set to be examined (i.e. select \* from users)
- **Scalar** – For a command that is intended to retrieve a single value from the database (i.e. select count(\*) from users).

## The DbCommmandInterceptor

```csharp
using System;
using System.Data.Entity.Infrastructure.Interception;
using System.Diagnostics;

namespace PersonalBestBB.DAL
{
    public class Pb3SqlLogger : DbCommandInterceptor
    {
        private ILogger _logger = new Logger();
        private delegate void ExecutingMethod<T>(System.Data.Common.DbCommand command, DbCommandInterceptionContext<T> interceptionContext);

        public override void NonQueryExecuting(System.Data.Common.DbCommand command, DbCommandInterceptionContext<int> interceptionContext)
        {
            CommandExecuting<int>(base.NonQueryExecuting, command, interceptionContext);
        }

        public override void ReaderExecuting(System.Data.Common.DbCommand command, DbCommandInterceptionContext<System.Data.Common.DbDataReader> interceptionContext)
        {
            CommandExecuting<System.Data.Common.DbDataReader>(base.ReaderExecuting, command, interceptionContext);
        }

        public override void ScalarExecuting(System.Data.Common.DbCommand command, DbCommandInterceptionContext<object> interceptionContext)
        {
            CommandExecuting<object>(base.ScalarExecuting, command, interceptionContext);
        }

        private void CommandExecuting<T>(ExecutingMethod<T> executingMethod, System.Data.Common.DbCommand command, DbCommandInterceptionContext<T> interceptionContext)
        {
            Stopwatch sw = Stopwatch.StartNew();
            executingMethod.Invoke(command, interceptionContext);
            sw.Stop();

            if (interceptionContext.Exception != null)
            {
                _logger.Error(interceptionContext.Exception, String.Format("Error executing command: {0}", command.CommandText));
            }
            else
            {
                _logger.Information(String.Format("{0} took {1}", command.CommandText, sw.Elapsed.ToString()));
            }
        }
    }
}
```

In the code above we have the three DbCommandInterceptor Executing methods overridden each of these calling into a single method, that deals with the execution of the command and logging of the results to our ILogger. As each of the overridden methods were basically performing the same actions apart from the base method to call this was refactored out using a delegate for specifying the base method to call.

The logging method uses the [Stopwatch ](http://msdn.microsoft.com/en-us/library/system.diagnostics.stopwatch(v=vs.110).aspx "Stopwatch Class MSDN Documentation")class to track how long the method takes to perform. If an exception were to occur during the execution of the database command then the interceptionContext Exception property shall contain this exception, if an exception occurred then we want to log an Error with the logger otherwise an Information entry shall suffice.

This is where you would swap in your logging framework of choice, calling the appropriate methods in place of the ones I have chosen.

## Configuring Entity Framework to use our interceptor

Now that we have the interceptor all set up we need to configure our system to use it. This can be achieved by added a single call to our Application\_Start() method in the Global.asax.

```csharp
protected void Application_Start()
{
    AreaRegistration.RegisterAllAreas();
    GlobalConfiguration.Configure(WebApiConfig.Register);
    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
    RouteConfig.RegisterRoutes(RouteTable.Routes);
    BundleConfig.RegisterBundles(BundleTable.Bundles);

    DbInterception.Add(new Pb3SqlLogger());
}
```

## The result

Our interceptor is all configured and ready to go, so all that remains is to run the application and look at the output.

[![Logging output](https://samjenkins.com/wp-content/uploads/2013/12/Logging-output.png)](https://samjenkins.com/wp-content/uploads/2013/12/Logging-output.png)

As you can see above, the SQL query is output to the logger, which in my case just writes the output to the debug window.

## Conclusion

Hopefully, this simple demonstration has shown you how to use the DbCommandInterceptor for viewing information about the DbCommands that are being performed by the Entity Framework. The DbCommandInterceptor can also be used to inject exceptions into the DbCommand result, allowing you to test your applications resilience to database exceptions occurring, but that is the subject for another article.