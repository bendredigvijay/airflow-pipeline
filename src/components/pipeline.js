import React, { useState, useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Button, TextInput, Modal } from '@mantine/core';
import { FaEdit, FaRegClone } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const data = [
  {
    "id": 1,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 2,
    "name": { "firstName": "Jane", "lastName": "Doe" },
    "environment": "Development",
    "noOfDAGs": 3,
    "createdOn": "2023-06-20",
    "createdBy": "Bob Johnson"
  },
  {
    "id": 3,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 4,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 5,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 6,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 7,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 8,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  },
  {
    "id": 9,
    "name": { "firstName": "John", "lastName": "Doe" },
    "environment": "Production",
    "noOfDAGs": 5,
    "createdOn": "2023-05-15",
    "createdBy": "Alice Smith"
  }
];

const Pipeline = () => {
  const [dataState, setDataState] = useState(data);
  const [editItem, setEditItem] = useState(null); // State for edit item
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false); // State for create modal

  const columns = useMemo(
    () => [
      { accessorKey: 'serialNo', header: 'S.No', align: 'center' }, // Serial Number column
      { accessorKey: 'name.firstName', header: 'First Name' },
      { accessorKey: 'environment', header: 'Environment' },
      { accessorKey: 'noOfDAGs', header: 'No of DAGs' },
      { accessorKey: 'createdOn', header: 'Created On' },
      { accessorKey: 'createdBy', header: 'Created By' },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <FaEdit
              onClick={() => handleEdit(row.original)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#333', marginRight: '30px' }}
            />
            <FaRegClone
              onClick={() => handleClone(row.index)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#333', marginRight: '30px' }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ cursor: 'pointer', fontSize: '1.8rem', color: 'red' }}
            />
          </div>
        ),
      },
    ],
    [dataState]
  );

  // Generate table data with serial numbers
  const tableData = useMemo(() => {
    return Array.isArray(dataState) ? dataState.map((item, index) => ({
      ...item,
      serialNo: index + 1,
    })) : [];
  }, [dataState]);

  const table = useMantineReactTable({
    columns,
    data: tableData,
    enableFullScreenToggle: false,
  });

  const handleEdit = (item) => {
    setEditItem({ ...item });
    setEditModalOpen(true);
  };

  const handleDelete = (itemId) => {
    const updatedData = dataState.filter((row) => row.id !== itemId);
    setDataState(updatedData);
  };

  const handleClone = (index) => {
    const itemToClone = dataState[index];
    const clonedItem = { ...itemToClone, id: Date.now() };
    setDataState([...dataState, clonedItem]);
  };

  const handleSaveEdit = () => {
    const updatedData = dataState.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    setDataState(updatedData);
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setEditModalOpen(false);
  };

  const handleSaveCreate = () => {
    // Handle save for create modal
    setCreateModalOpen(false);
  };

  const handleCancelCreate = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="flex-grow-1">Pipeline Dashboard</h1>
        <div className="mb-3" style={{ position: "fixed", right: 17, top: 40 }}>
          <Button onClick={() => setCreateModalOpen(true)} color="blue">
            Create
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto cbm-wrapper d-flex justify-content-center">
        <div style={{ margin: "1%" }}>
          <MantineReactTable table={table} />
        </div>
      </div>

      <Modal
        opened={editModalOpen}
        onClose={handleCancelEdit}
        title="Edit Item"
      >
        {editItem && (
          <div>
            <TextInput
              label="First Name"
              value={editItem.name.firstName}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  name: { ...editItem.name, firstName: e.target.value },
                })
              }
            />
            <TextInput
              label="Environment"
              value={editItem.environment}
              onChange={(e) =>
                setEditItem({ ...editItem, environment: e.target.value })
              }
            />
            <TextInput
              label="No of DAGs"
              value={editItem.noOfDAGs}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  noOfDAGs: parseInt(e.target.value),
                })
              }
            />
            <TextInput
              label="Created On"
              value={editItem.createdOn}
              onChange={(e) =>
                setEditItem({ ...editItem, createdOn: e.target.value })
              }
            />
            <TextInput
              label="Created By"
              value={editItem.createdBy}
              onChange={(e) =>
                setEditItem({ ...editItem, createdBy: e.target.value })
              }
            />
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleSaveEdit} style={{ marginRight: '10px' }}>
                Save
              </Button>
              <Button onClick={handleCancelEdit} color="red">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        opened={createModalOpen}
        onClose={handleCancelCreate}
        title={<h3 style={{ marginRight: '10px' , fontWeight: 'bold' }}>Setup Pipelines</h3>}
      >
        <div>
          <Button style={{ marginBottom: '10px', width: '100%' }}>Data Extraction</Button>
          <Button style={{ marginBottom: '10px', width: '100%' }}>Data Transformation</Button>
          <Button style={{ marginBottom: '10px', width: '100%' }}>Run Model</Button>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button onClick={handleCancelCreate} style={{ marginRight: '10px' }} color="red">
              Cancel
            </Button>
            <Button onClick={handleSaveCreate} >
              Save
            </Button>
          </div>
        </div>
      </Modal>


    </div>
  );
};

export default Pipeline;
