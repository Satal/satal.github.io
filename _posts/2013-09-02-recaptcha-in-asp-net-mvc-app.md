---
id: 502
title: 'Using reCAPTCHA in your ASP.NET MVC app'
date: '2013-09-02T06:35:11+00:00'
author: Satal

guid: 'http://satalketo.com/?p=502'
permalink: /blog/2013/09/02/recaptcha-in-asp-net-mvc-app/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapEdIT:
    - '1'
snapTW:
    - 's:142:"a:1:{i:0;a:5:{s:4:"doTW";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'A demonstration of how to reduce the risk of bots using reCAPTCHA on the registation form for an ASP.NET MVC app.'
rank_math_focus_keyword:
    - recaptcha
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '116'
categories:
    - All
    - Computer
    - Programming
tags:
    - ASP.NET
    - 'C#'
    - Microsoft
    - MVC
---

The Internet is full of bots. There’s no denying it, bots have been created to perform tasks on the Internet for many purposes, a good example is Ticketmaster, who have calculated that approximately 60% of all bookings are made by bots ([src nyt](http://www.nytimes.com/2013/05/27/business/media/bots-that-siphon-off-tickets-frustrate-concert-promoters.html?pagewanted=all&_r=1& "Concert Industry Struggles With ‘Bots’ That Siphon Off Tickets")).

![Example of a reCAPTCHA](https://samjenkins.com/wp-content/uploads/2013/09/recaptcha-example-1.png)

One of the most common practices for fighting back against bots is by adding what is known as a ‘Completely Automated Public Turing test to tell Computers and Humans Apart’ or CAPTCHA for short. These are commonly either an image or audio clip with letters and numbers that the user has to type into the computer to prove that they are human. One of the most popular versions of the CAPTCHA is [reCAPTCHA](http://www.google.com/recaptcha "reCaptcha"), which is provided free of charge by Google, this is what we will be using to add a CAPTCHA to our registration page, to avoid bots registering for our website.

The first thing that you’re going to need to do is retrieve your public and private keys from [reCAPTCHA](https://www.google.com/recaptcha/admin/list "My reCAPTCHA Sites"), Google have made this incredibly simple, just a case of specifying your domain and whether you would like to limit the keys to just that site. The public and private keys should look something like this;

**Public Key:** 6LeM4uYSAAAAAOHr4C2VuYjQ12jMEkxFhZ7iO2qY  
**Private Key:** 6LeM4uYSAAAAAJUEXgVNfTHTc32w-aqQ1CbIIpp-

You will need to keep these details safe for later (although you can always go back to the website to retrieve them again).

Now lets go to our ASP.NET MVC application, the first thing that we need to do is to add a NuGet package called ‘reCAPTCHA for .NET’

![reCAPTCHA for NET](https://samjenkins.com/wp-content/uploads/2013/09/reCAPTCHA-for-NET.png)

One of the things that will happen during the installation of ‘reCAPTCHA for .NET’ is that two entries will be added to the web.config, one called ‘recaptchaPublicKey’ and the other called ‘recaptchaPrivateKey’ can you guess what we are supposed to put in there? Using the details from before put the public key in ‘recaptchaPublicKey’ and put the private key in ‘recaptchaPrivateKey’ entries. That is all the configuration the ‘reCAPTCHA for .NET’ requires, all we have to do now is put the code into our application.

The first change that we make is to view for /AccountController/Register. We will need to add

```
<pre class="brush: csharp; gutter: true; first-line: 1; highlight: []; html-script: false">@using Recaptcha.Web.Mvc
```

to the top of the view, this will allow us to access the reCAPTCHA helper method. Once we have done that we need to make a single modification to the registration form, we just need to add

```
<pre class="brush: csharp; gutter: true; first-line: 1; highlight: []; html-script: false">@Html.Recaptcha()
```

, personally I added it in a new list item after the confirmation password, which meant my registration form looked like this;

```
<pre class="brush: csharp; gutter: true; first-line: 1; highlight: []; html-script: false">@using (Html.BeginForm()) {
    @Html.AntiForgeryToken()
    @Html.ValidationSummary()

    <fieldset>
        <legend>Registration Form</legend>
        <ol>
            <li>
                @Html.LabelFor(m => m.UserName)
                @Html.TextBoxFor(m => m.UserName)
            </li>
            <li>
                @Html.LabelFor(m => m.Password)
                @Html.PasswordFor(m => m.Password)
            </li>
            <li>
                @Html.LabelFor(m => m.ConfirmPassword)
                @Html.PasswordFor(m => m.ConfirmPassword)
            </li>
            <li>
                @Html.Recaptcha()
            </li>
        </ol>
        <input type="submit" value="Register" />
    </fieldset>
}
```

If you go to the registration page now you will be greeted with the standard registration form and the new reCAPTCHA section, although it isn’t working yet as we haven’t updated the Register action to validate the submitted value. So lets open the AccountController and go down to the HttpPost Register action (the one that actually performs the registration). We will need to add the following code to the action to validate that the user has entered the correct characters.

```
<pre class="brush: csharp; gutter: true; first-line: 1; highlight: []; html-script: false">var recaptchaHelper = this.GetRecaptchaVerificationHelper();
if (String.IsNullOrEmpty(recaptchaHelper.Response))
{
	ModelState.AddModelError("", "Captcha answer cannot be empty");
	return View(model);
}

var recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();
if (recaptchaResult != RecaptchaVerificationResult.Success)
{
	ModelState.AddModelError("", "Incorrect captcha answer");
	return View(model);
}
```

What this is doing is checking that the user specified a value, showing them an error if they didn’t and then verifying that the response to the CAPTCHA was correct. This needs to be placed after we have confirmed that the ModeState is valid but before we actually register the user, which will leave your registration action looking like this;

```
<pre class="brush: csharp; gutter: true; first-line: 1; highlight: []; html-script: false">[HttpPost]
[AllowAnonymous]
[ValidateAntiForgeryToken]
public ActionResult Register(RegisterModel model)
{
	if (ModelState.IsValid)
	{
		var recaptchaHelper = this.GetRecaptchaVerificationHelper();

		if (String.IsNullOrEmpty(recaptchaHelper.Response))
		{
			ModelState.AddModelError("", "Captcha answer cannot be empty");
			return View(model);
		}

		var recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();

		if (recaptchaResult != RecaptchaVerificationResult.Success)
		{
			ModelState.AddModelError("", "Incorrect captcha answer");
			return View(model);
		}

		// Attempt to register the user
		try
		{
			WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
			WebSecurity.Login(model.UserName, model.Password);
			return RedirectToAction("Index", "Home");
		}
		catch (MembershipCreateUserException e)
		{
			ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
		}
	}

	// If we got this far, something failed, redisplay form
	return View(model);
}
```

And that is it! Now you can run your app and you should be greeted by something similar to the following

![Complete registration form](https://samjenkins.com/wp-content/uploads/2013/09/Complete-registration-form.png)