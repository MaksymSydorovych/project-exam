import OrdersList from "./OrdersList";
import Redirect from "../Redirect";
import { Link } from "react-router-dom";

function Orders() {
	Redirect();

	return (
		<>
			{" "}
			<Link to='/admin' className='update-link'>
				Back
			</Link>
			<OrdersList />
		</>
	);
}

export default Orders;
