import { useMemo } from 'react';
import { useLinks } from "../hooks/useLinks";
import {Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleLoader from "./CircleLoader";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridRowParams,
} from "@mui/x-data-grid";

const LinksManager = () => {
    const [links, loading, error, removeLink] = useLinks()

    const columns = useMemo((): GridColumns => {
        return (
            [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'link', headerName: 'Link', width: 130 },
                { field: 'redirectLink', headerName: 'Redirect Link', width: 200 },
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
                        } label="Delete" onClick={() => removeLink(params)} />,
                    ],
                },
            ]
        )
    }, [removeLink]);

    if (loading) {
        return <CircleLoader />
    }

    if (error) {
        return <h1>{`ERROR: ${error}`}</h1>
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={links}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default LinksManager;