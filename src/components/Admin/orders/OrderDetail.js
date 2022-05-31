import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Heading from "../../Heading";
import { Link } from "react-router-dom";

export default function OrderDetail() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();
	if (!id) {
		navigate("/");
	}

	const url = "https://wp.maksy.site/wp-json/wp/v2/enquiries/" + id;

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
	console.log(data);
	return (
		<Container className='mt-4'>
			<Heading title='Detail' />
			<Link to='/admin/orders' className='update-link'>
				Back
			</Link>
			<Card className='detail'>
				<Card.Title className='card-title text-center my-3'>
					{data.title.rendered}
				</Card.Title>

				<Card.Body className='detail__body '>
					<Card.Text
						className='text-center'
						dangerouslySetInnerHTML={{
							__html: `${data.acf.full_name}`,
						}}
					></Card.Text>
					<Card.Text
						className='text-center'
						dangerouslySetInnerHTML={{
							__html: `${data.acf.email}`,
						}}
					></Card.Text>
					<Card.Text
						className='text-center'
						dangerouslySetInnerHTML={{
							__html: `${data.acf.phone_number}`,
						}}
					></Card.Text>{" "}
					<div className='d-flex justify-content-center'>
						<div className='mx-4'>
							<p>coming day:</p>
							<p className='checkin'> {data.acf.check_in}</p>
						</div>
						<div className='mx-4'>
							{" "}
							<p>leaving day:</p>
							<p className='checkout '>{data.acf.check_out}</p>
						</div>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}
