<template>
	<div class="navbar" :class="{ 'mobile-view': isMobile }">
		<div class="navbar-bg">
			<div class="container">
				<div class="navbar-header">
					<router-link to="/" class="navbar-header-logo">
						<img src="/images/Logo.svg" alt="logo" />
					</router-link>
					<div class="navbar-header-actions">
						<div class="geo">
							<div class="icon">
								<img src="/images/Geo.svg" alt="logo" />

              </div>
							Москва и область
						</div>
						<div class="notify">
							<img src="/images/Notification-Bell.svg" alt="logo" />
						</div>
						<div class="hamburger" :class="{ active: isMobile }" @click.stop="isMobile = !isMobile">
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="navbar-menu">
				<router-link
					:exact-active-class="'active-link'"
					class="navbar-menu-item"
					v-for="item in Navigation"
					:key="item.id"
					:to="item.Path"
					@click.stop="isMobile = false"
					@click="isMenuOpen = false"
				>
					{{ item.Title }}
					<ul v-if="item.SubItems" :class="['sub-menu', 'sub-menu-' + item.id]">
						<li
							v-for="subItem in item.SubItems"
							:key="subItem.advancedPath"
							:class="['sub-menu-li', subItem.advancedPath.slice(1)]"
						>
							<!-- <router-link
								:to="item.Path + subItem.advancedPath"
								:href="item.Path + subItem.advancedPath"
							> -->
							<router-link
								:to="generatePath(item.Path, subItem.advancedPath)"
								:href="generatePath(item.Path, subItem.advancedPath)"
							>
								{{ subItem.text }}
							</router-link>
						</li>
					</ul>
				</router-link>
			</div>
		</div>
		<div class="geo geo-bottom" v-show="isMobile">
			<div class="icon">
				<img src="/images/Geo.svg" alt="logo" />
			</div>
			Москва и область
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useMain } from '../store/main.js';
export default {
	name: 'Navigation',

	data() {
		return {
			isMenuOpen: false,
			isHoverLocked: false,
			hoverTimer: null,
			// ... other data properties
			isMobile: ref(),
			// mainStore: useMain(),

			Navigation: useMain().state.Navigation,
			activeSubMenu: ref(null),
			isMenuOpen: ref(false),
		};
	},
	methods: {
		generatePath(itemPath, advancedPath) {
			if (itemPath === '/') {
				return advancedPath;
			} else {
				return itemPath + advancedPath;
			}
		},
		handleHover() {
			if (this.isHoverLocked) {
				return;
			}
			this.isMenuOpen = true;
			this.isHoverLocked = true;
			this.hoverTimer = setTimeout(() => {
				this.isHoverLocked = false;
			}, 1000);
		},
		handleMouseLeave() {
			clearTimeout(this.hoverTimer);
			this.isHoverLocked = false;
		},
		// ... other methods
		handleNavigation(item) {
			// Проверяем, содержит ли элемент ссылку (advancedPath)
			if (item.advancedPath) {
				// Выполняем переход по адресу
				mainStore.router.push(item.advancedPath);
			} else {
				// Или выполняем обычную навигацию
				mainStore.router.push(item.Path);
			}
			// Закрытие мобильного меню после перехода
			isMobile.value = false;
		},
	},
};
</script>

<style scoped lang="scss">
$gray: #7c8792;
$black: #1f2229;
$bold_gray: #959597;
@mixin trs($var) {
	transition: $var ease-in-out;
}

@mixin br($var) {
	border-radius: $var;
}

@mixin text-eclipse($var) {
	display: -webkit-box !important;
	-webkit-line-clamp: $var;
	-webkit-box-orient: vertical !important;
	text-overflow: ellipsis !important;
}

