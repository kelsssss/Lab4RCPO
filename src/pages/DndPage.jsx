import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
function DndPage() {
    const nav = useNavigate();

    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
                { id: '3', content: 'Third task' },
                { id: '4', content: 'Fourth task' },
                { id: '5', content: 'Fifth task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        done: {
            name: 'Done',
            items: [],
        },
        blocked: {
            name: 'Blocked',
            items: [],
        }
    });

    const [newTask, setNewTask] = useState('');    

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask) return;
        const updatedColumn = columns['todo'];
        const newTaskItem = {
            id: Date.now().toString(), content: newTask,
        };

        setColumns({
            ...columns,
            'todo': {
                ...updatedColumn,
                items: [...updatedColumn.items, newTaskItem],
            },
        });
        setNewTask('');
      };


    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;
        const sourceColumn = columns[source.droppableId];

        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        }
        else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    const removeItem = (columnId, itemId) => {
        const updatedColumn = columns[columnId];
        const updatedItems = updatedColumn.items.filter(item => item.id !== itemId);
    
        setColumns({
            ...columns,
            [columnId]: {
                ...updatedColumn,
                items: updatedItems,
            },
        });
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <h1>Drag And Drop Page</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task..."
                />
                <button type="submit">Add new task</button>
            </form>
            <button
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                }}
                onClick={() => nav('/')}
            >
                Back to normal
            </button>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                padding: '0 20px',
                boxSizing: 'border-box',
            }}>
                
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingBottom: '5px',
                            paddingLeft: '20px',
                        }} key={columnId}>
                            <h2>{column.name}</h2>
                            <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                    <div {...provided.droppableProps} ref={provided.innerRef}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'rgba(7, 46, 12, 0.6)' : 'rgba(17, 64, 21, 0.4)',
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500,
                                        }}>
                                        {column.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            style={{
                                                                display: 'flex',                                                                
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                userSelect: 'none',
                                                                padding: '4px',
                                                                margin: '0 0 8px 0',
                                                                minHeight: '50px',
                                                                backgroundColor: snapshot.isDragging ? 'rgba(20, 78, 16, 0.5)' : 'rgba(42, 206, 30, 0.5)',
                                                                borderRadius: '5px',
                                                                color: 'white',
                                                                ...provided.draggableProps.style,
                                                            }}>
                                                            {item.content}
                                                            <button
                                                                style={{
                                                                    backgroundColor: '#006400',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '3px',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={() => removeItem(columnId, item.id)}
                                                                >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        ))} 
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                            </Droppable>
                        </div>
                    );
                })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default DndPage;