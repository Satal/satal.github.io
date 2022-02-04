---
id: 55
title: 'Hashing with a salt in PHP'
date: '2010-06-19T11:48:15+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/hashing-with-a-salt/'
permalink: /blog/2010/06/19/hashing-with-a-salt-php/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '175'
categories:
    - All
    - Computer
    - Programming
---

Heres a class I wrote a long time ago to come up with a simple way of ensuring that I used a common method for hashing passwords with salts in a particular way.

```
<pre class="brush: php; gutter: true"><?php
    
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