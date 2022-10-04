import Styles from './task-create-styles.scss'
import { LoadTaskList } from "../../../domain/usecases/task/load-task-list"
import { SaveTask } from "../../../domain/usecases/task/save-task"
import { DeleteTask } from "../../../domain/usecases/task/delete-task"

import React, { useEffect, useRef, useState } from 'react'
import { Task as model } from "../../../domain/models/task"
import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Validation } from "@/presentation/protocols/validation"
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetTask } from '@/domain/usecases/task/get-task'
import { useNavigate, useParams } from 'react-router-dom'
import ThemedTextField from '@/presentation/components/inputs/ThemedTextField'
import ValidationText, { ValidationMessage } from '@/presentation/components/validationText/validationText'

type Props = {
    validation: Validation,
    getTask: GetTask,
    saveTask: SaveTask
}

const TaskUpdate: React.FC<Props> = ({ saveTask, getTask, validation }: Props) => {

    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | undefined | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [validationState, setValidationState] = useState(new Array<ValidationMessage>());
    const [task, setTask] = useState<SaveTask.Model>({ title: '', description: '', creation: new Date(), expectedTime: 0, deadline: null, creator: '', realTime: 0, _id: '' });
    const { id } = useParams<string>();

    useEffect(() => {
        if (id) {
            try {
                getTask
                    .get(id)
                    .then((taskResult) => {
                        setTask(taskResult);
                    })
                    .catch(() => {
                        navigate('/task')
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (error: any) {
                navigate('/task');
            }
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, fields: SaveTask.Model): Promise<void> => {
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

            saveTask.edit(fields)
                .then((task: SaveTask.Model) => {
                    navigate('/task', { state: task });
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
                        onClick={(() => navigate('/task'))}
                    />
                </SpeedDial>
            </Box>
        </div>
        <div className={Styles.customerCardContainer}>
            <form ref={ref => formRef.current = ref} className={Styles.customerForm} onSubmit={(element) => handleSubmit(element, task)}>
                <ThemedTextField className={Styles.customerInput}
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    color={'success'} label={'Name'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('name', validationState)}></ValidationText>
                <ThemedTextField className={Styles.customerInput}
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    color={'success'} label={'Description'} disabled={isLoading} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('description', validationState)}></ValidationText>

                <br />
                <ValidationText validationMessage={getValidationErrors('default', validationState)}></ValidationText>
            </form>
        </div>
    </div>)
}

export default TaskUpdate