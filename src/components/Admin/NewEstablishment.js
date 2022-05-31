import { Container, Alert } from "react-bootstrap";
import Heading from "../Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Validation from "../Validation";
import { useState } from "react";
import axios from "axios";
import CreateToken from "../CreateToken";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Please enter your name")
		.min(4, "The name must be at least 4 characters"),
	description: yup.string().required("Please choose a type"),
	short_description: yup
		.string()
		.required("Description ")
		.min(10, "Description should contain at least 10 characters"),

	regular_price: yup.string().required("Please enter a price per day"),
	sku: yup
		.string()
		.url("Please enter a valid url")
		.required("Please enter image url"),
});

export default function NewEstablishment() {
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
			console.log("error", error);
		} finally {
			setSending(false);
		}
	}
	if (submitted) {
		return (
			<Container>
				{" "}
				<Alert className='mt-4 d-flex' variant='success'>
					{" "}
					<h4>Complete!</h4>
					<Link className='mx-4' to='/admin'>
						Go Back
					</Link>
				</Alert>
			</Container>
		);
	}
	return (
		<Container>
			<Heading title='Add new establishment' />

			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Name of accommondation</Form.Text>
					<Form.Control placeholder='Name of place' {...register("name")} />
					{errors.name && (
						<Validation>Name should contain minium 4 letters</Validation>
					)}
				</Form.Group>{" "}
				<Form.Group>
					<Form.Label>Choose type</Form.Label>
					<Form.Control
						name='categories'
						{...register("description")}
						as='select'
					>
						<option value=''>select categories...</option>
						<option value='Hotel'>Hotel</option>
						<option value='Guesthouse'>Guesthouse</option>
						<option value='B and B'>B and B</option>
					</Form.Control>
					{errors.description && <Validation>Choose type</Validation>}
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Enter some description</Form.Text>
					<Form.Control
						placeholder='description'
						{...register("short_description")}
					/>
					{errors.short_description && (
						<Validation>Write some description, minium 10 letters</Validation>
					)}
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Enter price</Form.Text>
					<Form.Control placeholder='price' {...register("regular_price")} />
					{errors.regular_price && <Validation>Enter correct price</Validation>}
				</Form.Group>{" "}
				<Form.Group className='mt-3'>
					<Form.Text className='text-muted '>Put correct image url</Form.Text>
					<Form.Control placeholder='Image url' {...register("sku")} />
					{errors.name && <Validation>Put correct image url</Validation>}
				</Form.Group>
				{submitted && (
					<Alert variant='success'>
						Your message was successfully sent. We will contact you shortly!
					</Alert>
				)}
				<Button variant='primary' type='submit' className='mt-4'>
					{sending ? "Adding.." : "Add new"}
				</Button>
			</Form>
		</Container>
	);
}
