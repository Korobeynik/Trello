<template>
  <div class="task-tracker">
    <header>
      <h1>Task Tracker</h1>
    </header>
    <div class="columns">
      <div v-for="status in taskStore.statuses" :key="status" class="column">
        <h3>{{ status }}</h3>
        <el-button
          class="add-task"
          icon="Plus"
          size="small"
          @click="taskStore.openTaskModal({ status })"
          round
          >Add Task</el-button
        >
        <div
          class="task-list"
          @dragover.prevent
          @drop="taskStore.onDropTask(status)"
        >
          <TaskCard
            v-for="task in taskStore.tasksByStatus[status]"
            :key="task.id"
            :task="task"
            @edit="taskStore.openTaskModal"
            @delete="taskStore.deleteTask"
            @dragstart="taskStore.onDragStart(task)"
          />
        </div>
      </div>
    </div>

    <TaskModal
      v-if="taskStore.showModal"
      :task="taskStore.currentTask"
      @close="taskStore.closeTaskModal"
      @save="taskStore.saveTask"
    />
  </div>
</template>

<script>
import { useTaskStore } from "@/stores/taskStore";
import TaskModal from "./TaskModal.vue";
import TaskCard from "./TaskCard.vue";

export default {
  components: { TaskModal, TaskCard },
  setup() {
    const taskStore = useTaskStore();
    return {
      taskStore,
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

@media (max-width: 800px) {
  .task-tracker {
    padding: 0;
  }
  .columns {
    flex-wrap: wrap;
  }
  .column {
    width: 100%;
  }
}
</style>
