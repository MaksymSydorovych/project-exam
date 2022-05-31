import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import logo from "../../images/logo.svg";

function Footer() {
	return (
		<footer className='footer'>
			<Container className='text-center'>
				<Row xs={1} md={2} lg={4}>
					<Col>
						<a href='/'>
							<img className='logo__img' src={logo} alt='Logo' />
						</a>
					</Col>
					<Col>
						<ul className='list-unstyled'>
							<li>
								<a href='.'>Explore Bergen</a>
							</li>
							<li>
								<a href='.'>Travel Information</a>
							</li>
							<li>
								<a href='.'>Attractions</a>
							</li>
							<li>
								<a href='.'>Event Venues</a>
							</li>
						</ul>
					</Col>
					<Col>
						<ul className='list-unstyled'>
							<li>
								<a href='.'>About Us</a>
							</li>
							<li>
								<a href='.'>Reviews</a>
							</li>
						</ul>
					</Col>
					<Col>
						<ul className='list-unstyled'>
							<li>
								<a href='./Contact'>Contact</a>
							</li>
							<li>
								<a href='.'>Cancellation Options</a>
							</li>
							<li>
								<a href='.'>Payment</a>
							</li>
							<li>
								<a href='.'>FAQ</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
