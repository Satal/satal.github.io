---
layout: page
title: vCard Generator
permalink: /vcard-generator/
---

<div class="container">
    <h1 class="title">vCard to QR Code Generator</h1>
    <form id="vcardForm">
        <fieldset>
            <legend>Personal Information</legend>
            <label for="fn">Formatted Name:</label>
            <input type="text" id="fn" name="fn"><br>
            <label for="n">Name:</label>
            <input type="text" id="n" name="n" placeholder="Last,First,Middle,Prefix,Suffix"><br>
            <label for="nickname">Nickname:</label>
            <input type="text" id="nickname" name="nickname"><br>
            <label for="photo">Photo URL:</label>
            <input type="text" id="photo" name="photo"><br>
            <label for="bday">Birthday:</label>
            <input type="date" id="bday" name="bday"><br>
            <label for="anniversary">Anniversary:</label>
            <input type="date" id="anniversary" name="anniversary"><br>
            <label for="gender">Gender:</label>
            <input type="text" id="gender" name="gender"><br>
            <label for="adr">Address:</label>
            <input type="text" id="adr" name="adr" placeholder="Street,City,State,Postal Code,Country"><br>
            <label for="tel">Telephone:</label>
            <input type="text" id="tel" name="tel"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br>
            <label for="lang">Language:</label>
            <input type="text" id="lang" name="lang"><br>
            <label for="tz">Time Zone:</label>
            <input type="text" id="tz" name="tz"><br>
            <label for="geo">Geographic Coordinates:</label>
            <input type="text" id="geo" name="geo" placeholder="Latitude,Longitude"><br>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title"><br>
            <label for="role">Role:</label>
            <input type="text" id="role" name="role"><br>
            <label for="logo">Logo URL:</label>
            <input type="text" id="logo" name="logo"><br>
            <label for="org">Organization:</label>
            <input type="text" id="org" name="org"><br>
            <label for="categories">Categories:</label>
            <input type="text" id="categories" name="categories"><br>
            <label for="note">Note:</label>
            <input type="text" id="note" name="note"><br>
            <label for="url">URL:</label>
            <input type="url" id="url" name="url"><br>
            <label for="key">Public Key:</label>
            <input type="text" id="key" name="key"><br>
            <!-- Add more fields as needed -->
        </fieldset>
        <input type="button" value="Generate QR Code" onclick="generateQRCode()">
    </form>
    <div id="qrcode"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
    <script>
        function generateQRCode() {
            const form = document.getElementById('vcardForm');
            let vcardData = 'BEGIN:VCARD\nVERSION:3.0\n';
            const fields = [
                {id: 'fn', prefix: 'FN:'},
                {id: 'n', prefix: 'N:'},
                {id: 'nickname', prefix: 'NICKNAME:'},
                {id: 'photo', prefix: 'PHOTO;VALUE=uri:'},
                {id: 'bday', prefix: 'BDAY:'},
                {id: 'anniversary', prefix: 'ANNIVERSARY:'},
                {id: 'gender', prefix: 'GENDER:'},
                {id: 'adr', prefix: 'ADR;TYPE=home:'},
                {id: 'tel', prefix: 'TEL;TYPE=cell:'},
                {id: 'email', prefix: 'EMAIL;TYPE=internet:'},
                {id: 'lang', prefix: 'LANG:'},
                {id: 'tz', prefix: 'TZ:'},
                {id: 'geo', prefix: 'GEO:'},
                {id: 'title', prefix: 'TITLE:'},
                {id: 'role', prefix: 'ROLE:'},
                {id: 'logo', prefix: 'LOGO;VALUE=uri:'},
                {id: 'org', prefix: 'ORG:'},
                {id: 'categories', prefix: 'CATEGORIES:'},
                {id: 'note', prefix: 'NOTE:'},
                {id: 'url', prefix: 'URL:'},
                {id: 'key', prefix: 'KEY:'},
                // Add more fields mapping here
            ];

            fields.forEach(field => {
                if (form[field.id].value) {
                    vcardData += field.prefix + form[field.id].value + '\n';
                }
            });

            vcardData += 'END:VCARD';

            // Clear previous QR code
            const qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';

            // Generate new QR code
            new QRCode(qrContainer, {
                text: vcardData,
                width: 256,
                height: 256,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
    </script>