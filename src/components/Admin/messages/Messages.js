import MessagesList from "./MessagesList";
import Redirect from "../Redirect";
import { Link } from "react-router-dom";
import Heading from "../../Heading";

function AllMessages() {
	Redirect();

	return (
		<>
			<Heading title='Messages' /> <Link to='/admin'> Back</Link>
			<MessagesList />
		</>
	);
}

export default AllMessages;
