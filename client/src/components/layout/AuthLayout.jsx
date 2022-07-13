import { useNavigate, Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import authUtils from '../../utils/authUtils';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';

const AuthLayout = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const isAuth = await authUtils.isAuthenticated();
			if (!isAuth) {
				setLoading(false);
			} else {
				navigate('/');
			}
		};
		checkAuth();
	}, [navigate]);

	return loading ? (
		<Loading fullHeight />
	) : (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<h1>KanBan App</h1>
				<Outlet />
			</Box>
		</Container>
	);
};

export default AuthLayout;
