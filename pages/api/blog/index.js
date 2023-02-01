export default function blog(req, res) {
	const { method } = req;
	if (method === 'POST') {
		console.log('get post');
		const { id, email } = req.body;
		res.status(200).json({ msg: `your id: ${id}, email: ${email}` });
		res.status(200).json({ msg: 'Blog Routes' });
	}
	res.status(200).json({ msg: 'Blog Routes' });
}
