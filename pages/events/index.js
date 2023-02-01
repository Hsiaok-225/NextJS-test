import Image from "next/image";
import Link from "next/link";

export default function EventsPage({ data }) {
  return (
    <>
      <h1>Events Page</h1>
      {data.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <h1>Event in {event.title}</h1>
          <Image
            src={event.image}
            alt={event.title}
            width={300}
            height={300}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps(context) {
  console.log(context);
  const { events_categories } = await import("/data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
