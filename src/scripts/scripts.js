// пространство имен для рабты элементов страниц
var UI = window.UI || {};

// пространство имен для функций, которые будут вызваны при загрузке DOM
UI.commonFuncs = UI.commonFuncs || {};

UI.commonFuncs.menuToogler = function() {
	var menu = document.querySelector('.menu');
	var trigger = document.querySelector('.menu__trigger');

	if (menu && trigger) {
		trigger.onclick = function(e) {
			menu.classList.toggle('menu_open');
		}
	}
};

UI.commonFuncs.closeNotif = function() {
	document.addEventListener('click', function(e) {
		var target = e.target;
		if (e.target.classList.contains('notif__close')) {
			while ((target = target.parentNode) && !target.classList.contains('notif')) {}
			target.parentNode.removeChild(target);
		}
	});
}

// события при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
	// перебираем все функции из объекта commonFuncs и вызываем их
	var funcs = UI.commonFuncs;
	for (var func in funcs) {
		if(funcs.hasOwnProperty(func) && typeof funcs[func] === 'function') {
			try {
				funcs[func]();
			} catch(e) {
				console.error('Error in function: ', func.name);
			}
		}
	};
});