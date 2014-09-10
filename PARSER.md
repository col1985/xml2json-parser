Global
===





---

getXmlFilePaths(callback) 
-----------------------------
function recursively searchs for a directorylabelled xml, then checks for `.xml` filesand returns array of each file path

**Parameters**

**callback**: method, function recursively searchs for a directorylabelled xml, then checks for `.xml` filesand returns array of each file path

**Returns**: callback returns array of xml file paths

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
checks for existence of output directory to write files to.If none creates directory specified. If no directory named cratesdefault json at root of project file tree.

**Parameters**

**dir**: String, checks for existence of output directory to write files to.If none creates directory specified. If no directory named cratesdefault json at root of project file tree.

**fileName**: String, checks for existence of output directory to write files to.If none creates directory specified. If no directory named cratesdefault json at root of project file tree.

**ext**: String, checks for existence of output directory to write files to.If none creates directory specified. If no directory named cratesdefault json at root of project file tree.

**data**: String, checks for existence of output directory to write files to.If none creates directory specified. If no directory named cratesdefault json at root of project file tree.


parser(filePaths) 
-----------------------------
main function, takes array of xml filePaths parses xml to jsonand passes data to output handler functions

**Parameters**

**filePaths**: Array, main function, takes array of xml filePaths parses xml to jsonand passes data to output handler functions


init() 
-----------------------------
exported function bringing all functionality together to create output files



---








