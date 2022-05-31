import { useState, useEffect } from "react";

import MessageItem from "./MessageItem";
import { Row, Col, Container } from "react-bootstrap";

export default function MessagesList() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getMessages() {
			try {
				const response = await fetch(
					"https://wp.maksy.site/wp-json/wc/store/products/?per_page=100"
				);
				if (response.ok) {
					const json = await response.json();
					setMessages(json);
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

		getMessages();
	}, []);

	if (loading) return <div className='loader'></div>;

	if (error) return <div>An error :</div>;

	return (
		<Container>
			<Row>
				{messages
					.filter(messages => messages.prices.price == 0)
					.map(function (message) {
						const { id, sku, short_description, name, description } = message;
						return (
							<Col className='mt-3  px-1 pt-1' lg={4} md={6} key={id}>
								<MessageItem
									key={id}
									id={id}
									name={name}
									title={sku}
									email={short_description}
									message={description}
								/>
							</Col>
						);
					})}
			</Row>
		</Container>
	);
}
