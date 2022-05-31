import img1 from "../../images/img-1.jpg";
import img2 from "../../images/img-2.jpg";
import img3 from "../../images/img-3.jpg";
import img4 from "../../images/img-4.jpg";
import { Container } from "react-bootstrap";
function ImagesContact() {
	return (
		<Container className='imageline'>
			<div className='imageline__img'>
				<img className='imageline__img--item' src={img1} alt='Bergens view' />
				<img className='imageline__img--item' src={img3} alt='Bergens view' />
				<img className='imageline__img--item' src={img4} alt='Bergens view' />
				<img className='imageline__img--item' src={img2} alt='Bergens view' />
			</div>
		</Container>
	);
}

export default ImagesContact;
