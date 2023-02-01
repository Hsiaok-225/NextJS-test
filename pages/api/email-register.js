import fs from 'fs';
import path from 'path';

function buildPath() {
	return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
	const fileData = fs.readFileSync(filePath);
	const data = JSON.parse(fileData);
	return data;
}

export default function emailRegister(req, res) {
	const filePath = buildPath();
	const { events_categories, allEvents } = extractData(filePath);
	console.log(allEvents);

	if (!allEvents) {
		return res.status(404).json({ msg: 'Events data not found' });
	}

	const { method } = req;

	if (method === 'POST') {
		const { email, eventId } = req.body;

		const newAllEvents = allEvents.map((event) => {
			if (event.id === eventId) {
				// already register
				if (event.emails_registered.includes(email)) {
					res.status(409).json({ msg: 'This email has already  been registered' });
				}

				// add email to correct event
				return {
					...event,
					emails_registered: [...event.emails_registered, email],
				};
			}
			// stay origin
			return event;
		});

		// write into db
		fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

		res.status(200).json({ msg: `sucess, your email: ${email}, eventId: ${eventId}` });
	}
}
