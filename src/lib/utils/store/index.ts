import type { Task, TaskStore } from '$lib/types';
import { KEY_STORE } from '$lib/constants';

export function saveStore(store: TaskStore): void {
	console.log('saving', store);
	localStorage.setItem(KEY_STORE, JSON.stringify(store));
}

export function retrieveStore(): TaskStore {
	const allTasks = window.localStorage.getItem(KEY_STORE) ?? '{ "pending": [], "completed": [] }';

	return JSON.parse(allTasks) as TaskStore; // FIXME: add validation lib like Zod
}

export function setPendingTasks(tasks: Task[], store: TaskStore): TaskStore {
	const newStore = JSON.parse(JSON.stringify(store)) as TaskStore;

	newStore.pending = tasks;
	saveStore(store);

	return store;
}

export function setCompletedTask(tasks: Task[], store: TaskStore): TaskStore {
	const newStore = JSON.parse(JSON.stringify(store)) as TaskStore;

	newStore.completed = tasks;
	saveStore(store);

	return store;
}
