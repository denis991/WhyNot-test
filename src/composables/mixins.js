export const overFlow = (state) => {
	if (state) {
		document.body.style.overflowY = 'hidden';
	} else document.body.style.overflowY = 'visible';
};
