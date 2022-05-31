import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function AccommondationItem({ id, title, image, price, type }) {
	return (
		<Container className='d-flex px=0'>
			<Card className='mt-4 card'>
				<Link to={`/detail/${id}`}>
					<Card.Img
						className='card__img'
						variant='top'
						src={image}
						alt={title}
					/>
					<Card.Body>
						<Card.Title className='card-title text-center my-1'>
							{title}
						</Card.Title>{" "}
						<Card.Text
							dangerouslySetInnerHTML={{
								__html: `${price}  kr`,
							}}
						></Card.Text>
						<Card.Text
							dangerouslySetInnerHTML={{
								__html: `${type}`,
							}}
						></Card.Text>
						<Button variant='success'> Book a room</Button>
					</Card.Body>
				</Link>
			</Card>
		</Container>
	);
}

AccommondationItem.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default AccommondationItem;
