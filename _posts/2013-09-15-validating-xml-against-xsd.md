---
id: 560
title: 'Validating XML against XSD schemas in C#'
date: '2013-09-15T18:50:55+00:00'
author: Satal

guid: 'http://satalketo.com/?p=560'
permalink: /blog/2013/09/15/validating-xml-against-xsd/
snapLI:
    - 's:478:"a:1:{i:0;a:12:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:27:"New post  - %TITLE% (%URL%)";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:123:"http://www.linkedin.com/updates?discuss=&amp;scope=25932443&amp;stype=M&amp;topic=5785082122888818688&amp;type=U&amp;a=Ac66";s:5:"pDate";s:19:"2013-09-15 18:50:59";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_isAutoPosted:
    - '1'
snapFB:
    - 's:350:"a:1:{i:0;a:12:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:18:"New post - %TITLE%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:27:"605595058_10151566215040059";s:5:"pDate";s:19:"2013-09-15 18:50:59";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
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
rank_math_description:
    - 'A helper class for performing XSD validation on XML, written in C#'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '114'
image: /wp-content/uploads/2013/09/654px-Text-xml.svg_-1.png
categories:
    - All
    - Computer
    - Programming
tags:
    - 'C#'
    - XML
---

I’m currently working on an XML File Explorer application, which I intend on highlighting XML files which do not conform to an XSD schema, as part of this I have created a class for containing the details of performing XSD validation against an XML document, which I thought I would share with you (although the XML File Explorer will be open source).

```
<pre class="brush: csharp; gutter: true">using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Schema;

namespace KetoLibrary.Xml
{
    public class XsdValidator
    {
        public List<XmlSchema> Schemas { get; set; }
        public List<String> Errors { get; set; }
        public List<String> Warnings { get; set; }

        public XsdValidator()
        {
            Schemas = new List<XmlSchema>();
        }

        /// <summary>
        /// Add a schema to be used during the validation of the XML document
        /// </summary>
        /// <param name="schemaFileLocation">The file path for the XSD schema file to be added for validation</param>
        /// <returns>True if the schema file was successfully loaded, else false (if false, view Errors/Warnings for reason why)</returns>
        public bool AddSchema(string schemaFileLocation)
        {
            if (String.IsNullOrEmpty(schemaFileLocation)) return false;
            if (!File.Exists(schemaFileLocation)) return false;

            // Reset the Error/Warning collections
            Errors = new List<string>();
            Warnings = new List<string>();

            XmlSchema schema;

            using (var fs = File.OpenRead(schemaFileLocation))
            {
                schema = XmlSchema.Read(fs, ValidationEventHandler);
            }

            var isValid = !Errors.Any() && !Warnings.Any();

            if (isValid)
            {
                Schemas.Add(schema);
            }

            return isValid;
        }

        /// <summary>
        /// Perform the XSD validation against the specified XML document
        /// </summary>
        /// <param name="xmlLocation">The full file path of the file to be validated</param>
        /// <returns>True if the XML file conforms to the schemas, else false</returns>
        public bool IsValid(string xmlLocation)
        {
            if (!File.Exists(xmlLocation))
            {
                throw new FileNotFoundException("The specified XML file does not exist", xmlLocation);
            }

            using (var xmlStream = File.OpenRead(xmlLocation))
            {
                return IsValid(xmlStream);
            }
        }

        /// <summary>
        /// Perform the XSD validation against the supplied XML stream
        /// </summary>
        /// <param name="xmlStream">The XML stream to be validated</param>
        /// <returns>True is the XML stream conforms to the schemas, else false</returns>
        private bool IsValid(Stream xmlStream)
        {
            // Reset the Error/Warning collections
            Errors = new List<string>();
            Warnings = new List<string>();

            var settings = new XmlReaderSettings
            {
                ValidationType = ValidationType.Schema
            };
            settings.ValidationEventHandler += ValidationEventHandler;

            foreach (var xmlSchema in Schemas)
            {
                settings.Schemas.Add(xmlSchema);
            }

            var xmlFile = XmlReader.Create(xmlStream, settings);

            try
            {
                while (xmlFile.Read()) { }
            }
            catch (XmlException xex)
            {
                Errors.Add(xex.Message);
            }

            return !Errors.Any() && !Warnings.Any();
        }

        private void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            switch (e.Severity)
            {
                case XmlSeverityType.Error:
                    Errors.Add(e.Message);
                    break;
                case XmlSeverityType.Warning:
                    Warnings.Add(e.Message);
                    break;
            }
        }
    }
}
```

The code is pretty simple but I’m a fan of hiding away any complexities so that I don’t have to think about them when I’m working on a project. The usage for this class is pretty simple as well, requiring you pass in the XSD schemas and then call IsValid specifying the XML file to validate.

```
<pre class="brush: csharp; gutter: true">public void MultipleSchemas()
{
    var validator = new XsdValidator();
    validator.AddSchema(@"SchemaDoc1.xsd");
    validator.AddSchema(@"SchemaDoc2.xsd");
    var isValid = validator.IsValid(@"ValidXmlDoc1.xml");
}
```

Both the XsdValidator and the usage example are hosted on GitHub Gists so feel free to head over to [here ](https://gist.github.com/Satal/6573330 "XsdValidator")and do what you want.