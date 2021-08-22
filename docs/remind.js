var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],LOCAL_STORAGE_KEY_NAME="5f6e898b-9338-49d9-b1da-84e2609bae9d-chores",DEFAULT_CHORES={chores:[{title:"Cook dinner",days:[0,1,2,3,4,5,6]},{title:"Dishes",days:[0,1,2,3,4,5,6]},{title:"Laundry",days:[6]},{title:"Meal prep",days:[0]},{title:"Put trash out",days:[3]},{title:"Call mom",days:[5]},{title:"Vacuum",days:[2]},{title:"Mop",days:[4]}],reminders:[{title:"Buy milk",snoozedUntil:null}],version:"2020-09-05",currentChoreStatus:null,currentDay:null,settings:{confetti:!0}};function getData(){if(null!=(e=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NAME))))return"2020-09-05"===e.version?e=minorUpgrades(e):console.log("Unknown version!"),e;console.log("No chores, loading defaults");var e=DEFAULT_CHORES;new Date;return e.currentDay=(new Date).getDay(),loadDay(e)}function minorUpgrades(e){return void 0===e.settings&&(e.settings={}),void 0===e.settings.confetti&&(e.settings.confetti=!0),void 0===e.reminders&&(e.reminders=[]),saveData(e),e}function saveData(e){localStorage.setItem(LOCAL_STORAGE_KEY_NAME,JSON.stringify(e))}function loadDay(e){return saveData(e=loadRemindersForDay(e=loadChoresForDay(e))),e}function loadChoresForDay(e){e.currentChoreStatus=[];var n,t=e.currentDay;for(n in e.chores){var r=e.chores[n];r.days.includes(t)&&e.currentChoreStatus.push({title:r.title,isDone:!1})}return e}function loadRemindersForDay(e){for(var n in e.reminders){n=e.reminders[n];n.snoozedUntil==e.currentDay&&(n.snoozedUntil=null)}return e}function createSnoozeElm(e,n){var t=document.createElement("button");return t.classList.add("button","m-2","is-vcentered"),null===e.snoozedUntil?t.innerText="Today":t.innerText=DAYS[e.snoozedUntil],t.addEventListener("click",generateSnoozeReminder(n)),t}function createReminderButtons(e){var n=document.createElement("div");n.classList.add("mt-4");var t=document.createElement("button");n.appendChild(t),t.innerText="Rename",t.classList.add("button","is-outlined","m-2"),t.addEventListener("click",generateRenameReminder(e));t=document.createElement("button");return n.appendChild(t),t.classList.add("button","is-danger","m-2"),t.innerHTML="&#128473;",t.addEventListener("click",generateRemoveReminder(e)),n}function createReminderTitleElm(e,n){var t=document.createElement("div");t.classList.add("box");var r=document.createElement("h2");t.appendChild(r),r.innerText=e.title,r.classList.add("title","is-3"),t.appendChild(createReminderButtons(n));r=document.createElement("p");return t.appendChild(r),r.innerText="Next occurance: ",r.classList.add("mt-2","is-vcentered"),t.appendChild(createSnoozeElm(e,n)),t}function showReminders(){for(var e=document.querySelector("#reminder");e.firstChild;)e.removeChild(e.lastChild);var n,t=getData();for(n in t.reminders){var r=createReminderTitleElm(t.reminders[n],n);e.appendChild(r)}}function generateRemoveReminder(n){return function(){var e=getData();e.reminders.splice(n,1),saveData(e),showReminders()}}function generateSnoozeReminder(t){return function(){var e=getData(),n=e.reminders[t];null===n.snoozedUntil?n.snoozedUntil=(e.currentDay+1)%7:(n.snoozedUntil=(n.snoozedUntil+1)%7,n.snoozedUntil==e.currentDay&&(n.snoozedUntil=null)),saveData(e),showReminders()}}function generateRenameReminder(t){return function(){var e=getData(),n=e.reminders[t].title,n=prompt("Edit reminder",n);null!=n&&(e.reminders[t].title=n,saveData(e),showReminders())}}function connectButtons(){document.querySelector("#addReminder").addEventListener("click",function(){var e,n=prompt("What do you need to remember?","Doctors appointment");null!=n&&((e=getData()).reminders.push({title:n,snoozedUntil:null}),saveData(e),showReminders())}),document.querySelector("#done").addEventListener("click",function(){window.location="./"})}window.onload=function(){connectButtons(),showReminders()};
//# sourceMappingURL=remind.js.map