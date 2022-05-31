import Container from "react-bootstrap/Container";
import Heading from "../Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Validation from "../Validation";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import CreateToken from "../CreateToken";
import ImagesContact from "./ImagesContact";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Please enter your name")
		.min(4, "The name must be at least 4 characters"),
	sku: yup
		.string()
		.required("Please enter an email ")
		.email("Please enter a valid email "),
	short_description: yup.string().required("Please choose a subject"),
	description: yup
		.string()
		.required("Please enter your message")
		.min(10, "The name must be at least 10 characters"),
});

export default function Contact() {
	const [sending, setSending] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const url = "https://wp.maksy.site/wp-json/wc/v3/products";
	const token = CreateToken();
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
	async function onSubmit(data) {
		setSending(true);

		try {
			const response = await axios.post(url, data, { headers });
			console.log("response", response.data);

			reset();
			setSubmitted(true);
		} catch (error) {
			console.log(error);
		} finally {
			setSending(false);
		}
	}

	return (
		<Container>
			<Heading title='Contact' />

			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>
						Name should contain minium 4 letters
					</Form.Text>
					<Form.Control placeholder='Name' {...register("name")} />
					{errors.name && (
						<Validation>Name should contain minium 4 letters</Validation>
					)}
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Enter valid e-mail</Form.Text>
					<Form.Control type='Email' placeholder='Email' {...register("sku")} />
					{errors.short_description && (
						<Validation>Enter valid e-mail</Validation>
					)}
				</Form.Group>{" "}
				<Form.Group>
					<Form.Label>Subject</Form.Label>
					<Form.Control
						name='subject'
						{...register("short_description")}
						as='select'
					>
						<option value=''>Subject..</option>
						<option value='Booking'>Booking</option>
						<option value='Payment'>Payment</option>
						<option value='Cancellation'>Cancellation</option>
						<option value='Other'>Other</option>
					</Form.Control>
					{errors.sku && <Validation>choose subject</Validation>}
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Write your message</Form.Text>
					<Form.Control placeholder='message' {...register("description")} />
					{errors.description && (
						<Validation>Message should contain minium 10 letters</Validation>
					)}
				</Form.Group>
				{submitted && (
					<Alert className='mt-4' variant='success'>
						Your message was successfully sent. We will contact you shortly!
						<Link className='mx-4' to='/'>
							Go Back
						</Link>
					</Alert>
				)}
				<Button variant='primary' type='submit' className='mt-4'>
					{sending ? "Sending.." : "Send"}
				</Button>
			</Form>

			<ImagesContact />
		</Container>
	);
}
