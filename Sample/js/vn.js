/*	Visual Novel Engine v0.9
	Copyright (c) 2012 Brian Crucitti - bcrucitti(at)gmail.com
	
	This file is part of Visual Novel Engine.

	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
	software and associated documentation files (the "Software"), to deal in the Software 
	without restriction, including without limitation the rights to use, copy, modify, merge, 
	publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
	to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or 
	substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
	OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.
*/
/*
	Requires Backbone.js and Underscore.js
*/

$(document).ready(function() {
	
	vne_defineObjects();
	var vn = new VisualNovel;
	
	// title screen options setup
	var option = new TitleOption;
	option.el = $("#title_play");
	option.confirmed = function(){
		vn.uiBar.show();
		vn.retreiveText("sample.txt");
		vn.isTitleScreen = false;
		vn.title.hide();
	};
	option.selected = function(){
		$("#title_play_back").show();
	};
	option.deselected = function(){
		$("#title_play_back").hide();
	};
	option.init = function(){
		$("#title_play_back").hide();
	};
	vn.addTitleOption(option);
	
	
	option = new TitleOption;
	option.el = $("#title_howto");
	option.confirmed = function(){
		vn.helpScreen.show();
		vn.isHelpScreen = true;
	}
	option.selected = function(){
		$("#title_howto_back").show();
	};
	option.deselected = function(){
		$("#title_howto_back").hide();
	};
	option.init = function(){
		$("#title_howto_back").hide();
	};
	vn.addTitleOption(option);
	// end title screen option setup
	
	//any other setup that is needed
	$("#esc").click(function(){
		vn.helpScreen.hide();
		vn.isHelpScreen = false;
	});
	
	//end other setup
	
	vn.init();
	//Start taking keyboard input
	vne_keydown(vn);
	
});