.navbar {
	&-bg {
		background: $black;
	}

	.geo-bottom {
		display: none;
		@media (max-width: 1000px) {
			padding: 16px;
			display: flex;
			align-items: center;
			background: #f3f5f6;
			color: $bold_gray;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.icon {
			}
		}
	}

	&-header {
		max-width: 1116px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;

		&-logo {
			text-decoration: none;
		}

		&-actions {
			display: flex;
			align-items: center;

			.notify {
				margin: 5px 0 0 32px;
				@media (max-width: 1000px) {
					margin: 5px 32px 0;
				}
			}

			.geo {
				color: $gray;
				font-size: 14px;
				line-height: 18px;
				display: flex;
				align-items: center;
				@media (max-width: 1000px) {
					display: none;
				}

				.icon {
					margin: 0 9px 0 0;
					filter: invert(55%) sepia(18%) saturate(249%) hue-rotate(169deg) brightness(91%)
						contrast(90%);
				}
			}

			.hamburger {
				cursor: pointer;
				position: relative;
				width: 18px;
				height: 14px;
				display: none;

				@media (max-width: 1000px) {
					display: flex;
					align-items: center;
				}

				span {
					display: block;
					width: 18px;
					height: 2px;
					@include br(5px);
					background: #fff;
					content: '';
					@include trs(0.3s);
				}

				span::before {
					top: 0;
				}

				span::after {
					bottom: 0;
				}

				span::after,
				span::before {
					background: #fff;
					position: absolute;
					left: 0;
					content: '';
					display: block;
					height: 2px;
					width: 100%;
				}
			}

			.active {
				span {
					@include trs(0.5s);
					transform: rotate(140deg);
				}

				span::before {
					@include trs(0.3s);
					height: 0;
				}

				span::after {
					transform: rotate(88deg);
					@include trs(0.5s);
				}
			}
		}
	}

	&-menu {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px 0 0;
		border-bottom: 1px solid $gray;
		@media (max-width: 1000px) {
			flex-direction: column;
			border-bottom: none;
			padding: 24px 0 12px;
			align-items: flex-start;
			height: 0;
			opacity: 0;
		}

		&-item {
			border: 1px solid transparent;
			text-decoration: none;
			font-size: 14px;
			color: $gray;
			line-height: 18px;
			padding: 0 0 12px;
			margin: 0 0 0 18px;
			@media (max-width: 1200px) {
				margin: 0 0 0 14px;
			}
			@media (max-width: 1000px) {
				flex-direction: column;
				border-bottom: 1px solid $gray;
				padding: 0 0 8px 0;
				margin: 16px 0 0;
				color: $bold_gray;
				font-weight: 700;
				font-size: 16px;
				line-height: 22px;
			}
			// position: relative;

			.sub-menu {
				visibility: hidden;
				opacity: 0;
				z-index: -1;
				position: absolute;
			}
			&:hover .sub-menu {
				visibility: visible;
				opacity: 1;
				z-index: 1;
			}
		}

		&-item:first-child {
			margin: 0;
			@media (max-width: 1000px) {
				margin: 0;
			}
		}

		.active-link {
			border-bottom: 1px solid $black;
			color: $black;
		}
	}
}

.mobile-view {
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: 999;

	.navbar-menu {
		max-width: 120vw;
		margin: 0 auto;
		height: 100%;
		opacity: 1;
		@include trs(0.3s);
	}
	.sub-menu {
		display: none;

		top: 100%;
		left: 0;
		visibility: hidden;
		opacity: 0;
		z-index: -1;
		position: absolute;
	}
}

.sub-menu {
	display: none;
	position: absolute;
	// top: 100%;
	// left: 0;

	padding: 10px;
	min-width: 150px;
	z-index: 10;
	opacity: 0;
	transform: translateY(-10px);
	transition: opacity 0.3s ease, transform 0.3s ease;
	@include br(5px); // Apply border-radius mixin for rounded corners

	background: #1f2229;

	border: 1px solid $gray; // Серая рамка
	border-radius: 5px; // Закругленные углы
	text-align: center; // Выравнивание текста по центру
	border-radius: 19px;
	// background: linear-gradient(145deg, #cacaca, #f0f0f0);
	box-shadow: 25px 25px 50px #8f8f8f, -25px -25px 50px #ffffff;
	li {
		list-style-type: none;
		// Стили для пунктов подменю
		color: white;
		font-size: 14px;
		line-height: 18px;
		padding: 6px 0;

		&:last-child {
			padding-bottom: 0;
		}

		a {
			color: white;
			text-decoration: none;

			&:hover {
				// Стили при наведении на ссылку в подменю
			}
		}
	}
}

.navbar-menu-item:hover .sub-menu {
	display: block;
	opacity: 1;
	transform: translateY(0);
}
</style>
