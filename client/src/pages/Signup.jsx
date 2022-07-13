import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authApi from '../api/authApi';

const Signup = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [usernameErrText, setUsernameErrText] = useState('');
	const [passwordErrText, setPasswordErrText] = useState('');
	const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUsernameErrText('');
		setPasswordErrText('');
		setConfirmPasswordErrText('');

		const data = new FormData(e.target);
		const username = data.get('username').trim();
		const password = data.get('password').trim();
		const confirmPassword = data.get('confirmPassword').trim();

		let err = false;

		if (username === '') {
			err = true;
			setUsernameErrText('Please fill this field');
		}
		if (password === '') {
			err = true;
			setPasswordErrText('Please fill this field');
		}
		if (confirmPassword === '') {
			err = true;
			setConfirmPasswordErrText('Please fill this field');
		}
		if (password !== confirmPassword) {
			err = true;
			setConfirmPasswordErrText('Passwords do not match');
		}

		if (err) {
			return;
		}

		setLoading(true);

		try {
			const res = await authApi.signup({
				username,
				password,
				confirmPassword,
			});
			console.log(res);
			setLoading(false);
			localStorage.setItem('token', res.token);
			navigate('/');
		} catch (err) {
			const errors = err.data.errors;
			errors.forEach((e) => {
				if (e.param === 'username') {
					setUsernameErrText(e.msg);
				}
				if (e.param === 'password') {
					setPasswordErrText(e.msg);
				}
				if (e.param === 'confirmPassword') {
					setConfirmPasswordErrText(e.msg);
				}
			});
			setLoading(false);
		}
	};

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
					error={usernameErrText !== ''}
					helperText={usernameErrText}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="password"
					label="Password"
					type="password"
					name="password"
					disabled={loading}
					error={passwordErrText !== ''}
					helperText={passwordErrText}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="confirmPassword"
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					disabled={loading}
					error={confirmPasswordErrText !== ''}
					helperText={confirmPasswordErrText}
				/>
				<LoadingButton
					loading={loading}
					variant="outlined"
					sx={{ mt: 3, mb: 2 }}
					fullWidth
					color="success"
					type="submit"
				>
					Signup
				</LoadingButton>
			</Box>
			<Button component={Link} to="/login" sx={{ textTransform: 'none' }}>
				Already have an account? Login
			</Button>
		</>
	);
};

export default Signup;
