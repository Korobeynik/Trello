<template>
  <div class="task-tracker">
    <header>
      <h1>Task Tracker</h1>
    </header>
    <div class="columns">
      <div v-for="status in statuses" :key="status" class="column">
        <h3>{{ status }}</h3>
        <el-button
          class="add-task"
          icon="Plus"
          size="small"
          @click="openTaskModal({ status })"
          round
          >Add Task</el-button
        >
        <div class="task-list" @dragover.prevent @drop="onDropTask(status)">
          <TaskCard
            v-for="task in tasksByStatus[status]"
            :key="task.id"
            :task="task"
            @edit="openTaskModal"
            @delete="deleteTask"
            @dragstart="onDragStart(task)"
          />
        </div>
      </div>
    </div>

    <TaskModal
      v-if="showModal"
      :task="currentTask"
      @close="closeTaskModal"
      @save="saveTask"
    />
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import TaskModal from "./TaskModal.vue";
import TaskCard from "./TaskCard.vue";

export default {
  components: { TaskModal, TaskCard },
  setup() {
    const statuses = ["TODO", "In progress", "Done"];
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

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    const tasksByStatus = computed(() => {
      return statuses.reduce((acc, status) => {
        acc[status] = tasks
          .filter((task) => task.status === status)
          .sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
          );
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
          priority: "",
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
      tasksByStatus,
      showModal,
      currentTask,
      openTaskModal,
      closeTaskModal,
      saveTask,
      deleteTask,
      onDragStart,
      onDropTask,
    };
  },
};
</script>

<style lang="scss">
header {
  h1 {
    color: white;
    font-size: 30px;
  }
}
.task-tracker {
  font-family: Arial, sans-serif;
  padding: 20px;
  position: relative;
  z-index: 10;
}

.columns {
  display: flex;
  align-items: baseline;
  gap: 20px;
}

.column {
  width: 30%;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  h3 {
    margin: 10px 0;
  }
  button.el-button.el-button--small.is-round.add-task {
    margin: 0 auto 10px auto;
  }
}

.task-list {
  min-height: 200px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 10px;
}

button {
  margin-right: 5px;
}
</style>
