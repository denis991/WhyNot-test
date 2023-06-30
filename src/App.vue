<template>
	<div>
		<div>
			<Navigation></Navigation>
			<router-view v-slot="{ Component }">
				<suspense>
					<component :is="Component" />
				</suspense>
			</router-view>
		</div>
	</div>
</template>

<script>

import Navigation from '@/components/Navigation.vue';
import { RouterLink, RouterView } from 'vue-router';

export default {
  components: {
    Navigation
  }
};
</script>

<style lang="sass">
/* Ваш стиль */
</style>
