import { defineStore } from 'pinia';
import { reactive, ref, computed } from 'vue';

export interface Task {
  id: number | null;
  title: string;
  description: string;
  assignee: string;
  performers: string;
  status: string;
  priority: string;
}

interface PriorityOrder {
  [key: string]: number;
}

export const useTaskStore = defineStore('taskStore', () => {
  const statuses = ['TODO', 'In progress', 'Done'];
  const priorityOrder: PriorityOrder = { High: 1, Medium: 2, Low: 3 };

  const tasks = reactive<Task[]>([]);

  const currentTask = reactive<Task>({
    id: null,
    title: '',
    description: '',
    assignee: '',
    performers: '',
    status: 'TODO',
    priority: 'Medium',
  });

  const showModal = ref(false);
  const draggedTask = ref<Task | null>(null);

  const tasksByStatus = computed(() => {
    return statuses.reduce<Record<string, Task[]>>((acc, status) => {
      acc[status] = tasks
        .filter((task) => task.status === status)
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      return acc;
    }, {});
  });

  const openTaskModal = (task?: Partial<Task>) => {
    if (task && task.id) {
      Object.assign(currentTask, task);
    } else {
      Object.assign(currentTask, {
        id: null,
        title: '',
        description: '',
        assignee: '',
        performers: '',
        status: task?.status || 'TODO',
        priority: 'Medium',
      });
    }
    showModal.value = true;
  };

  const closeTaskModal = () => {
    showModal.value = false;
  };

  const saveTask = (task: Task) => {
    if (!task.priority) {
      task.priority = 'Medium';
    }
    if (task.id) {
      const index = tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasks[index] = { ...task };
      }
    } else {
      task.id = Date.now();
      tasks.push({ ...task });
    }
    closeTaskModal();
  };

  const deleteTask = (id: number) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) tasks.splice(index, 1);
  };

  const onDragStart = (task: Task) => {
    draggedTask.value = task;
  };

  const onDropTask = (status: string) => {
    if (draggedTask.value) {
      draggedTask.value.status = status;
      draggedTask.value = null;
    }
  };

  return {
    statuses,
    tasks,
    currentTask,
    tasksByStatus,
    showModal,
    openTaskModal,
    closeTaskModal,
    saveTask,
    deleteTask,
    onDragStart,
    onDropTask,
  };
});
