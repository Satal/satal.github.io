function generateQRCode() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const mobileNumber = document.getElementById('mobile-number').value.trim();
  const landlineNumber = document.getElementById('landline-number').value.trim();
  const email = document.getElementById('email').value.trim();
  const website = document.getElementById('website').value.trim();
  const organization = document.getElementById('organization').value.trim();
  const socialMedia1 = document.getElementById('social-media-1').value.trim();
  const socialMedia2 = document.getElementById('social-media-2').value.trim();

  let vcardData = 'BEGIN:VCARD\nVERSION:3.0';

  if (firstName) vcardData += `\nFN:${firstName} ${lastName}`;
  if (mobileNumber) vcardData += `\nTEL;TYPE=CELL:${mobileNumber}`;
  if (landlineNumber) vcardData += `\nTEL;TYPE=HOME:${landlineNumber}`;
  if (email) vcardData += `\nEMAIL:${email}`;
  if (organization) vcardData += `\nORG:${organization}`;
  if (website) vcardData += `\nURL:${website}`;
  if (socialMedia1) vcardData += `\nX-SOCIALPROFILE:${socialMedia1}`;
  if (socialMedia2) vcardData += `\nX-SOCIALPROFILE:${socialMedia2}`;

  vcardData += '\nEND:VCARD';

  const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: vcardData,
    width: 128,
    height: 128
  });
}
