import { useSelector, useDispatch } from 'react-redux';
import {
	Drawer,
	IconButton,
	List,
	Typography,
	Box,
	ListItem,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import assets from '../../assets/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import boardApi from '../../api/boardApi';
import { setBoards } from '../../redux/features/boardSlice';

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.value);
	const boards = useSelector((state) => state.board.value);
	const { boardId } = useParams();
	const sidebarWidth = 250;

	useEffect(() => {
		const getBoards = async () => {
			try {
				const res = await boardApi.getAll();
				dispatch(setBoards(res));
				if (res.length > 0 && boardId === undefined) {
					navigate(`/boards/${res[0]._id}`);
				}
			} catch (err) {
				alert(err);
			}
		};
		getBoards();
	}, []);

	useEffect(() => {
		console.log(boards);
	}, [boards]);

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<Drawer
			container={window.document.body}
			variant="permanent"
			open={true}
			sx={{
				width: sidebarWidth,
				height: '100%',
				'& > div': { borderRight: 'none' },
			}}
		>
			<List
				disablePadding
				sx={{
					width: sidebarWidth,
					height: '100vh',
					backgroundColor: assets.colors.secondary,
				}}
			>
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2" fontWeight="700">
							{user.username}
						</Typography>
						<IconButton onClick={logout}>
							<LogoutOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: '10px' }} />
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2" fontWeight="700">
							Favourites
						</Typography>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: '10px' }} />
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2" fontWeight="700">
							Private
						</Typography>
						<IconButton>
							<AddBoxOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Sidebar;
