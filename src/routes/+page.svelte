<script lang="ts">
  import { Task } from '$lib/components/task';
  import { TaskList } from '$lib/components/task-list';
  import { TaskCreator } from '$lib/components/task-creator';

  type Task = {
    id: string;
    description: string;
  };

  let newTask = $state('');
  let pendingTasks = $state<Task[]>([]);
  let completedTasks = $state<Task[]>([]);

  const handleNewTask = () => {
    pendingTasks.push({
      id: crypto.randomUUID(),
      description: newTask
    });
    newTask = '';
  };
  const handleCompletedTask = (taskId: string, value: boolean) => {
    if (value) {
      const task = pendingTasks.find(task => task.id === taskId)
      if (task) {
        completedTasks.push(task);
      }
      pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    } else {
      const task = completedTasks.find(task => task.id === taskId);
      if (task) {
        pendingTasks.push(task);
      }
      completedTasks = completedTasks.filter(task => task.id !== taskId);
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
