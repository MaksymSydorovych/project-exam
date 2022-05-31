import Heading from "../Heading";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import ImagesContact from "../pages/ImagesContact";

export default function Admin() {
	const navigate = useNavigate();

	let user = JSON.parse(window.localStorage.getItem("auth"));

	let auth = true;

	if (!user) {
		user = "Admin";
		auth = false;
	} else {
		user = user.email;
		auth = true;
	}
	useEffect(() => {
		if (!auth) {
			navigate("/");
		}
	}, []);
	return (
		<Container className='mt-4	admin'>
			<Heading title='Amin page' />
			<div className='admin__box'>
				<Button variant='info' className='admin__button' size='lg'>
					<Link to='/admin/messages'>messages</Link>
				</Button>
				<Button variant='info' className='admin__button' size='lg'>
					<Link to='/admin/orders'>enquiries</Link>
				</Button>
				<Button variant='info' className='admin__button ' size='lg'>
					<Link to='/admin/add-establishment'>Add new establishment</Link>
				</Button>
			</div>
			<ImagesContact />
		</Container>
	);
}
