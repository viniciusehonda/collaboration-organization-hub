import TaskCreate  from '@/presentation/pages/task/task-create'
import React from 'react'
import { makeRemoteGetTask } from '../../usecases/task/remote-get-task-factory'
import { makeRemoteSaveTask } from '../../usecases/task/remote-save-task-factory'
import { makeTaskValidation } from '../../validation/task/task-validation-factory'

export const makeTaskForm: React.FC = () => {
  return (
    <TaskCreate
      saveTask={makeRemoteSaveTask()}
      getTask={makeRemoteGetTask()}
      validation={makeTaskValidation()}
    />
  )
}