import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Heading from "../../Heading";

export default function MessageDetail() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();
	if (!id) {
		navigate("/");
	}

	const url = "https://wp.maksy.site/wp-json/wc/store/products/" + id;

	useEffect(
		function () {
			async function getData() {
				try {
					const response = await axios.get(url);

					setData(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			getData();
		},

		[url]
	);

	if (loading) return <div className='.loader'></div>;

	if (error) return <div>An error :</div>;

	return (
		<Container className='mt-4'>
			<Heading title='Detail' />
			<Link to='/admin/messages' className='update-link'>
				Back
			</Link>
			<Card className='detail'>
				<Card.Title className='card-title text-center my-3'>
					{data.name}
				</Card.Title>
				<Card.Title className='card-title text-center my-3'>
					{data.sku}
				</Card.Title>
				<Card.Body className='detail__body'>
					<Card.Text
						dangerouslySetInnerHTML={{
							__html: `${data.short_description}`,
						}}
					></Card.Text>
					<Card.Text
						dangerouslySetInnerHTML={{
							__html: `${data.description}`,
						}}
					></Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
}
