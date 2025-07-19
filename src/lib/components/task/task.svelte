<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		id: string;
		checked: boolean;
		description: string;
		onCheckedChange: (checked: boolean) => void;
	};

	let { id, checked, description, onCheckedChange }: Props = $props();
</script>

<div class="flex p-2">
	<Checkbox {id} {checked} onCheckedChange={(value) => onCheckedChange(value)} />
	<Label for={id} class="ml-2">{description}</Label>
</div>
