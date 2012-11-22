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