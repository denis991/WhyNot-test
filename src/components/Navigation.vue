<template>
	<div class="navbar" :class="{ 'mobile-view': isMobile }">
		<div class="navbar-bg">
			<div class="container">
				<div class="navbar-header">
					<a href="/" class="navbar-header-logo"><img src="/images/Logo.svg" alt="logo" /></a>
					<div class="navbar-header-actions">
						<div class="geo">
							<div class="icon"><img src="/images/Geo.svg" alt="logo" /></div>
							Москва и область
						</div>
						<div class="notify">
							<img src="/images/Notification-Bell.svg" alt="logo" />
						</div>
						<div
							class="hamburger"
							:class="{ active: isMobile }"
							@click.stop="isMobile ? (isMobile = false) : (isMobile = true)"
						>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="navbar-menu">
				<router-link
					:exact-active-class="'active-link '"
					class="navbar-menu-item"
					:to="item.Path"
					v-for="item in Navigation"
					:key="item.id"
					@click.stop="isMobile = false"
				>
					{{ item.Title }}
				</router-link>
			</div>
		</div>
		<div class="geo geo-bottom" v-show="isMobile">
			<div class="icon"><img src="/images/Geo.svg" alt="logo" /></div>
			Москва и область
		</div>
	</div>
</template>

<script setup>
import ref from 'vue';
const isMobile = ref();
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
					@include trs(0.3s);
					transform: rotate(311deg);
				}

				span::before {
					@include trs(0.3s);
					height: 0;
				}

				span::after {
					transform: rotate(276deg);
					@include trs(0.3s);
				}
			}
		}
	}

	&-menu {
		display: flex;
		align-items: center;
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
		height: 100%;
		opacity: 1;
		@include trs(0.3s);
	}
}
</style>
