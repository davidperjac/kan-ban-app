import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import { useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';
import Loading from '../common/Loading';
import { Box } from '@mui/material';

const AppLayout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const checkAuth = async () => {
			const user = await authUtils.isAuthenticated();
			if (!user) {
				navigate('/');
			} else {
				//save user
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
			<Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppLayout;
