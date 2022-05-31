import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/api";
import Heading from "../Heading";
import { Link } from "react-router-dom";

export default function Detail() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();
	if (!id) {
		navigate("/");
	}

	const url = BASE_URL + "/" + id;

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
			<Card className='detail'>
				<Card.Title className='card-title text-center my-3'>
					{data.name}
				</Card.Title>
				<div className='detatil__img d-flex justify-content-center'>
					<Card.Img
						className='detail__img--item my-3'
						variant='top'
						src={data.sku}
					/>
				</div>
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
					<div className='detail__link'>
						<Button
							variant='primary'
							type='submit'
							className='mt-4 text-center'
						>
							<Link className='detail__link--a' to={`../enquirie/${id}`}>
								Book
							</Link>
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}
