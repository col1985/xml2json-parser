xmlFile2JsonFile
====

###Module Description

Module will search through directory tree structure of the given project for xml files. It will then parse these files to JSON, removing the `xmlns` prefix of each tag if found and returns the body of the envelope writing to a `.json` file stored in a directory called `json` at root of project.  

####Why?

I wrote this to help analyze request and responses in `xml` format for a project I am working on. 

Why not! JSON is just easier to read! :)

This is my first node module and an ongoing work in progress, however please feel to create a Pull Request or raise an issue.

---

####How to use!

```javascript
    
    // require module    
    var createJsonFromXml = require('xmlFile2JsonFile');

    // invoke 
    createJsonFromXml();

```








