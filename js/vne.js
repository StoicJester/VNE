/*	Visual Novel Engine v0.05
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
*/
/*
	Requires Backbone.js and Underscore.js
*/

$(document).ready(function() {
	//-Setup-----------------------------------------------------------------
	//Backbone model for the background
	var Background = Backbone.Model.extend({
		el: $("#background"),
		image: 'Title.png',
		alter: function(image){
			this.image = image;
			this.el.html('<img src="background/'+image+'" height="600px" width="800px"/>');
		},
		initialize: function(){
			this.el.html('<img src="background/Title.png" height="600px" width="800px"/>');
		}
	});
	//Backbone model for the options menu
	var Options = Backbone.Model.extend({
		el: $("#optionsBox"),
		initialize: function(){
			this.el.hide();
		}
	});
	//Backbone model for characters
	var Character = Backbone.Model.extend({
		el: $("character"),
		image: 'Nobody.png',
		isHidden: false,
		
		alter: function(image){
			this.el.html('<img src="characters/'+image+'" height="330px" width="220px"/>');
			if(this.isHidden){
				this.show();
			}
		},
		hide: function(){
			this.el.hide();
			this.isHidden = true;
		},
		show: function(){
			this.el.show();
			this.isHidden = false;
		}
	});
	//Backbone model for the text bar, contains speaker box and text box
	var TextBar = Backbone.Model.extend({
		el: $("#lowerBox"),
		speaker: $("#speaker"),
		text: $("#text"),
		isHidden: false,
		
		initialize: function(){
			// this.conceal();
		},
		conceal: function(){
			if(this.isHidden){
				this.show();
			}else{
				this.hide();
			}
		},
		show: function(){
			this.el.show();
			this.isHidden = false;
		},
		hide: function(){
			this.el.hide();
			this.isHidden = true;
		},
		setText: function(msg){
			this.text.text(msg);
		},
		setSpeaker: function(spk){
			this.speaker.html('<span>'+spk+'</span>');
		}
	});
	//Backbone model for the menu bar, which does nothing right now
	var MenuBar = Backbone.Model.extend({
		el: $("#menuBar"),
		initialize: function(){
			this.hide();
		},
		hide: function(){
			this.el.hide();
		}
	});
	//Backbone model for the whole visual novel
	var VisualNovel = Backbone.Model.extend({
		background: new Background,
		optionsBox: new Options,
		character_left: new Character,
		character_right: new Character({'el':'$("#character_left")'}),
		textBar: new TextBar,
		menuBar: new MenuBar,
		script: ['...'],
		scriptLine: 0,
		
		isDp: false,
		isTitleScreen: true,
		isMenuScreen: false,
		isHidden: false,
		
		initialize: function(){
			this.textBar.hide();
			this.character_left.el = $("#character_left");
			this.character_right.el = $("#character_right");
			this.character_left.alter("Nobody.png");
			this.character_right.alter("Nobody.png");
			this.character_left.hide();
			this.character_right.hide();
		},
		conceal: function(){
			if(this.isHidden){
				this.character_left.show();
				this.character_right.show();
				this.textBar.show();
			}else{
				this.character_left.hide();
				this.character_right.hide();
				this.textBar.hide();
			}
			this.isHidden = !this.isHidden;
		},
		
		decisionPoint: function(){
			this.isDp = true;
		},
		retreiveText: function(){
			var url = "retreiveText.php";
			var text = ""
			$.post(url).complete(function(data){
				text = data.responseText.split("\n");
				vn.script = text;
				vn.scriptLine = -1;
				vn.nextLine();
			});
		},
		nextLine: function(){
			this.scriptLine++;
			if(this.scriptLine >= this.script.length){
				return;
			}
			var msg = this.script[this.scriptLine];
			if(msg.charAt(0) == '['){
				this.interpretCommand(msg);
			}else{
				var loc = msg.search(/:/);
				if(loc != -1){
					var spkr = msg.slice(0,loc);
					msg = msg.slice(loc+1);
					msg = jQuery.trim(msg);
					this.textBar.setSpeaker(spkr);
				}
				this.textBar.setText(msg);
			}
		},
		interpretCommand: function(msg){
			msg = msg.replace(/(\[|\])/g,"");
			var cmdList = msg.split(/;/g)
			for(var i=0;i<cmdList.length;i++){
				var currCmd = cmdList[i].replace(/(\[|\])/g,"");
				var cmd = currCmd.split(/:/g);
				if(cmd.length<2){
					continue;
				}
				var att = jQuery.trim(cmd[0]);
				var eff = jQuery.trim(cmd[1]);
				this.sendCommand(att, eff);
			}
			this.nextLine();
		},
		sendCommand: function(att, eff){
			att = att.toLowerCase();
			switch(att){
			case 'background':
				this.background.alter(eff);
				break;
			case 'character_left':
				this.character_left.alter(eff);
				break;
			case 'character_right':
				this.character_right.alter(eff);
				break;
			}
		}
	});
	//-End-Setup------------------------------------------------------------
	
	var vn = new VisualNovel;
	
	$(document).keypress(function(event) {
		if(vn.isDp){//If we are in a decision point.
			if(event.which==13){ //Enter
				supressEvent(event);
			}
			return;
		}
		if(vn.isTitleScreen){//If we are on the title screen
			if(event.which==13){ //Enter
				supressEvent(event);
				vn.textBar.show();
				vn.retreiveText();
				vn.isTitleScreen = false;
			}
			return
		};
		if(event.which==32){ //spacebar
			supressEvent(event);
			vn.conceal();
		}else if(event.which==13){ //Enter
			supressEvent(event);
			vn.nextLine();
		}
	});
			
	function supressEvent(e){
		var flag = false;
		if (e.preventDefault){
			e.preventDefault();
			flag = true;
		}
		if (e.stopPropagation){
			e.stopPropagation();
			flag = true;
		}
		if(!flag){
			e.returnValue = false;
		}
	}
});