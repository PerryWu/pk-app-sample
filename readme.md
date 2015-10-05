
# Introduction

This is the sample for pillakloud package development.

download the source from github

```
1. git clone git@github.com:PerryWu/pk-app-sample.git
2. cd pk-app-sample
3. npm install
4. PORT=3000 node app.js
5. access the page on browser http://ip:3000/
```

Note:
All http requests to your web server will be proxyed and translated.
[http://www.pillakloud.com/index.php/2015/09/20/532/](http://www.pillakloud.com/index.php/2015/09/20/532/)

For example, if there are two APPs, app1 and app2, listened on port 3000 and 3001 respectively.


`GET http://pk.local/app/app1/xxx`

	will be handled by PET system and proxy to http://127.0.0.1:3000/xxx

`GET http://pk.local/app/app2/xxx`

	will be handled by PET system and proxy to http://127.0.0.1:3001/xxx

So, please do not use absolute path in your html when accessing system resources.

For example, 
This is not allowed:
```
	<a href="/test.jpg">Test</a> 
```

This is ok
```
	<a href="test.jpg">Test</a> 
```

Any question, please feel free to let me know.

# Release Package

When the APP is ok to release, please publish to npm system.

