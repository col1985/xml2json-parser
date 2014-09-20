xmlFile2JsonFile
====

Module Description
-----------------------------
Module will recursively search through project file tree for an `xml` directory. It will then create an array of absolute paths for all `.xml` files found in the `xml` directory. The module then loops through the returned path array, reading each `xml` file associated with the given path, formating
the tag names if required and parsing to `json` string using xml2js node module. This module will then write each `json` string to a file using same filename as orignial
`xml` file, to a default `json` directory at root of project.


###Why?

The project I am about to start working on is predominantly using `xml` in it's web services. As I prefer `json` myself I decided it would be easier to understand the required data structures if they are in JSON format.

Why not! It's just easier to read!!

---

getXmlFilePaths(callback) 
-----------------------------
function recursively searchs for a directory labelled xml,
then checks for `.xml` files and returns array of each file path.

**Parameters**

**callback**: method, method containing array of path return once criteria has been statisfied.

**Returns**: method, callback returns array of xml file paths.

getFileName(filePath) 
-----------------------------
Removes directory and suffix from file path and returns formated name.

**Parameters**

**filePath**: String, Path to xml files located in xml directory.

**Returns**: String, fileName formated file name.

writeJsonFile(dir, name, ext, data) 
-----------------------------
Writes data to single file to a specified directory

**Parameters**

**dir**: String, Name of output directory to write file to.

**name**: String, Name of file minus original extension name.

**ext**: String, New file extension of output file.

**data**: String, Stringified JSON data to write to output file.


createOutputFiles(dir, fileName, ext, data) 
-----------------------------
Checks for existence of output directory to write files to.
If none creates directory specified. If no directory named fn creates
default json at root of project file tree.

**Parameters**

**dir**: String, Name of output directory to write file to.

**fileName**: String, Name of file minus original extension name.

**ext**: String, New file extension of output file.

**data**: String, Stringified JSON data to write to output file.


parser(filePaths) 
-----------------------------
Main function, takes array of xml filePaths, loops
through array and reads each files data parsing from `xml` to
`json` string. The passes stringified data to output handler functions.

**Parameters**

**filePaths**: Array, Array of strings containing absolute file paths.


init() 
-----------------------------
exported function bringing all functionality together to create output files









