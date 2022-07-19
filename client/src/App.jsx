import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import CssBaseLine from '@mui/material/CssBaseline';
import Signup from './pages/Signup';
import Board from './pages/Board';
import Login from './pages/Login';
import Home from './pages/Home';
import './css/custom-scrollbar.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSelector } from 'react-redux';

function App() {
	const dark = useSelector((state) => state.theme.value);
	const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } });
	return (
		<ThemeProvider theme={theme}>
			<CssBaseLine />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<Signup />} />
					</Route>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="boards" element={<Home />} />
						<Route path="boards/:boardId" element={<Board />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
