<script lang="ts">
	import type { Task as TaskType } from '$lib/types';
	import { Task } from '$lib/components/task';
	import { TaskList } from '$lib/components/task-list';
	import { TaskCreator } from '$lib/components/task-creator';
	import { retrieveStore, saveStore } from '$lib/utils/store';
	import { onMount } from 'svelte';

	let newTask = $state('');
	let pendingTasks = $state<TaskType[]>([]);
	let completedTasks = $state<TaskType[]>([]);

	onMount(() => {
		const store = retrieveStore();

		pendingTasks = store.pending;
		completedTasks = store.completed;
	});

	const save = () => {
		saveStore({
			completed: completedTasks,
			pending: pendingTasks
		});
	};

	const handleNewTask = () => {
		pendingTasks.push({
			id: crypto.randomUUID(),
			description: newTask
		});
		newTask = '';
		save();
	};
	const handleCompletedTask = (taskId: string, value: boolean) => {
		if (value) {
			const task = pendingTasks.find((task) => task.id === taskId);
			if (task) {
				completedTasks.push(task);
			}
			pendingTasks = pendingTasks.filter((task) => task.id !== taskId);
			save();
		} else {
			const task = completedTasks.find((task) => task.id === taskId);
			if (task) {
				pendingTasks.push(task);
			}
			completedTasks = completedTasks.filter((task) => task.id !== taskId);
			save();
		}
	};
</script>

<div class="p-2">
	<TaskCreator bind:value={newTask} onEnter={handleNewTask} />
	<div class="mt-4">
		<TaskList tasks={pendingTasks} onTaskComplete={handleCompletedTask} />
	</div>
	<div class="mt-4 text-gray-500">
		{#each completedTasks as task (task.id)}
			<Task
				id={task.id}
				checked={true}
				description={task.description}
				onCheckedChange={(value) => handleCompletedTask(task.id, value)}
			/>
		{/each}
	</div>
</div>
