import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Validation from "../Validation";
import { Link } from "react-router-dom";
import CreateToken from "../CreateToken";
import axios from "axios";
import ImagesContact from "./ImagesContact";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Heading from "../Heading";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
	full_name: yup
		.string()
		.required("Please enter a name")
		.min(4, "Minimum 4 characters"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please enter an email address"),
	phone_number: yup.string().matches(phoneRegExp, "Phone number is not valid"),
	check_in: yup
		.date()
		.required("Choose an arrival date")
		.typeError("Choose your arrival date"),
	check_out: yup
		.date()
		.required("Choose your departure date")
		.typeError("Choose your departure date"),
});

function Enquirie() {
	const [hotel, setHotel] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingHotel, setFetchingHotel] = useState(true);
	const [updatingHotel, setUpdatingHotel] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	let history = useNavigate();

	let { id } = useParams();

	if (!id) {
		history("/accommondation");
	}
	const orderUrl = "https://wp.maksy.site/wp-json/wp/v2/enquiries";
	const url = "https://wp.maksy.site/wp-json/wc/store/products/" + id;

	useEffect(
		function () {
			async function getHotel() {
				try {
					const response = await axios.get(url);
					setHotel(response.data);
				} catch (error) {
					setFetchError("An error has occured");
				} finally {
					setFetchingHotel(false);
				}
			}
			getHotel();
		},
		[url]
	);

	const token = CreateToken();
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};

	async function onSubmit(data) {
		setUpdatingHotel(true);
		setUpdateError(null);
		setUpdated(false);

		const enquiry = {
			title: data.title,
			image: data.sku,
			content: "",
			status: "publish",
			fields: {
				full_name: data.full_name,
				email: data.email,
				phone_number: data.phone_number,
				check_in: data.check_in,
				check_out: data.check_out,
				settlers: data.settlers,
			},
		};

		try {
			await axios.post(orderUrl, enquiry, { headers });
			setUpdated(true);
		} catch (error) {
			setUpdateError("An error has occured");
		} finally {
			setUpdatingHotel(false);
		}
	}

	if (fetchingHotel) {
		return (
			<div className='loader-container flex-mid'>
				<div className='loader'></div>
			</div>
		);
	}
	if (fetchError) {
		return (
			<div className='loader-container flex-mid'>
				<p className='error'>{fetchError}</p>
			</div>
		);
	}

	if (updated) {
		return (
			<Container>
				{" "}
				<Alert className='mt-4 d-flex' variant='success'>
					{" "}
					<h4>
						Booking for {hotel.name} {"   "}complete!
					</h4>
					<Link className='mx-4' to='/'>
						Go Back
					</Link>
				</Alert>
			</Container>
		);
	}

	return (
		<Container className='text-center'>
			<Heading title='Booking' />
			<Form onSubmit={handleSubmit(onSubmit)} className='form'>
				<fieldset disabled={updatingHotel}>
					<Form.Group>
						Accommodation
						<Form.Control
							className='mt-3'
							{...register("title")}
							name='title'
							defaultValue={hotel.name}
							readOnly='readonly'
						/>
					</Form.Group>

					<Form.Group>
						Full Name
						<Form.Control
							className='mt-3'
							{...register("full_name")}
							name='full_name'
							placeholder='Your full name..'
						/>
						{errors.full_name && (
							<Validation>{errors.full_name.message}</Validation>
						)}
					</Form.Group>

					<Form.Group>
						Email
						<Form.Control
							className='mt-3'
							{...register("email")}
							name='email'
							placeholder='Email address..'
						/>
						{errors.email && <Validation>{errors.email.message}</Validation>}
					</Form.Group>

					<Form.Group>
						Phone Number
						<Form.Control
							className='mt-3'
							{...register("phone_number")}
							name='phone_number'
							placeholder='Phone Number..'
						/>
						{errors.phone_number && (
							<Validation>{errors.phone_number.message}</Validation>
						)}
					</Form.Group>

					<div className='date-container'>
						<Form.Group>
							Arrival
							<Form.Control
								className='mt-3'
								{...register("check_in")}
								name='check_in'
								type='date'
							/>
							{errors.check_in && (
								<Validation>{errors.check_in.message}</Validation>
							)}
						</Form.Group>

						<Form.Group>
							Departure
							<Form.Control
								className='mt-3'
								{...register("check_out")}
								name='check_out'
								type='date'
							/>
							{errors.check_out && (
								<Validation>{errors.check_out.message}</Validation>
							)}
						</Form.Group>
					</div>
					<Button
						variant='primary'
						type='submit'
						className='mt-4'
						disabled={updatingHotel}
					>
						{updatingHotel ? "Booking.." : "Book"}
					</Button>

					{updateError && <div className='invalid-error'>{updateError}</div>}
				</fieldset>
			</Form>
			<ImagesContact />
		</Container>
	);
}

export default Enquirie;
