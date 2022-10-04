import TaskUpdate  from '@/presentation/pages/task/task-update'
import React from 'react'
import { makeRemoteGetTask } from '../../usecases/task/remote-get-task-factory'
import { makeRemoteSaveTask } from '../../usecases/task/remote-save-task-factory'
import { makeTaskValidation } from '../../validation/task/task-validation-factory'

export const makeTaskUpdate: React.FC = () => {
  return (
    <TaskUpdate
      saveTask={makeRemoteSaveTask()}
      getTask={makeRemoteGetTask()}
      validation={makeTaskValidation()}
    />
  )
}