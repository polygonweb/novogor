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

UI.commonFuncs.modalsInit = function() {
	// закрытие модального окна
	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('modal__close')) {
			var target = e.target;
			while (!target.classList.contains('modal') && target != document.body) {
				target = target.parentNode;
			}
			if (target.classList.contains('modal_show')) {
				target.classList.remove('modal_show');
			}
			e.preventDefault();
		}
	});

	// открытие модальных окон
	document.addEventListener('click', function(e) {
		if (e.target.hasAttribute('data-target-modal')) {
			var modal = document.getElementById(e.target.getAttribute('data-target-modal') || '');
			if (modal) modal.classList.add('modal_show');
			e.preventDefault();
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