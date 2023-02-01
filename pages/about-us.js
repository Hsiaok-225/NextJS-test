import Footer from '@/src/components/footer/footer';

export default function AboutUsPage() {
	return <div>about-us</div>;
}

AboutUsPage.getLayout = function PageLayout(page) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};
