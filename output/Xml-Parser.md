Global
===





---

getXmlFilePaths(callback) 
-----------------------------
function recursively searchs for a directory labelled xml, then checks for `.xml` files and returns array of each file path

**Parameters**

**callback**: method, function recursively searchs for a directory labelled xml, then checks for `.xml` files and returns array of each file path

**Returns**: method, callback returns array of xml file paths

getFileName(filePath) 
-----------------------------
removes directory and suffix from file path and returns name

**Parameters**

**filePath**: String, removes directory and suffix from file path and returns name

**Returns**: fileName

writeJsonFile(dir, name, ext, data) 
-----------------------------
writes data to single file to a specified directory

**Parameters**

**dir**: String, writes data to single file to a specified directory

**name**: String, writes data to single file to a specified directory

**ext**: String, writes data to single file to a specified directory

**data**: String, writes data to single file to a specified directory


createOutputFiles(dir, fileName, ext, data) 
-----------------------------
checks for existence of output directory to write files to.

**Parameters**

**dir**: String, checks for existence of output directory to write files to.

**fileName**: String, checks for existence of output directory to write files to.

**ext**: String, checks for existence of output directory to write files to.

**data**: String, checks for existence of output directory to write files to.


parser(filePaths) 
-----------------------------
main function, takes array of xml filePaths parses xml to json

**Parameters**

**filePaths**: Array, main function, takes array of xml filePaths parses xml to json


init() 
-----------------------------
exported function bringing all functionality together to create output files



---



Colúm Bennett

**Overview:** text

