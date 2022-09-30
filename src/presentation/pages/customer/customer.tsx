import { LoadCustomerList } from "../../../domain/usecases/customer/load-customer-list"
import { SaveCustomer } from "../../../domain/usecases/customer/save-customer"
import { DeleteCustomer } from "../../../domain/usecases/customer/delete-customer"

import React, { useEffect } from 'react'
import { Customer as model } from "../../../domain/models/customer"
import { Table, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"

type Props = {
    validation: Validation,
    loadCustomerList: LoadCustomerList,
    saveCustomer: SaveCustomer,
    deleteCustomer: DeleteCustomer
}

const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      editable: false,
    }
  ];

const Customer: React.FC<Props> = ({ loadCustomerList }: Props) => {

    const [customers, setCustomers] = React.useState(new Array<LoadCustomerList.Model>());

    useEffect(() => {
        loadCustomerList
            .loadAll()
            .then(resultCustomers => setCustomers(old => ({...old, resultCustomers})));
    }, [])

    return (<DataGrid
        rows={customers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
         />)
}

export default Customer