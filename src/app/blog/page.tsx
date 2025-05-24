import styles from "./styles.module.scss";
import { people } from "../../components/Card/data";
import CardAbout from "@/components/Card/about";

export default function Blog() {
  return (
    <main className={styles.main}>
      {people.map((project, index) => {
        return <CardAbout key={index} {...project} />;
      })}
    </main>
  );
}
