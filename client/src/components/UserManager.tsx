import { useMemo } from 'react';
import { useUsers } from "../hooks/useUsers";
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import CircleLoader from "./CircleLoader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserManager = () => {
    const [users, loading, error, removeUser] = useUsers()

    const columns = useMemo((): GridColumns => {
        return (
            [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'email', headerName: 'Email Address', width: 130 },
                { field: 'password', headerName: 'Password Hash', width: 200 },
                {
                    field: 'createdAt',
                    headerName: 'Created',
                    width: 200,
                    type: 'dateTime',
                    valueGetter: ({ value }) => {
                        const date = new Date(value)
                        return `${date.toDateString()} | ${date.toLocaleTimeString()}`
                    },
                },
                {
                    field: 'actions',
                    headerName: 'Actions',
                    type: 'actions',
                    width: 100,
                    getActions: (params: GridRowParams) => [
                        <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
                        <GridActionsCellItem icon={
                            <Tooltip title="Delete">
                                <DeleteIcon />
                            </Tooltip>
                        } label="Delete" onClick={() => removeUser(params)} />,
                    ],
                },
            ]
        )
    }, [removeUser]);

    if (loading) {
        return <CircleLoader />
    }

    if (error) {
        return <h1>{`ERROR: ${error}`}</h1>
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default UserManager;