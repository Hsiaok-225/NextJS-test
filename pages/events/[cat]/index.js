import Image from "next/image";
import Link from "next/link";
export default function EventsCatPage({ data, pageName }) {
  return (
    <>
      <h1>Events in {pageName}</h1>
      <div>
        {data.map(
          ({ id, title, city, description, image, emails_registered }) => {
            return (
              <Link href={`/events/${city}/${id}`} key={id}>
                <h1>{title}</h1>
                <p>{description}</p>
                <Image
                  src={image}
                  alt={title}
                  width={300}
                  height={300}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            );
          }
        )}
      </div>
    </>
  );
}

//  1. getStaticPaths 跟 getStaticProps 説有哪些 page(path) 可以 pre-render
//  2. getStaticProps 處理拿資料回傳給前端的工作外，也可接受 params 參數
export async function getStaticPaths() {
  // import AllPath from DB
  const { events_categories } = await import("/data/data.json");

  const paths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import(`/data/data.json`);
  const id = context?.params.cat; // city

  const data = allEvents.filter((e) => e.city === id);

  return {
    props: {
      data,
      pageName: id,
    },
  };
}
