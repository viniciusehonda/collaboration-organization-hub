import Task  from '@/presentation/pages/task/task'
import React from 'react'
import { makeRemoteLoadTaskList } from '../../usecases/task/remote-load-task-list-factory'
import { makeRemoteDeleteTask } from '../../usecases/task/remote-delete-task-factory'
import { makeRemoteSaveTask } from '../../usecases/task/remote-save-task-factory'
import { makeTaskValidation } from '../../validation/task/task-validation-factory'

export const makeTask: React.FC = () => {
  return (
    <Task
      loadTaskList={makeRemoteLoadTaskList()}
      saveTask={makeRemoteSaveTask()}
      deleteTask={makeRemoteDeleteTask()}
      validation={makeTaskValidation()}
    />
  )
}