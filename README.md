# xml2jsonfile  

![Build Passing](https://travis-ci.org/col1985/xml2json-parser.svg?branch=master)
[![NPM version](https://badge.fury.io/js/xml2jsonfile.svg)](http://badge.fury.io/js/xml2jsonfile)

###Module Description

Module will search through directory tree structure of the given project for xml files. It will then parse these files to JSON, removing the `xmlns` prefix of each tag if found and returns the body of the envelope writing to a `.json` file stored in a directory called `json` at root of project.

The module will parse both SOAP xml files and normal xml files with attributes.  

####Why?

Why not! JSON is just easier to read! :)

This is my first node module and a work in progress, however please feel to create a Pull Request or raise an issue.

---

####How to use!

```bash
    npm install xml2jsonfile
```

```javascript
    
    // require module    
    var createJsonFromXml = require('xml2jsonfile');

    // invoke 
    createJsonFromXml();

```








