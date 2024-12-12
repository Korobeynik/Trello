
import { defineStore } from "pinia";
import { reactive, computed, ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const statuses = ["TODO", "In progress", "Done"];
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const tasks = reactive([]);

  const currentTask = reactive({
    id: null,
    title: "",
    description: "",
    assignee: "",
    performers: "",
    status: "TODO",
    priority: "Medium",
  });

  const showModal = ref(false);
  const draggedTask = ref(null);

  const tasksByStatus = computed(() => {
    return statuses.reduce((acc, status) => {
      acc[status] = tasks
        .filter((task) => task.status === status)
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      return acc;
    }, {});
  });

  const openTaskModal = (task) => {
    if (task && task.id) {
      Object.assign(currentTask, task);
    } else {
      Object.assign(currentTask, {
        id: null,
        title: "",
        description: "",
        assignee: "",
        performers: "",
        status: task?.status || "TODO",
        priority: "Medium",
      });
    }
    showModal.value = true;
  };

  const closeTaskModal = () => {
    showModal.value = false;
  };

  const saveTask = (task) => {
    if (!task.priority) {
      task.priority = "Medium";
    }
    if (task.id) {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks[index] = { ...task };
    } else {
      task.id = Date.now();
      tasks.push({ ...task });
    }
    closeTaskModal();
  };

  const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) tasks.splice(index, 1);
  };

  const onDragStart = (task) => {
    draggedTask.value = task;
  };
  
  const onDropTask = (status) => {
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

