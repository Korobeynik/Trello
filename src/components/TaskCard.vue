<template>
  <div class="task-card" draggable="true" @dragstart="$emit('dragstart', task)">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <div class="priority" :class="task.priority">{{ task.priority }}</div>
    <el-button @click="$emit('edit', task)" type="primary" size="small" round
      >Edit</el-button
    >
    <el-button
      @click="$emit('delete', task.id)"
      type="danger"
      round
      size="small"
      >Delete</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.task-card {
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  position: relative;
  h3 {
    padding-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .priority {
    position: absolute;
    right: 15px;
    top: 10px;
    font-weight: bold;
    font-size: 14px;
    &.Low {
      color: #409eff;
    }
    &.Medium {
      color: orange;
    }
    &.High {
      color: red;
    }
  }
}
</style>
