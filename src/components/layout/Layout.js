import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Contact from "../pages/Contact";
import Detail from "../pages/Detail";
import MessageDetail from "../Admin/messages/MessageDetail";
import Footer from "./Footer";
import Login from "../Login";
import Accommondation from "../pages/accommondations/Accommondation";
import Heading from "../Heading";
import Admin from "../Admin/Admin";
import Orders from "../Admin/orders/Orders";
import Messages from "../Admin/messages/Messages";
import NewEstablishment from "../Admin/NewEstablishment";
import Enquirie from "../pages/Enquirie";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Nav, Container, Image, Navbar, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import OrderDetail from "../Admin/orders/OrderDetail";

function Layout() {
	const [expanded, setExpanded] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);
	const navigate = useNavigate();

	function logout() {
		setAuth(null);
		navigate("/");
		navigate(0);
	}
	return (
		<>
			<div className='layout'>
				<Navbar
					className='navigation'
					expanded={expanded}
					bg='dark'
					variant='dark'
					expand='lg'
				>
					<Container fluid>
						<Navbar.Brand as={Link} to='/' className='logo'>
							<Image className='logo__img' src={logo} rounded />
							<span className='logo__first'>Holi</span>
							<span className='logo__second'>daze</span>
						</Navbar.Brand>
						<Navbar.Toggle
							onClick={() => setExpanded(expanded ? false : "expanded")}
							aria-controls='basic-navbar-nav'
						/>
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='mr-auto '>
								<Nav.Link onClick={() => setExpanded(false)} as={Link} to='/'>
									Home
								</Nav.Link>
								<Nav.Link
									onClick={() => setExpanded(false)}
									as={Link}
									to='/contact'
								>
									Contact
								</Nav.Link>
								<Nav.Link
									onClick={() => setExpanded(false)}
									as={Link}
									to='/accommondation'
								>
									Accommodation
								</Nav.Link>
							</Nav>
							<Nav>
								{" "}
								{auth ? (
									<>
										{" "}
										<Link to='#' className='nav-link' onClick={logout}>
											Log out
										</Link>
										<NavDropdown id='basic-nav-dropdown'>
											<Link
												className='navigation__dropdown'
												to='/admin/messages'
											>
												messages
											</Link>

											<Link className='navigation__dropdown' to='/admin/orders'>
												enquiries
											</Link>

											<Link
												className='navigation__dropdown'
												to='/admin/add-establishment'
											>
												Add establishment
											</Link>
										</NavDropdown>
									</>
								) : (
									<Nav.Link
										onClick={() => setExpanded(false)}
										as={Link}
										to='/login'
									>
										Login
									</Nav.Link>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Heading />
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/login' element={<Login />} />
					<Route path='/accommondation' element={<Accommondation />} />
					<Route path='/enquirie' element={<Enquirie />} />
					<Route path='/enquirie/:id' element={<Enquirie />} />
					<Route path='/admin' element={<Admin />} />
					<Route path='/admin/orders' exact='true' element={<Orders />} />
					<Route path='/admin/messages' exact='true' element={<Messages />} />
					<Route
						path='/admin/add-establishment'
						exact='true'
						element={<NewEstablishment />}
					/>
					<Route
						path='/admin/message-detail/:id'
						exact='true'
						element={<MessageDetail />}
					/>
					<Route
						path='/admin/order-detail/:id'
						exact='true'
						element={<OrderDetail />}
					/>
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default Layout;
