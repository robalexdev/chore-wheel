var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],LOCAL_STORAGE_KEY_NAME="5f6e898b-9338-49d9-b1da-84e2609bae9d-chores",LOCAL_STORAGE_OLD_KEY_NAME="chores",DEFAULT_CHORES={chores:[{title:"Cook dinner",days:[0,1,2,3,4,5,6]},{title:"Dishes",days:[0,1,2,3,4,5,6]},{title:"Laundry",days:[6]},{title:"Meal prep",days:[0]},{title:"Put trash out",days:[3]},{title:"Call mom",days:[5]},{title:"Vacuum",days:[2]},{title:"Mop",days:[4]}],reminders:[{title:"Edit to customize",snoozedUntil:null}],version:"2020-09-05",currentChoreStatus:null,currentDay:null,settings:{confetti:!0}};function getData(){var e=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NAME));if(null===e&&(console.log("Checking old name"),e=JSON.parse(localStorage.getItem(LOCAL_STORAGE_OLD_KEY_NAME))),null!==e)return void 0===e.version?e=upgradeLegacy(e):"2020-09-05"===e.version?e=minorUpgrades(e):console.log("Unknown version!"),e;console.log("No chores, loading defaults"),e=DEFAULT_CHORES;new Date;return e.currentDay=(new Date).getDay(),loadChoresForDay(e)}function minorUpgrades(e){return void 0===e.settings&&(e.settings={}),void 0===e.settings.confetti&&(e.settings.confetti=!0),void 0===e.reminders&&(e.reminders=[]),saveData(e),e}function upgradeLegacy(e){return e.version="2020-09-05",saveData(e),localStorage.removeItem(LOCAL_STORAGE_OLD_KEY_NAME),e}function saveData(e){localStorage.setItem(LOCAL_STORAGE_KEY_NAME,JSON.stringify(e))}function loadChoresForDay(e){e.currentChoreStatus=[];var n=e.currentDay;for(var t in e.chores){var r=e.chores[t];r.days.includes(n)&&e.currentChoreStatus.push({title:r.title,isDone:!1})}for(var a in e.reminders){var i=e.reminders[a];i.snoozedUntil==e.currentDay&&(i.snoozedUntil=null)}return saveData(e),e}function createReminderTitleElm(e,n){var t=document.createElement("div");t.classList.add("reminder");var r=document.createElement("div");r.classList.add("reminderText"),r.innerHTML="✏️ "+e.title,r.addEventListener("click",generateRenameReminder(n)),t.appendChild(r);var a=document.createElement("div");a.classList.add("buttons");var i=document.createElement("div");i.classList.add("button"),i.classList.add("snooze"),null===e.snoozedUntil?i.innerHTML="Active":i.innerHTML="Snoozed until "+DAYS[e.snoozedUntil],i.addEventListener("click",generateSnoozeReminder(n)),a.appendChild(i);var o=document.createElement("div");o.classList.add("buttonSep"),a.appendChild(o);var d=document.createElement("div");return d.classList.add("button"),d.classList.add("dismiss"),d.innerHTML="Dismiss",d.addEventListener("click",generateRemoveReminder(n)),a.appendChild(d),t.appendChild(a),t}function showReminders(){for(var e=document.querySelector("#reminder");e.firstChild;)e.removeChild(e.lastChild);var n=getData();for(var t in n.reminders){var r=createReminderTitleElm(n.reminders[t],t);e.appendChild(r)}}function generateRemoveReminder(n){return function(){var e=getData();e.reminders.splice(n,1),saveData(e),showReminders()}}function generateSnoozeReminder(t){return function(){var e=getData(),n=e.reminders[t];null===n.snoozedUntil?n.snoozedUntil=(e.currentDay+1)%7:(n.snoozedUntil=(n.snoozedUntil+1)%7,n.snoozedUntil==e.currentDay&&(n.snoozedUntil=null)),saveData(e),showReminders()}}function generateRenameReminder(r){return function(){var e=getData(),n=e.reminders[r].title,t=prompt("Edit reminder",n);null!=t&&(e.reminders[r].title=t,saveData(e),showReminders())}}function connectButtons(){document.querySelector("#addReminder").addEventListener("click",function(){var e,n=prompt("What do you need to remember?","Doctors appointment");null!=n&&((e=getData()).reminders.push({title:n,snoozedUntil:null}),saveData(e),showReminders())}),document.querySelector("#done").addEventListener("click",function(){window.location="./"})}window.onload=function(){connectButtons(),showReminders()};
//# sourceMappingURL=remind.js.map