import Heading from "./Heading";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ADMIN_URL } from "./constants/api";
import { Alert } from "react-bootstrap";
const schema = yup.object().shape({
	username: yup
		.string()
		.required("Please enter your username")
		.min(4, "Minimum 4 characters"),
	password: yup
		.string()
		.required("Please enter your password")
		.min(4, "Minimum 6 characters"),
});

export default function Login() {
	const url = ADMIN_URL;

	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	/* eslint-disable no-unused-vars */
	const [auth, setAuth] = useContext(AuthContext); // eslint-disable-next-line;
	const navigate = useNavigate();
	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		try {
			const response = await axios.post(url, data);
			setAuth(response.data);
			navigate("/admin");
		} catch (error) {
			console.log("error", error);
			setLoginError("Invalid Login or email");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<Heading title='Login' />
			<Container className='login'>
				<Form onSubmit={handleSubmit(onSubmit)} className='login__form'>
					<Form.Group>
						<Form.Text className='text-muted '>
							Please enter your username
						</Form.Text>
						<Form.Control placeholder='Username' {...register("username")} />

						{errors.username && (
							<Validation>Login include minium 4 letters</Validation>
						)}
					</Form.Group>
					<Form.Group>
						<Form.Text className='text-muted '>
							Please enter your password
						</Form.Text>
						<Form.Control placeholder='Password' {...register("password")} />

						{errors.password && (
							<Validation>Password include minium 6 letters</Validation>
						)}
					</Form.Group>

					<Button variant='primary' type='submit' className='mt-4'>
						{submitting ? "Loggin in..." : "Login"}
					</Button>
					{loginError && (
						<Alert className='mt-4' variant='danger'>
							{loginError}
						</Alert>
					)}
				</Form>
			</Container>
		</>
	);
}
