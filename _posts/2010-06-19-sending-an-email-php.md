---
title: 'Sending an email in PHP'
date: '2010-06-19T11:52:55+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/19/sending-an-email-php/
    - /2010/06/19/sending-an-email-php/
permalink: /sending-an-email-php/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
---

This class was written to allow for me to send an email from PHP easily. The class allows for the message to be sent as either plain text or HTML.

```php
<?php

    /**
      * clsEmail
      *
      * @package 
      * @author Satal Keto
      * @copyright 2008
      * @version v1.00.001
      * @access public
      */
     class clsEmail
     {
         
         protected $to = Array();
         protected $fromName = "";
         protected $fromEmail = "";
         protected $subject = "";
         protected $message = "";
         protected $isHTML = false;
         
         public function setFromName($fromName)
         {
            $this->fromName = $fromName;
        }
        
        public function setFromEmail($fromEmail)
         {
            $this->fromEmail = $fromEmail;
        }
        
        public function setSubject($subject)
        {
            $this->subject = $subject;
        }
        
        public function setMessage($message)
        {
            $this->message = $message;
        }
        
        public function addTo($email)
        {
            array_push($this->to,$email);
        }
        
        public function setHTML($isHTML)
        {
            $this->isHTML = $isHTML;
        }
        
        public function sendMail()
        {
            if (count($this->to) > 0)
            {
                $i = 0;
                $to = "";
                while ($i < count($this->to))
                {
                    if ($to != "")
                    {
                        $to .= ", ";
                    }
                    $to .= $this->to[$i];
                    $i++;
                }
                
                $subject = $this->subject;
                $message = $this->message;
                $header = "";
                if ($this->isHTML)
                {
                    $header  = "MIME-Version: 1.0n";
                    $header .= "Content-type: text/html; charset=iso-8859-1n";
                }
                $header .= "From: " . $this->fromName . " <" . $this->fromEmail . ">n";
                $header .= "X-Mailer: PHP/" . phpversion();
                
                echo "To: " . $to . "<br />Subject: " . $subject . "<br />Message: ";
                echo $message . "<br />Headers: " . htmlentities($header);

                return mail($to,$subject,$message,$header);
            }
            else
            {
                return false;
            }
        }
     }
?>
```