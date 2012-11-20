/*	Visual Novel Engine v0.75
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

var vne_defineObjects = function(){//Setup
//\\Models
//-Display-----------------------------------------------------------------
	//Backbone Model for the background
	Background = Backbone.Model.extend({
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
	//Backbone Model for characters
	Character = Backbone.Model.extend({
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
//-Display End--------------------------------------------------------------
//-UI-----------------------------------------------------------------------
	//Backbone Model for the options menu
	Options = Backbone.Model.extend({
		el: $("#optionsBox"),
		initialize: function(){
			this.el.hide();
		}
	});
	//Backbone Model for the text bar, contains speaker box and text box
	UiBar = Backbone.Model.extend({
		el: $("#uiBar"),
		speaker: $("#speaker"),
		textBox: $("#text"),
		isHidden: false,
		
		initialize: function(){
			// this.switchHidden();
		},
		switchHidden: function(){
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
			this.textBox.text(msg);
		},
		setSpeaker: function(spk){
			this.speaker.html('<span>'+spk+'</span>');
		}
	});
	//Backbone Model for the menu bar, which does nothing right now
	MenuBar = Backbone.Model.extend({
		el: $("#menuBar"),
		initialize: function(){
			this.el.hide();
		}
	});
//-UI End-------------------------------------------------------------------
//-Title--------------------------------------------------------------------
	//Backbone Model for Title Options
	TitleOption = Backbone.Model.extend({
		confirmed: function(){},
		selected: function(){},
		deselected: function(){},
		init: function(){}
	});
	//Backbone Model for Title Screen
	Title = Backbone.Model.extend({
		el: $("#title"),
		options: [],
		addOption: function(op){
			op.init();
			this.options.push(op);
		},
		init: function(){
			this.selection = 0;
			this.setSelection(this.selection);
		},
		confirmSelection: function(){
			this.options[this.selection].confirmed();
		},
		setSelection: function(item){
			for(var i=0;i<this.options.length;i++){
				if(i==item){
					this.options[i].selected();
				}else{
					this.options[i].deselected();
				}
			}
		},
		selectionDown: function(){
			if(this.selection >= this.options.length-1){
				this.selection = this.options.length-1;
			}else{
				this.selection++;
			}
			this.setSelection(this.selection);
		},
		selectionUp: function(){
			if(this.selection <= 0){
				this.selection = 0;
			}else{
				this.selection--;
			}
			this.setSelection(this.selection);
		},
		hide: function(){
			this.el.hide();
		}
	});
//-Title End----------------------------------------------------------------	
	
	HelpScreen = Backbone.Model.extend({
		el: $("#helpWindow"),
		hide: function(){
			this.el.hide();
		},
		show: function(){
			this.el.show();
		},
		initialize: function(){
			this.hide();
		}
	});
	
	//?? Backbone model for gameplay ??
	
	//Backbone model for the whole visual novel
	VisualNovel = Backbone.Model.extend({
		background: new Background,
		helpScreen: new HelpScreen,
		optionsBox: new Options,
		character_left: new Character,
		character_right: new Character({'el':'$("#character_left")'}),
		uiBar: new UiBar,
		menuBar: new MenuBar,
		title: new Title,
		scriptText: ['...'],
		scriptLine: 0,
		
		// isDp: false,
		isTitleScreen: true,
		isHelpScreen: false,
		
		/*Initialize function for the vn, not called immediately
			so that changes can be made to any objects in the vn.
		*/
		init: function(){
			this.uiBar.hide();
			this.character_left.el = $("#character_left");
			this.character_right.el = $("#character_right");
			this.character_left.alter("Nobody.png");
			this.character_right.alter("Nobody.png");
			this.character_left.hide();
			this.character_right.hide();
			
			this.helpScreen.el.click(function(){
				vn.helpScreen.hide();
				vn.isHelpScreen = false;
			});
			
			//initialize title buttons
			this.title.init();
		},
		//Add option to title screen
		addTitleOption: function(option){
			this.title.addOption(option);
		},
		//Toggle display of UI
		switchHidden: function(){
			this.uiBar.switchHidden();
		},
		//Retreive text using an ajax request
		retreiveText: function(){
			var url = "retreiveText.php";
			var text = ""
			var vn = this;
			$.post(url).complete(function(data){
				text = data.responseText.split("\n");
				vn.scriptText = text;
				vn.scriptLine = -1;
				vn.nextLine();
			});
		},
		/*Move on to the next line of the script
		*/
		nextLine: function(){
			this.scriptLine++;
			if(this.scriptLine >= this.scriptText.length){
				return;
			}
			var msg = this.scriptText[this.scriptLine];
			if(msg.charAt(0) == '['){
				this.interpretCommand(msg);
			}else{
				var loc = msg.search(/:/);
				if(loc != -1){
					var spkr = msg.slice(0,loc);
					msg = msg.slice(loc+1);
					msg = jQuery.trim(msg);
					this.uiBar.setSpeaker(spkr);
				}
				this.uiBar.setText(msg);
			}
		},
		/*Interpret a command line from text into actions
		*/
		interpretCommand: function(msg){
			msg = msg.replace(/(^\[|\]$)/g,"");
			var cmdList = msg.split(/;/g)
			for(var i=0;i<cmdList.length;i++){
				var currCmd = cmdList[i].replace(/;/g,"");
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
		/*Send a command to the correct piece of the vn
		*/
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
//\\End Models
};//End Setup
	