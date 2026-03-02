//%version:15.0.0.1%
function FillSlot(slot,currperson,lastperson) {
	var currentBox = document.getElementById('box'+slot);
	var content = "";
	var slotperson, husband, wife;

	if( people.hasOwnProperty(currperson) && people[currperson] )
		slotperson = people[currperson];
	else {
		slotperson = new Object;
		slotperson.famc = -1;
		slotperson.personID = 0;
	}
	slots[slot] = slotperson;

	if( slotperson.personID ) {
		if( lastperson && people[lastperson] )
			slotperson.famID = people[lastperson].famc;
		else
			slotperson.famID = "";
		if( hideempty ) {
			currentBox.style.visibility = 'visible';
			toggleLines(slot,slotperson.famc,'visible');
		}

		var safeName = (slotperson.name || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		var slotstr = "";
		if( shownumbers )
			slotstr = '<span class="lighttext">' + slot + '.</span> ';
		content = '<td class="pboxname" id="td' + slot + '">' + slotstr + safeName + '</td>';

		currentBox.style.backgroundColor = currentBox.oldcolor;
	}
	//no person
	else {
		if( hideempty ) {
			content = '';
			currentBox.style.visibility = "hidden";
			toggleLines(slot,0,'hidden');
		}
		else {
			content = '<td class="pboxname" id="td' + slot + '">' + unknown + '</td>';
			currentBox.style.backgroundColor = emptycolor;
		}
	}

	currentBox.innerHTML = content ? '<table border="0" class="pedboxtable" cellpadding="0" cellspacing="0"><tr>' + content + '</tr></table>' : "";

	var nextslot = slot * 2;
	if( slotperson.famc != -1 && families.hasOwnProperty(slotperson.famc) && families[slotperson.famc] ) {
		husband = families[slotperson.famc].husband;
		wife = families[slotperson.famc].wife;
	}
	else {
		husband = 0;
		wife = 0;
	}
	if( nextslot < slotceiling ) {
		FillSlot(nextslot,husband,slotperson.personID);
		nextslot++;
		FillSlot(nextslot,wife,slotperson.personID);
	}
}

function DisplayChart() {
	toplinks = "";
	botlinks = "";
	endslotctr = 0;
	endslots = new Array();

	FillSlot(1,firstperson,0);

	jQuery('#leftarrow').css('visibility','hidden').html('');

	topparams = "";
	botparams = "";
}

var _origSetFirstPerson = setFirstPerson;
setFirstPerson = function(newperson) {
	_origSetFirstPerson(newperson);
	if( !tngprint ) {
		var params = 'personID=' + encodeURIComponent(newperson) + '&tree=' + encodeURIComponent(tree) + '&parentset=' + encodeURIComponent(parentset) + '&generations=' + encodeURIComponent(generations);
		jQuery("#kimonpedlnk").attr('href',pedigree_url + params + '&display=kimon');
	}
};
