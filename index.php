<!DOCTYPE HTML>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!--	
	Visual Novel Engine v0.05
	Copyright 2012 Brian Crucitti - bcrucitti@gmail.com
	
	This file is part of Visual Novel Engine.

    Visual Novel Engine is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Visual Novel Engine is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Visual Novel Engine.  If not, see <http://www.gnu.org/licenses/>.
-->
<head>
	<title>Visual Novel</title>
	<meta content="Brian Crucitti" name="author" />
	<link media="screen" type="text/css" href="css/vn.css" rel="stylesheet" />
	<script type="text/javascript" src="../../js/jquery-1.6.4.min.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<script type="text/javascript" src="js/backbone-min.js"></script>
	<script type="text/javascript" src="js/vn.js"></script>
	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-35487363-1']);
	  _gaq.push(['_trackPageview']);

	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	</script>
</head>
<body>
<div id="window">
	<div id="pictureBox">
		<div id="background">background
		</div>
		<div id="optionsBox">optionsBox
		</div>
		<div id="character_left">character_left
		</div>
		<div id="character_right">character_right
		</div>
	</div>
	<div id="lowerBox">
		<div id="speaker">---</div>
		<div id="textBox"><p id="text">...</p>
		</div>
		<div id="menuBar">
		<ul>
			<li id="back">&lt;-</li>
			<li id="forwards">-&gt;</li>
			<li id="menu">menu</li>
			<li id="save">save</li>
		</ul>
		</div>
	</div>
</div>
</body>
</html>