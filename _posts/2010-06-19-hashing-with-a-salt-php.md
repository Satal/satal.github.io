---
title: 'Hashing with a salt in PHP'
date: '2010-06-19T11:48:15+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/19/hashing-with-a-salt-php/
    - /2010/06/19/hashing-with-a-salt-php/
permalink: /hashing-with-a-salt-php/
categories:
    - All
    - Computer
    - Programming
---

Heres a class I wrote a long time ago to come up with a simple way of ensuring that I used a common method for hashing passwords with salts in a particular way.

```php
<?php
    
    /**
     * clsHash
     *
     * @package 
     * @author Satal Keto
     * @copyright 2008
     * @version v1.00.001
     * @access public
     */
    class clsHash
    {
        /**
         * clsHash::hash()
         * This is a static function which hashes a string with a salt 
         *
         * @param String $salt, The salt for to be used for the hash
         * @param String $str, The string to be hashed
         * @return String, The hashed version of the string provided
         */
        public static function hash($salt, $str)
        {
            $str = $salt . $str;
            $hash = md5($str);
            $hash = $salt . $hash;
            $hash= md5($hash);
            return $hash;
        }
    }
?>
```