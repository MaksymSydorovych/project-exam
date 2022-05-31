import { BASE_URL } from "../../../components/constants/api";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Popular(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getData() {
			try {
				const response = await axios.get(BASE_URL + "?per_page=100");
				setData(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, []);

	if (loading) return <div className='loader'></div>;

	if (error) return <div>An error :</div>;

	return (
		<div className='d-flex my-3'>
			<Row className='popular'>
				{data
					.filter(hotels => hotels.description === props.type)
					.map(data => {
						return (
							<Col lg={3} sm={6} key={data.id}>
								<Card className='mt-4 card'>
									<Link to={`/detail/${data.id}`}>
										<Card.Img
											className='card__img'
											variant='top'
											src={data.images[0].src}
										/>
										<Card.Body>
											<Card.Title className='card-title text-center my-1'>
												{data.name}
											</Card.Title>

											<Card.Text
												dangerouslySetInnerHTML={{
													__html: `${data.prices.price}  kr`,
												}}
											></Card.Text>
											<Button variant='success'> Book a room</Button>
										</Card.Body>
									</Link>
								</Card>
							</Col>
						);
					})}
			</Row>
		</div>
	);
}
