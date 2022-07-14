import { setUser } from '../../redux/features/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../common/Sidebar';
import Loading from '../common/Loading';
import { Box } from '@mui/material';

const AppLayout = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const checkAuth = async () => {
			const user = await authUtils.isAuthenticated();
			if (!user) {
				navigate('/login');
			} else {
				dispatch(setUser(user));
				setLoading(false);
			}
		};
		checkAuth();
	}, [navigate]);
	return loading ? (
		<Loading fullHeight />
	) : (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<Sidebar />
			<Box
				sx={{
					flexGrow: 1,
					p: 2,
					width: 'max-content',
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppLayout;
