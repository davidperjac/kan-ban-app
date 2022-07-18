import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
	Box,
	Button,
	Typography,
	Divider,
	TextField,
	IconButton,
	Card,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useEffect, useState } from 'react';
import sectionApi from '../../api/sectionApi';

let timer;
const timeout = 500;

const Kanban = (props) => {
	const boardId = props.boardId;
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const onDragEnd = () => {};

	const createSection = async () => {
		try {
			const section = await sectionApi.create(boardId);
			setData([...data, section]);
		} catch (err) {
			alert(err);
		}
	};

	const deleteSection = async (sectionId) => {
		try {
			await sectionApi.delete(boardId, sectionId);
			const newData = [...data].filter((e) => e._id !== sectionId);
			setData(newData);
		} catch (err) {
			alert(err);
		}
	};

	const updateSectionTitle = async (e, sectionId) => {
		clearTimeout(timer);
		const newTitle = e.target.value;
		const newData = [...data];
		const index = newData.findIndex((e) => e._id === sectionId);
		newData[index].title = newTitle;
		setData(newData);
		timer = setTimeout(async () => {
			try {
				await sectionApi.update(boardId, sectionId, { title: newTitle });
			} catch (err) {
				alert(err);
			}
		}, timeout);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Button onClick={createSection}>Add section</Button>
				<Typography variant="body2" fontWeight="700">
					{data.length} Sections
				</Typography>
			</Box>
			<Divider sx={{ margin: '10px 0' }} />
			<DragDropContext onDragEnd={onDragEnd}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						width: 'calc(100vw - 400px)',
						overflowX: 'auto',
					}}
				>
					{data.map((section) => (
						<div key={section._id} style={{ width: '300px' }}>
							<Droppable key={section._id} droppableId={section._id}>
								{(provided) => (
									<Box
										ref={provided.innerRef}
										{...provided.droppableProps}
										sx={{
											width: '300px',
											padding: '10px',
											marginRight: '10px',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												marginBottom: '10px',
											}}
										>
											<TextField
												value={section.title}
												onChange={(e) => updateSectionTitle(e, section._id)}
												placeholder="Untitled"
												variant="outlined"
												sx={{
													flexGrow: 1,
													'& .MuiOutlinedInput-input': { padding: 0 },
													'& .MuiOutlinedInput-notchedOutline': {
														border: 'unset ',
													},
													'& .MuiOutlinedInput-root': {
														fontSize: '1rem',
														fontWeight: '700',
													},
												}}
											/>
											<IconButton
												variant="outlined"
												size="small"
												sx={{
													color: 'gray',
													'&:hover': { color: 'green' },
												}}
												// onClick={() => createTask(section.id)}
											>
												<AddOutlinedIcon />
											</IconButton>
											<IconButton
												variant="outlined"
												size="small"
												sx={{
													color: 'gray',
													'&:hover': { color: 'red' },
												}}
												onClick={() => deleteSection(section._id)}
											>
												<DeleteOutlinedIcon />
											</IconButton>
										</Box>
										{/* tasks */}
										{section.tasks.map((task, index) => (
											<Draggable
												key={task.id}
												draggableId={task.id}
												index={index}
											>
												{(provided, snapshot) => (
													<Card
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														sx={{
															padding: '10px',
															marginBottom: '10px',
															cursor: snapshot.isDragging
																? 'grab'
																: 'pointer!important',
														}}
														// onClick={() => setSelectedTask(task)}
													>
														<Typography>
															{task.title === '' ? 'Untitled' : task.title}
														</Typography>
													</Card>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</Box>
								)}
							</Droppable>
						</div>
					))}
				</Box>
			</DragDropContext>
			{/* <TaskModal
				task={selectedTask}
				boardId={boardId}
				onClose={() => setSelectedTask(undefined)}
				onUpdate={onUpdateTask}
				onDelete={onDeleteTask}
			/> */}
		</>
	);
};

export default Kanban;
