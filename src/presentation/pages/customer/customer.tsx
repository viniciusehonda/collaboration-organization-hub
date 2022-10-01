import Styles from './customer-styles.scss'
import { LoadCustomerList } from "../../../domain/usecases/customer/load-customer-list"
import { SaveCustomer } from "../../../domain/usecases/customer/save-customer"
import { DeleteCustomer } from "../../../domain/usecases/customer/delete-customer"

import React, { useEffect } from 'react'
import { Customer as model } from "../../../domain/models/customer"
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useOutlet } from 'react-router-dom'
import { Outlet } from "react-router-dom"
import PageTitle from '@/presentation/components/pageTitle/page-title'

type Props = {
  validation: Validation,
  loadCustomerList: LoadCustomerList,
  saveCustomer: SaveCustomer,
  deleteCustomer: DeleteCustomer
}

const Customer: React.FC<Props> = ({ loadCustomerList }: Props) => {

  const navigate = useNavigate();
  const outlet = useOutlet();
  const [customers, setCustomers] = React.useState<LoadCustomerList.Model[]>(new Array<LoadCustomerList.Model>());

  useEffect(() => {
    loadCustomerList
      .loadAll()
      .then(resultCustomers => setCustomers(resultCustomers));
  }, [])

  function updateItem(id: string) {
    navigate('update/' + id)
  }

  const getTable = () => {

    return (
      <TableContainer className={Styles.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
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
                  <button onClick={() => updateItem(row._id)}>Edit</button>
                  <button>Delete</button>
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
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
      {getTable()}
    </div> : outlet}
  </React.Fragment>)
}

export default Customer