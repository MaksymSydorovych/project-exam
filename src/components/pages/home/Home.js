import Popular from "./Popular";
import Heading from "../../Heading";
import SearchBar from "../../SearchBar";
const hotel = "<p>Hotel, popular</p>";
const guesthouse = "<p>Guesthouse, popular</p>";
const bandb = "<p>B and B, popular</p>";
export default function Home() {
	return (
		<div className='home'>
			<div className='home__banner'>
				<div className='home__text'>
					<p>Welcome to Holidaze!</p>
					<p>Find apartments in Bergen</p>
				</div>
				<SearchBar />
			</div>
			<div className='text-center mt-3 mx-4'>
				<Heading title='Welcome to Holidaze' />
				<h3>Our most popular accommondations:</h3>
				<h2>Hotels</h2>
				<Popular type={hotel} />
				<h2>Guesthouses</h2>
				<Popular type={guesthouse} />
				<h2>Bread and breakfast</h2>
				<Popular type={bandb} />
			</div>
		</div>
	);
}
