---
id: 57
title: 'Generate a random string in PHP'
date: '2010-06-19T11:57:53+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/generate-a-random-string/'
redirect_from:
    - /blog/2010/06/19/generate-a-random-string-php/
    - /2010/06/19/generate-a-random-string-php/
permalink: /generate-a-random-string-php/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '173'
categories:
    - All
    - Computer
    - Programming
tags:
    - String
---

I created this class primarily to generate random salts for passwords, but it can be used quite easily to create random strings of any length that you specify.

```php
<?php
    /**
     * clsSalt
     *
     * @package 
     * @author Satal Keto
     * @copyright 2008
     * @version v1.00.002
     * @access public
     */
    class clsSalt
    {
        /**
         * clsSalt::generateSalt()
         * A static function which generates salt's   
         *
         * @param Integer $saltLen
         * @return String, The salt which was requested
         */
        public static function generateSalt($saltLen = 32)
        {
            $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`¬¦!"£$%^&*()-_=+[{}]#~;:'@,<.>/?\";
            srand((double)microtime()*1000000);
            $i = 0;
            $salt = '' ;
            //Because $i is 0 we use < rather than <= as otherwise we would get $saltLen + 1
            while ($i < $saltLen)
            {
                $num = rand() % strlen($chars);
                $char = substr($chars, $num, 1);
                $salt = $salt . $char;
                $i++;
            }
            return $salt;
        }
    }
?>
```