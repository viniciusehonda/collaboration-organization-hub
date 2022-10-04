import Styles from './task-styles.scss'
import { LoadTaskList } from "../../../domain/usecases/task/load-task-list"
import { SaveTask } from "../../../domain/usecases/task/save-task"
import { DeleteTask } from "../../../domain/usecases/task/delete-task"

import React, { useEffect, useRef } from 'react'
import { Task as model } from "../../../domain/models/task"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { Outlet } from "react-router-dom"
import PageTitle from '@/presentation/components/pageTitle/page-title'
import { current } from '@reduxjs/toolkit'
import DeleteButton from '@/presentation/components/buttons/dangerButton'
import EditButton from '@/presentation/components/buttons/lightButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NeutralButton from '@/presentation/components/buttons/neutralButton'

type Props = {
  validation: Validation,
  loadTaskList: LoadTaskList,
  saveTask: SaveTask,
  deleteTask: DeleteTask
}

const Task: React.FC<Props> = ({ loadTaskList, deleteTask }: Props) => {

  const navigate = useNavigate();
  const outlet = useOutlet();
  const location = useLocation();
  const [deleteConfirmation, setDeleteConfirmation] = React.useState<boolean>(false);
  const [customers, setCustomers] = React.useState<LoadTaskList.Model[]>(new Array<LoadTaskList.Model>());
  const taskToBeDeleted = useRef<LoadTaskList.Model | null>(null);

  useEffect(() => {
    loadTaskList
      .loadAll()
      .then(resultTask => setCustomers(resultTask));
  }, [])


  useEffect(() => {

    if (location != undefined && location.state) {
      var newTask = location.state as LoadTaskList.Model

      if (newTask) {
        if (customers.find(s => s._id == newTask._id)) {
          setCustomers(prev => prev.map(o => o._id != newTask._id ? o : newTask));
        }
        else {
          setCustomers(prev => [...prev, newTask])
        }
      }
    }
  }, [location])



  function updateItem(id: string) {
    navigate('update/' + id)
  }

  function deleteItem() {
    try {
      if (taskToBeDeleted.current) {
        deleteTask.delete(taskToBeDeleted.current?._id).then(() => {
          loadTaskList
            .loadAll()
            .then(resultTask => setCustomers(resultTask));
        })
          .finally(() => {
            cancelDelete();
          })
          .catch(() => {

          })
      }
    }
    catch (error: any) {

    }
  }

  const openDeleteConfirmation = (item: DeleteTask.Model) => {
    taskToBeDeleted.current = item;
    setDeleteConfirmation(true);
  }

  const cancelDelete = () => {
    taskToBeDeleted.current = null;
    setDeleteConfirmation(false);
  }

  const getTable = () => {

    return (
      <TableContainer className={Styles.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell width={'20%'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row: LoadTaskList.Model) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.title}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.description}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <EditButton onClick={() => updateItem(row._id)}><EditIcon /> Edit</EditButton>
                  <DeleteButton onClick={() => openDeleteConfirmation(row)}><DeleteForeverIcon /> Delete</DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (<React.Fragment>
    <PageTitle title={'Task'} />
    {!outlet ? <div className={Styles.pageWrap}>
      <div className={Styles.optionsWrap}>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="task options"
            sx={{ position: 'absolute', bottom: 16, right: 4 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              key={"Add New"}
              icon={<AddIcon />}
              tooltipTitle={"Add New"}
              onClick={(() => navigate('/task/create'))}
            />
          </SpeedDial>
        </Box>
      </div>
      <div>
        <Dialog
          open={deleteConfirmation}
          onClose={cancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this customer ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This customer will be deleted forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <NeutralButton onClick={cancelDelete}>Cancelar</NeutralButton>
            <DeleteButton onClick={() => deleteItem()}>Delete</DeleteButton>
          </DialogActions>
        </Dialog>
      </div>
      {getTable()}
    </div> : outlet}
  </React.Fragment>)
}

export default Task