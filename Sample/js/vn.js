/*	Visual Novel Engine v0.9
	Copyright 2012 Brian Crucitti - bcrucitti@gmail.com
	
	This file is part of Visual Novel Engine.

    Visual Novel Engine is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    Visual Novel Engine is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with Visual Novel Engine.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
	Requires Backbone.js and Underscore.js
*/

$(document).ready(function() {
	
	vne_defineObjects();
	var vn = new VisualNovel;
	
	// title screen options setup
	var option = new TitleOption;
	option.confirmed = function(){
		vn.uiBar.show();
		vn.retreiveText("sample.txt");
		vn.isTitleScreen = false;
		vn.title.hide();
	}
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
	
	vn.init();
	//Start taking keyboard input
	vne_keydown(vn);
	
});

