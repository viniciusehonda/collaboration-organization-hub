import { LoadCompanyList } from "../../../domain/usecases/company/load-company-list"

import React, { useEffect } from 'react'
import { Company as model } from "../../../domain/models/company"
import { Table, TableContainer, TableHead, TableRow } from "@mui/material"

type Props = {
    loadCompanyList: LoadCompanyList
}

const Company: React.FC<Props> = ({ loadCompanyList }: Props) => {

    const [companies, setCompanies] = React.useState(new Array<model>());

    useEffect(() => {
        loadCompanyList
            .loadAll()
            .then((data: model[]) => {
                setCompanies(data);
            })
    })

    return (<TableContainer>
        <Table>
            <TableHead>
                <TableRow>

                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>)
}

export default Company