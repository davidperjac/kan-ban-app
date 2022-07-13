import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = () => {};

	return (
		<>
			<Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					disabled={loading}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="password"
					label="Password"
					name="password"
					type="password"
					disabled={loading}
				/>
				<LoadingButton
					loading={loading}
					variant="outlined"
					sx={{ mt: 3, mb: 2 }}
					fullWidth
					color="success"
					type="submit"
				>
					Login
				</LoadingButton>
			</Box>
			<Button component={Link} to="/signup" sx={{ textTransform: 'none' }}>
				Don't have an account? Signup
			</Button>
		</>
	);
};

export default Login;
