import Styles from './customer-create-styles.scss'
import { LoadCustomerList } from "../../../domain/usecases/customer/load-customer-list"
import { SaveCustomer } from "../../../domain/usecases/customer/save-customer"
import { DeleteCustomer } from "../../../domain/usecases/customer/delete-customer"

import React, { useEffect, useRef, useState } from 'react'
import { Customer as model } from "../../../domain/models/customer"
import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetCustomer } from '@/domain/usecases/customer/get-customer'
import { useNavigate } from 'react-router-dom'
import ThemedTextField from '@/presentation/components/inputs/ThemedTextField'
import ValidationText, { ValidationMessage } from '@/presentation/components/validationText/validationText'

type Props = {
    validation: Validation,
    getCustomer: GetCustomer,
    saveCustomer: SaveCustomer
}

const CustomerCreate: React.FC<Props> = ({ saveCustomer, validation }: Props) => {

    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | undefined | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [validationState, setValidationState] = useState(new Array<ValidationMessage>());
    const [customer, setCustomer] = useState<SaveCustomer.Params>({ name: '', description: '' });

    useEffect(() => {
    }, [])

    function validate(field: string, input: SaveCustomer.Params): ValidationMessage | null {

        var error = validation.validate(field, input);

        if (error == null || error.length == 0) {
            return null
        }

        return {
            field: field,
            message: error
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, fields: SaveCustomer.Params): Promise<void> => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setValidationState([]);

            let validationErrors = new Array<ValidationMessage>();

            let fieldList = ['name', 'description'];

            fieldList.forEach((item) => {
                let validationResult = validate(item, fields)

                if (validationResult) {
                    validationErrors.push(validationResult);
                }
            });

            if (validationErrors.length > 0) {
                setValidationState(validationErrors);
                setIsLoading(false);
                return;
            }

            saveCustomer.add(fields)
                .then((customer: SaveCustomer.Model) => {
                    navigate('/customer', { state: customer });
                })
                .catch((error) => {
                    if (error && error.message) {
                        setValidationState(state => [...state, { field: 'default', message: error.message } as ValidationMessage]);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });

        } catch (error: any) {
            if (error && error.message) {
                setValidationState(state => [...state, { field: 'default', message: error.message } as ValidationMessage]);
            }
        }
    }

    const getValidationErrors = (fieldName: string, validationErrors: ValidationMessage[]) => {

        if (validationErrors == null || validationErrors.length <= 0) {
            return undefined;
        }

        var errors = validationErrors.filter((item) => {
            return item.field == fieldName;
        });

        if (errors != null && errors.length > 0) {
            return errors[0];
        }

        return undefined;
    }

    return (<div className={Styles.customerFormWrap}>
        <div className={Styles.optionsWrap}>
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key={"Save"}
                        icon={<SaveIcon />}
                        tooltipTitle={"Save"}
                        onClick={() => formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))}
                    />

                    <SpeedDialAction
                        key={"Cancel"}
                        icon={<CancelIcon />}
                        tooltipTitle={"Cancel"}
                        onClick={(() => navigate('/customer'))}
                    />
                </SpeedDial>
            </Box>
        </div>
        <div className={Styles.customerCardContainer}>
            <form ref={ref => formRef.current = ref} className={Styles.customerForm} onSubmit={(element) => handleSubmit(element, customer)}>
                <ThemedTextField className={Styles.customerInput}
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    color={'success'} label={'Name'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('name', validationState)}></ValidationText>
                <ThemedTextField className={Styles.customerInput}
                    value={customer.description}
                    onChange={(e) => setCustomer({ ...customer, description: e.target.value })}
                    color={'success'} label={'Description'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('description', validationState)}></ValidationText>

                <br/>
                <ValidationText validationMessage={getValidationErrors('default', validationState)}></ValidationText>
            </form>
        </div>
    </div>)
}

export default CustomerCreate