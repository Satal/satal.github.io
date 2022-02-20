---
id: 76
title: 'How to log into a website from VB.Net'
date: '2010-07-28T23:54:04+00:00'
author: Satal

guid: 'http://satalketo.com/2010/07/how-to-log-into-a-website-from-vbnet/'
redirect_from:
    - /blog/2010/07/28/log-into-a-website-from-vbnet/
    - /2010/07/28/log-into-a-website-from-vbnet/
permalink: /log-into-a-website-from-vbnet/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '160'
image: /wp-content/uploads/2010/07/formlayout-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

Something that seems to get asked at least 3 times a day in the forums that I hang around on is how to get their application to be able to log into a specific website. This is something that is fairly easily done under the right circumstances.

For this example I am going to get my application to log into the [VB Forums](http://www.vbforums.com) website. There is no particular reason why I have chosen this website it just happened to be a website I had open at the time.

The first thing we need to go is set up our form, you will need to add the following controls to Form1

- Two textboxes, called txtUsername and txtPassword (no prizes for guessing what these are going to be used for)
- One button, called btnLogin
- One WebBrowser control, I just left the default name for this so the name was WebBrowser1

I did some docking and other stuff to make my form look pretty but you don’t need to do this if you don’t want to. This is what my form looked like once I had added all the controls;

![](/assets/images/2010/07/formlayout.jpg)

Now for some of the good stuff, double click on the form header to get yourself to the code screen with the Form\_Load event created. In the Form1\_Load event we want to add the following code;

```vbnet
WebBrowser1.Navigate("http://www.vbforums.com/")
```

What this code does is tell the WebBrowser control to go to the address that we have specified. At the moment we are going to manually enter the username and password into the textboxes and click the Login button when the page has finished loading, although later we will briefly look at how to automatically log into the website when the page has finished loading.

In order to do the next bit we need to know the id’s for the “User name” and “Password” fields on the website, so we need to look at the HTML for the website. In our case the following snippet contains all the information we need;

```html
<tr>
    <td class="smallfont" style="white-space: nowrap;">
        <label for="navbar_username">User Name</label>
    </td>
    <td>
        <input type="text" class="bginput" style="font-size: 11px" name="vb_login_username" id="navbar_username" size="10" accesskey="u" tabindex="101" value="User Name" onfocus="if (this.value == 'User Name') this.value = '';" />
    </td>
    <td class="smallfont" nowrap="nowrap">
        <label for="cb_cookieuser_navbar">
            <input type="checkbox" name="cookieuser" value="1" tabindex="103" id="cb_cookieuser_navbar" accesskey="c" />
            Remember Me?
        </label>
    </td>
</tr>
<tr>
    <td class="smallfont"><label for="navbar_password">Password</label></td>
    <td><input type="password" class="bginput" style="font-size: 11px" name="vb_login_password" id="navbar_password" size="10" tabindex="102" /></td>
    <td><input type="submit" class="button" value="Log in" tabindex="104" title="Enter your username and password in the boxes provided to login, or click the 'register' button to create a profile for yourself." accesskey="s" /></td>
</tr>
```

As you can see from the snippet of HTML above, the id for the user name field is “navbar\_username” and the id for the password field is “navbar\_password”. We will need to make note of that for the next bit.

Double click on the button on the form to give us the btnLogin\_Click event, what we need to do now is put our user name and password in the appropriate fields in the website we do this with the following code;

```vbnet
WebBrowser1.Document.GetElementById("[the id of the element we want]").SetAttribute("value", "[the value we want the element to contain]")
```

But there is no point filling in our details if we are not going to submit the form, which can be done with the following code;

```vbnet
WebBrowser1.Document.Forms([the index of the form to be submitted]).InvokeMember("submit")
```

Now we have all the code for the btnLogin\_Click event, the code that I had was as follows, I have set the id’s for the user name and password appropriately and have specified to get the value from txtUsername.Text and txtPassword.Text, I also set the form index to 0 as it was the first form on the web page.

```vbnet
Private Sub btnLogin_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnLogin.Click
    WebBrowser1.Document.GetElementById("navbar_username").SetAttribute("value", txtUsername.Text)
    WebBrowser1.Document.GetElementById("navbar_password").SetAttribute("value", txtPassword.Text)
    WebBrowser1.Document.Forms(0).InvokeMember("submit")
End Sub
```

Now try that out, that should now allow for you to login to the website by entering your user name and password in the textboxes provided on your form. The one problem with this is that it still requires you to wait until the web page is finished loading and then you click on the button to log yourself in. If you’re able to store the user name and password to be used when logging in somewhere you can automate this system as follows. The WebBrowser1\_DocumetCompleted event is the event that is raised when the WebBrowser control has finished downloading the web page.

```vbnet
Private Sub WebBrowser1_DocumentCompleted(ByVal sender As Object, ByVal e As System.Windows.Forms.WebBrowserDocumentCompletedEventArgs) Handles WebBrowser1.DocumentCompleted
    WebBrowser1.Document.GetElementById("navbar_username").SetAttribute("value", "Satal Keto")
    WebBrowser1.Document.GetElementById("navbar_password").SetAttribute("value", "My super duper secret password")
    WebBrowser1.Document.Forms(0).InvokeMember("submit")
End Sub
```

Anyway hopefully that has provided you with enough information to be able to go out and login to websites from your VB.Net applications.