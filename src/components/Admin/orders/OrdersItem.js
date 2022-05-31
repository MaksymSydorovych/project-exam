import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

function OrdersItem({
	title,
	check_in,
	check_out,
	full_name,
	email,
	phone_number,
	image,
}) {
	return (
		<Container className='orders'>
			<h4>{title}</h4>
			<h5>{full_name}</h5>
			<p>tlf: {phone_number}</p>
			<p>coming day:</p>
			<p className='checkin'> {check_in}</p>
			<p>leaving day:</p>
			<p className='checkout'>{check_out}</p>
			<p>{email}</p>
		</Container>
	);
}

OrdersItem.propTypes = {
	title: PropTypes.string.isRequired,
	check_in: PropTypes.string.isRequired,
	check_out: PropTypes.string.isRequired,
	full_name: PropTypes.string.isRequired,
	phone_number: PropTypes.string.isRequired,
};

export default OrdersItem;
