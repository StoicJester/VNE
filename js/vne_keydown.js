var vne_keydown = function(vn){
	$(document).keydown(function(event) {
		console.info(event.which);
		var key = event.which;
		if(vn.isDp){//If we are in a decision point.
			if(key==13){ //Enter
				supressEvent(event);
			}
			return;
		}
		if(vn.isHelpScreen){//If we are in the help screen.
			if(key==13){ //Enter
				supressEvent(event);
				vn.helpScreen.hide();
				vn.isHelpScreen = false;
			}else if(key==27){//Esc
				supressEvent(event);
				vn.helpScreen.hide();
				vn.isHelpScreen = false;
			}
			return;
		}
		if(vn.isTitleScreen){//If we are on the title screen
			if(key==13){ //Enter
				supressEvent(event);
				vn.title.confirmSelection();
				// console.log(vn.title.getEvent());
				// switch(vn.title.getEvent()){
				// case 'continue':				
					// vn.uiBar.show();
					// vn.retreiveText();
					// vn.isTitleScreen = false;
					// vn.title.hide();
					// break;
				// case 'showHelp':
					// vn.helpScreen.show();
					// vn.isHelpScreen = true;
					// break;
				// }
			}
			// if(key==37){ //Left
				// supressEvent(event);
			// }
			if(key==38){ //Up
				supressEvent(event);
				vn.title.selectionUp();
			}
			// if(key==39){ //Right
				// supressEvent(event);
			// }
			if(key==40){ //Down
				supressEvent(event);
				vn.title.selectionDown();
			}
			return
		};
		//Normal Situation
		if(key==32){ //spacebar
			supressEvent(event);
			vn.conceal();
		}else if(key==13){ //Enter
			supressEvent(event);
			vn.nextLine();
		}else if(key==37){ //Left
			supressEvent(event);
			//backLog();
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
};