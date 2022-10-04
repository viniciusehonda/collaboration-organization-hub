import Styles from './customer-styles.scss'
import { LoadCustomerList } from "../../../domain/usecases/customer/load-customer-list"
import { SaveCustomer } from "../../../domain/usecases/customer/save-customer"
import { DeleteCustomer } from "../../../domain/usecases/customer/delete-customer"

import React, { useEffect, useRef } from 'react'
import { Customer as model } from "../../../domain/models/customer"
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
  loadCustomerList: LoadCustomerList,
  saveCustomer: SaveCustomer,
  deleteCustomer: DeleteCustomer
}

const Customer: React.FC<Props> = ({ loadCustomerList, deleteCustomer }: Props) => {

  const navigate = useNavigate();
  const outlet = useOutlet();
  const location = useLocation();
  const [deleteConfirmation, setDeleteConfirmation] = React.useState<boolean>(false);
  const [customers, setCustomers] = React.useState<LoadCustomerList.Model[]>(new Array<LoadCustomerList.Model>());
  const customerToBeDeleted = useRef<LoadCustomerList.Model | null>(null);

  useEffect(() => {
    loadCustomerList
      .loadAll()
      .then(resultCustomers => setCustomers(resultCustomers));
  }, [])


  useEffect(() => {

    if (location != undefined && location.state) {
      var newCustomer = location.state as LoadCustomerList.Model

      if (newCustomer) {
        if (customers.find(s => s._id == newCustomer._id)) {
          setCustomers(prev => prev.map(o => o._id != newCustomer._id ? o : newCustomer));
        }
        else {
          setCustomers(prev => [...prev, newCustomer])
        }
      }
    }
  }, [location])



  function updateItem(id: string) {
    navigate('update/' + id)
  }

  function deleteItem() {
    try {
      if (customerToBeDeleted.current) {
        deleteCustomer.delete(customerToBeDeleted.current?._id).then(() => {
          loadCustomerList
            .loadAll()
            .then(resultCustomers => setCustomers(resultCustomers));
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

  const openDeleteConfirmation = (item: DeleteCustomer.Model) => {
    customerToBeDeleted.current = item;
    setDeleteConfirmation(true);
  }

  const cancelDelete = () => {
    customerToBeDeleted.current = null;
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
            {customers.map((row: LoadCustomerList.Model) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
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
    <PageTitle title={'Customer'} />
    {!outlet ? <div className={Styles.pageWrap}>
      <div className={Styles.optionsWrap}>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="customer options"
            sx={{ position: 'absolute', bottom: 16, right: 4 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              key={"Add New"}
              icon={<AddIcon />}
              tooltipTitle={"Add New"}
              onClick={(() => navigate('/customer/create'))}
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

export default Customer