<template>
  <div class="task-modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content">
      <h2>{{ task.id ? "Edit Task" : "Create Task" }}</h2>
      <form @submit.prevent="onSave">
        <div>
          <el-input v-model="localTask.title" placeholder="Title" />
        </div>
        <div>
          <el-input
            v-model="localTask.description"
            :rows="2"
            type="textarea"
            placeholder="Description"
          />
        </div>
        <div>
          <el-input v-model="localTask.assignee" placeholder="Assignee:" />
        </div>
        <div>
          <el-input v-model="localTask.performers" placeholder="Performers:" />
        </div>
        <el-select v-model="localTask.status" placeholder="Select Status">
          <el-option label="TODO" value="TODO"></el-option>
          <el-option label="In progress" value="In progress"></el-option>
          <el-option label="Done" value="Done"></el-option>
        </el-select>
        <el-select v-model="localTask.priority" placeholder="Select Priority">
          <el-option label="High" value="High"></el-option>
          <el-option label="Medium" value="Medium"></el-option>
          <el-option label="Low" value="Low"></el-option>
        </el-select>
        <el-button @click="onSave" type="success" round>Save</el-button>
        <el-button @click="$emit('close')" type="info" round>Cancel</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import { useTaskStore } from "@/stores/taskStore";

export default {
  props: ["task"],
  emits: ["close", "save"],
  setup(props, { emit }) {
    const taskStore = useTaskStore();
    const localTask = reactive({ ...props.task });

    const onSave = () => {
      if (!localTask.title.trim()) {
        alert("Title is required.");
        return;
      }
      if (!localTask.priority) {
        localTask.priority = "Medium";
      }
      taskStore.saveTask({ ...localTask });
      emit("close");
    };

    watch(
      () => props.task,
      (newTask) => {
        Object.assign(localTask, { ...newTask });
      },
      { immediate: true }
    );

    return {
      localTask,
      onSave,
    };
  },
};
</script>

<style>
.task-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 400px;
}

form > div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-right: 10px;
}
</style>
