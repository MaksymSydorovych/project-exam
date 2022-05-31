import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function MessageItem({ id, title, email, name, message }) {
	email = email.replace("<p>", "").replace("</p>", "");
	message = message.replace("<p>", "").replace("</p>", "");
	return (
		<Container>
			<Card>
				<Link to={`/admin/message-detail/${id}`}>
					<Card.Title className='text-center'>
						<h4>Subject: {email}</h4>
					</Card.Title>
					<Card.Body>
						<p>Name: {name}</p>
						<p>e-mail: {title}</p>
						<p>message: {message}</p>
					</Card.Body>
				</Link>
			</Card>
		</Container>
	);
}

MessageItem.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,

	message: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default MessageItem;
