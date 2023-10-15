---
title: Create a VCard QR Code
date: '2023-10-07T11:00:11+00:00'

permalink: /create-vcard-qr-code/
author: Satal

tags:
  - networking
  - vCard
---


<div id="vcard-form">
  <label for="first-name">First Name:</label>
  <input type="text" id="first-name" placeholder="John"><br>

  <label for="last-name">Last Name:</label>
  <input type="text" id="last-name" placeholder="Doe"><br>

  <label for="mobile-number">Mobile Number:</label>
  <input type="text" id="mobile-number" placeholder="123-456-7890"><br>

  <label for="landline-number">Landline Number:</label>
  <input type="text" id="landline-number" placeholder="987-654-3210"><br>

  <label for="email">Email:</label>
  <input type="text" id="email" placeholder="john.doe@example.com"><br>

  <label for="website">Website:</label>
  <input type="text" id="website" placeholder="https://example.com"><br>

  <label for="organization">Organization Name:</label>
  <input type="text" id="organization" placeholder="XYZ Corp"><br>

  <label for="social-media">Social Media Profiles:</label>
  <input type="text" id="social-media-1" placeholder="LinkedIn Profile"><br>
  <input type="text" id="social-media-2" placeholder="Twitter Profile"><br>

  <button onclick="generateQRCode()">Generate QR Code</button>
</div>

<div id="qrcode"></div>

<script>
  function loadScript(url, callback){
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Load QRCode library and call generateQRCode after loading
  loadScript("https://cdn.jsdelivr.net/gh/kazuhikoarase/qrcode-generator/js/qrcode.js", function(){
    // This function will be called after the script is loaded
    generateQRCode();
  });
</script>

<!-- <script src="https://cdn.jsdelivr.net/gh/kazuhikoarase/qrcode-generator/js/qrcode.js"></script> -->
<script src="/assets/qr-script.js"></script>
