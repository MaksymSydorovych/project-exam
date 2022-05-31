import PropTypes from "prop-types";

export default function Validation({ children }) {
	return <div className='form-error text-danger '>{children}</div>;
}

Validation.proptTypes = {
	children: PropTypes.node.isRequired,
};
