export const useMain = defineStore('main', {
	state() {
		return {
			isError: false,
			Navigation: [
				{
					id: 1,
					Title: 'Преимущества Tele2',
					Path: '/',
				},
				{
					id: 2,
					Title: 'Тарифы',
					Path: '/about',
				},
				{
					id: 3,
					Title: 'Акции и спецпредложения',
					Path: '/special',
				},
				{
					id: 4,
					Title: 'Промотариф Tele2',
					Path: '/promo',
				},
				{
					id: 5,
					Title: 'Технология eSIM',
					Path: '/esim',
				},
				{
					id: 6,
					Title: 'Подключение нового абонента',
					Path: '/new',
				},
			],
		};
	},
	getters: {},
	actions: {},
});
