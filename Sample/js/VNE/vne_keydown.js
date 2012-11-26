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

var vne_keydown = function(vn){
	$(document).keydown(function(event) {
		// console.info(event.which);
		var key = event.which;
		if(vn.isDecisionPoint){//If we are in a decision point.
			if(key==13){ //Enter
				supressEvent(event);
				var command = vn.optionsBox.confirmSelection();
				vn.optionsBox.clearChoices();
				vn.interpretCommand(command);
				vn.isDecisionPoint = false;
			} else
			if(key==38){ //Up
				supressEvent(event);
				vn.optionsBox.selectionUp();
			} else
			if(key==40){ //Down
				supressEvent(event);
				vn.optionsBox.selectionDown();
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
		}/* else if(key==37){ //Left
			supressEvent(event);
			//backLog();
		} */
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