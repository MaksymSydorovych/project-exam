import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrdersItem from "./OrdersItem";
import { Row, Col } from "react-bootstrap";

export default function OrdersList() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getOrders() {
			try {
				const response = await fetch(
					"https://wp.maksy.site/wp-json/wp/v2/enquiries"
				);
				if (response.ok) {
					const json = await response.json();
					setOrders(json);
				} else {
					setError("An error has occured.");
				}
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getOrders();
	}, []);

	if (loading) return <div>Loading...</div>;

	if (error) return <div>An error :</div>;

	return (
		<Row className='orders'>
			{orders.map(function (order) {
				const { id } = order;

				return (
					<Col className='mt-3 px-1 pt-1 orders' lg={4} md={6} key={id}>
						<Link className='orders' to={`/admin/order-detail/${id}`}>
							<OrdersItem
								key={order.id}
								title={order.title.rendered}
								full_name={order.acf.full_name}
								check_in={order.acf.check_in}
								check_out={order.acf.check_out}
								email={order.acf.email}
								phone_number={order.acf.phone_number}
							/>
						</Link>
					</Col>
				);
			})}
		</Row>
	);
}
