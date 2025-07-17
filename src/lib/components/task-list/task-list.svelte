<script lang="ts">
  import { Task } from '$lib/components/task';

  type Props = {
    tasks: {
      id: string;
      description: string;
    }[];
    onTaskComplete: (id: string, checked: boolean) => void;
    // onTaskDelete?: (id: string) => void;
  };

  let { tasks, onTaskComplete }: Props = $props();
</script>

<div>
    {#if tasks.length === 0}
        <p>No pending tasks.</p>
    {:else}
        {#each tasks as task (task.id)}
            <Task
                id={task.id}
                checked={false}
                description={task.description}
                onCheckedChange={(value) => onTaskComplete(task.id, value)}
            />
        {/each}
    {/if}
</div>
