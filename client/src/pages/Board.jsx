import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import boardApi from '../api/boardApi';
import { Box, IconButton, TextField } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EmojiPicker from '../components/common/EmojiPicker';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouriteList } from '../redux/features/favouritesSlice';
import Kanban from '../components/common/Kanban';
import LightModeIcon from '@mui/icons-material/LightMode';
import { setBoards } from '../redux/features/boardSlice.js';
import { setTheme } from '../redux/features/themeSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';

let timer;
const timeout = 500;

const Board = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [sections, setSections] = useState([]);
	const [isFavourite, setIsFavourite] = useState(false);
	const [icon, setIcon] = useState('');
	const { boardId } = useParams();
	const boards = useSelector((state) => state.board.value);
	const favouriteList = useSelector((state) => state.favourites.value);
	const theme = useSelector((state) => state.theme.value);

	useEffect(() => {
		const getBoard = async () => {
			try {
				const res = await boardApi.getOne(boardId);
				const { title, description, sections, favourite, icon } = res;
				setTitle(title);
				setDescription(description);
				setSections(sections);
				setIsFavourite(favourite);
				setIcon(icon);
			} catch (err) {
				console.log(err);
			}
		};
		getBoard();
	}, [boardId]);

	const onIconChange = async (newIcon) => {
		let temp = [...boards];
		const index = temp.findIndex((e) => e._id === boardId);
		temp[index] = { ...temp[index], icon: newIcon };

		if (isFavourite) {
			let tempFavourite = [...favouriteList];
			const favouriteIndex = tempFavourite.findIndex((e) => e._id === boardId);
			tempFavourite[favouriteIndex] = {
				...temp[favouriteIndex],
				icon: newIcon,
			};
			dispatch(setFavouriteList(tempFavourite));
		}

		setIcon(newIcon);
		dispatch(setBoards(temp));
		try {
			await boardApi.update(boardId, { icon: newIcon });
		} catch (err) {
			alert(err);
		}
	};

	const updateTitle = async (e) => {
		clearTimeout(timer);
		const newTitle = e.target.value;
		setTitle(newTitle);

		let temp = [...boards];
		const index = temp.findIndex((e) => e._id === boardId);
		temp[index] = { ...temp[index], title: newTitle };
		dispatch(setBoards(temp));

		if (isFavourite) {
			let tempFavourite = [...favouriteList];
			const favouriteIndex = tempFavourite.findIndex((e) => e._id === boardId);
			tempFavourite[favouriteIndex] = {
				...tempFavourite[favouriteIndex],
				title: newTitle,
			};
			dispatch(setFavouriteList(tempFavourite));
		}

		timer = setTimeout(async () => {
			try {
				await boardApi.update(boardId, { title: newTitle });
			} catch (err) {
				alert(err);
			}
		}, timeout);
	};

	const updateDescription = async (e) => {
		clearTimeout(timer);
		const newDescription = e.target.value;
		setDescription(newDescription);

		let temp = [...boards];
		const index = temp.findIndex((e) => e._id === boardId);
		temp[index] = { ...temp[index], description: newDescription };
		dispatch(setBoards(temp));

		timer = setTimeout(async () => {
			try {
				await boardApi.update(boardId, { description: newDescription });
			} catch (err) {
				alert(err);
			}
		}, timeout);
	};

	const addFavourite = async () => {
		try {
			const board = await boardApi.update(boardId, { favourite: !isFavourite });
			let newFavouriteList = [...favouriteList];
			if (isFavourite) {
				newFavouriteList = newFavouriteList.filter((e) => e._id !== boardId);
			} else {
				newFavouriteList.unshift(board);
			}
			dispatch(setFavouriteList(newFavouriteList));
			setIsFavourite(!isFavourite);
		} catch (err) {
			alert(err);
		}
	};

	const deleteBoard = async () => {
		try {
			await boardApi.delete(boardId);
			if (isFavourite) {
				const newFavouriteList = favouriteList.filter((e) => e._id !== boardId);
				dispatch(setFavouriteList(newFavouriteList));
			}
			const newList = boards.filter((e) => e._id !== boardId);
			if (newList.length === 0) {
				navigate('/boards');
			} else {
				navigate(`/boards/${newList[0]._id}`);
			}
			dispatch(setBoards(newList));
		} catch (err) {
			alert(err);
		}
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<IconButton variant="outlined" onClick={addFavourite}>
					{isFavourite ? (
						<StarOutlinedIcon color="warning" />
					) : (
						<StarBorderOutlinedIcon />
					)}
				</IconButton>
				<IconButton
					aria-label="delete"
					size="large"
					onClick={() => dispatch(setTheme(!theme))}
				>
					{theme ? (
						<DarkModeIcon fontSize="inherit" />
					) : (
						<LightModeIcon fontSize="inherit" />
					)}
				</IconButton>
				<IconButton variant="outlined" color="error" onClick={deleteBoard}>
					<DeleteOutlinedIcon />
				</IconButton>
			</Box>
			<Box sx={{ padding: '10px 50px' }}>
				<Box>
					<EmojiPicker icon={icon} onChange={onIconChange} />
					<TextField
						value={title}
						onChange={updateTitle}
						placeholder="Untitled"
						variant="outlined"
						fullWidth
						sx={{
							'& .MuiOutlinedInput-input': { padding: 0 },
							'& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
							'& .MuiOutlinedInput-root': {
								fontSize: '2rem',
								fontWeight: '700',
							},
						}}
					/>
					<TextField
						value={description}
						onChange={updateDescription}
						placeholder="Add a description"
						variant="outlined"
						multiline
						fullWidth
						sx={{
							'& .MuiOutlinedInput-input': { padding: 0 },
							'& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
							'& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
						}}
					/>
				</Box>
				<Box>
					<Kanban data={sections} boardId={boardId} />
				</Box>
			</Box>
		</>
	);
};

export default Board;
