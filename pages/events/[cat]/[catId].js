import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function EventPage({ data }) {
	const { title, city, description, image } = data || {};

	const router = useRouter(); // get URL params(query)
	const inputRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = inputRef.current.value;
		// console.log(email);

		try {
			const res = await fetch(`/api/blog`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: '1',
					email,
				}),
			});
			if (!res.ok) throw new Error(`Error: ${res.status}`);

			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log('get err: ', err);
		}
	};

	return (
		<>
			<Image
				src={image}
				alt={title}
				width={800}
				height={300}
				style={{ width: 'auto', height: 'auto' }}
			/>
			<h1>{title}</h1>
			<p>{description}</p>
			<form>
				<label>
					<input ref={inputRef} type='email' placeholder='Enter your Email' />
				</label>
				<button onClick={handleSubmit}>join</button>
			</form>
		</>
	);
}

export async function getStaticPaths() {
	const { allEvents } = await import(`/data/data.json`);
	const allPaths = allEvents.map((e) => {
		return {
			params: {
				cat: e.city.toString(),
				catId: e.id.toString(),
			},
		};
	});

	return {
		paths: allPaths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	// context 取得當前網址的 params
	const path = require('path');
	const { catId } = context.params;

	// 用已取得的 params fetch data
	const { allEvents } = await import(`/data/data.json`);
	const eventData = allEvents.find((e) => e.id === catId);

	return {
		props: {
			data: eventData,
		},
	};
}
