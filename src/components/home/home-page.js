import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css";

export default function HomePage ({data}){
    return(
        <main className={styles.main}>
            {data.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
                <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={300}
                style={{ width: "100%", height: "auto" }}
                />
                <h1>{event.title}</h1>  
                <p>{event.description}</p>
            </Link>
            ))}
        </main>
    )
}