export type Task = {
	id: string;
	description: string;
};

export type TaskStore = {
	pending: Task[];
	completed: Task[];
};
