<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	type Props = {
		value: string;
		onEnter: (value: string) => void;
	};

	let { value = $bindable(), onEnter }: Props = $props();

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && value.trim().length > 0) {
			onEnter(value.trim());
		}
	};
</script>

<Input
	type="text"
	placeholder="Enter task"
	class="md:text-xl"
	bind:value
	onkeydown={handleKeyDown}
/>
