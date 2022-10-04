import Styles from './task-create-styles.scss'
import { LoadTaskList } from "../../../domain/usecases/task/load-task-list"
import { SaveTask } from "../../../domain/usecases/task/save-task"
import { DeleteTask } from "../../../domain/usecases/task/delete-task"

import React, { useEffect, useRef, useState } from 'react'
import { Customer as model } from "../../../domain/models/customer"
import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetTask } from '@/domain/usecases/task/get-task'
import { useNavigate } from 'react-router-dom'
import ThemedTextField from '@/presentation/components/inputs/ThemedTextField'
import ValidationText, { ValidationMessage } from '@/presentation/components/validationText/validationText'
import { useSelector } from 'react-redux'
import { RootState } from '@/main/store/store'

type Props = {
    validation: Validation,
    getTask: GetTask,
    saveTask: SaveTask
}

const TaskCreate: React.FC<Props> = ({ saveTask, validation }: Props) => {

    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | undefined | null>(null);
    const account = useSelector((state: RootState) => {
        return state.account;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationState, setValidationState] = useState(new Array<ValidationMessage>());
    const [task, setTask] = useState<SaveTask.Params>({ title: '', description: '', creation: new Date(), expectedTime: 0, deadline: null, creator: '' });
    
    useEffect(() => {
        if (account)
        {
            setTask({...task, creator: account ? account.userId : ''});   
        }
    }, [])

    function validate(field: string, input: SaveTask.Params): ValidationMessage | null {

        var error = validation.validate(field, input);

        if (error == null || error.length == 0) {
            return null
        }

        return {
            field: field,
            message: error
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, fields: SaveTask.Params): Promise<void> => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setValidationState([]);

            let validationErrors = new Array<ValidationMessage>();

            let fieldList = ['title', 'description'];

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

            saveTask.add(fields)
                .then((customer: SaveTask.Model) => {
                    navigate('/task', { state: customer });
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

    return (<div className={Styles.taskFormWrap}>
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
                        onClick={(() => navigate('/task'))}
                    />
                </SpeedDial>
            </Box>
        </div>
        <div className={Styles.taskCardContainer}>
            <form ref={ref => formRef.current = ref} className={Styles.taskForm} onSubmit={(element) => handleSubmit(element, task)}>
                <ThemedTextField className={Styles.taskInput}
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    color={'success'} label={'Title'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('title', validationState)}></ValidationText>
                <ThemedTextField className={Styles.taskInput}
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    color={'success'} label={'Description'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('description', validationState)}></ValidationText>

                <br/>
                <ValidationText validationMessage={getValidationErrors('default', validationState)}></ValidationText>
            </form>
        </div>
    </div>)
}

export default TaskCreate