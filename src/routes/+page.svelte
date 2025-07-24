<script lang="ts">
	import type { TaskStore, Task as TaskType } from '$lib/types';
	import { Task } from '$lib/components/task';
	import { TaskList } from '$lib/components/task-list';
	import { TaskCreator } from '$lib/components/task-creator';
	import { onMount } from 'svelte';
	import { KEY_STORE } from '$lib/constants';

	const initialStore: TaskStore = {
		pending: [],
		completed: []
	};

	let newTask = $state('');
	let store: TaskStore = $state(initialStore);

	onMount(async () => {
		const persistedStore = localStorage.getItem(KEY_STORE);

		store = persistedStore ? JSON.parse(persistedStore) : store;

		$effect(() => {
			localStorage.setItem(KEY_STORE, JSON.stringify(store));
			console.log('Store updated');
		});
	});

	const handleNewTask = () => {
		const task: TaskType = {
			id: crypto.randomUUID(),
			description: newTask
		};

		store.pending.push(task);

		newTask = '';
	};
	const handleClickTask = (taskId: string, value: boolean) => {
		if (value) {
			// Completing task
			const task = store.pending.find((task) => task.id === taskId);
			if (task) {
				store.pending = store.pending.filter((task) => task.id !== taskId);
				store.completed.push(task);
			}
		} else {
			// Uncompleting task
			const task = store.completed.find((task) => task.id === taskId);
			if (task) {
				store.completed = store.completed.filter((task) => task.id !== taskId);
				store.pending.push(task);
			}
		}
	};
	const onDelete = (taskId: string) => {
		const task = store.pending.find((task) => task.id === taskId);
		if (task) {
			store.pending = store.pending.filter((task) => task.id !== taskId);
		} else {
			const task = store.completed.find((task) => task.id === taskId);
			if (task) {
				store.completed = store.completed.filter((task) => task.id !== taskId);
			}
		}
	};
</script>

<div class="p-2">
	<TaskCreator bind:value={newTask} onEnter={handleNewTask} />
	<div class="mt-4">
		<TaskList tasks={store.pending} onTaskComplete={handleClickTask} onTaskDelete={onDelete} />
	</div>
	<div class="mt-4 text-gray-500">
		{#each store.completed as completedTask (completedTask.id)}
			<Task
				id={completedTask.id}
				checked={true}
				description={completedTask.description}
				onCheckedChange={(value) => handleClickTask(completedTask.id, value)}
				{onDelete}
			/>
		{/each}
	</div>
</div>
