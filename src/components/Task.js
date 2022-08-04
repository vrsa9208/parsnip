import React from "react";

const Task = (props) => {
  const onChangeStatus = (event) => {
    props.onUpdateTask({ ...props.task, status: event.target.value });
  };

  return (
    <div className="task">
      <div className="task-header">
        <div>{props.task.title}</div>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
      <select defaultValue={props.task.status} onChange={onChangeStatus}>
        <option value="Unstarted">Unstarted</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <div className="task-timer">{props.task.timer}s</div>
    </div>
  );
};

export default Task;
