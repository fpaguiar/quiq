<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Trash } from 'lucide-svelte';

	type Props = {
		id: string;
		checked: boolean;
		description: string;
		onCheckedChange: (checked: boolean) => void;
	};

	let { id, checked, description, onCheckedChange }: Props = $props();

	let areActionsVisible = $state(false);

	const handleMouseHover = () => {
		if (!checked) {
			areActionsVisible = !areActionsVisible;
		}
	};
</script>

<div
	class="flex justify-between p-2"
	role="listitem"
	onmouseenter={handleMouseHover}
	onmouseleave={handleMouseHover}
>
	<div class="flex">
		<Checkbox {id} {checked} onCheckedChange={(value) => onCheckedChange(value)} />
		<Label for={id} class="ml-2">{description}</Label>
	</div>
	<div class={areActionsVisible ? 'visible' : 'hidden'}>
		<Trash class="h-4 w-4" />
	</div>
</div>
