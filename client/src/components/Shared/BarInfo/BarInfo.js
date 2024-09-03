import styles from './barInfo.module.scss';
import { useEffect } from 'react';
import Image from 'next/image';
import { map } from 'lodash';
import { data } from './BarInfo.data';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function BarInfo() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500,
      easing: 'ease-in-sine',
    });

    AOS.refresh();
  }, []);

  return (
    <>
      <article className={styles.article}>
        <section className={styles.section}>
          {map(data, (item) => {
            return (
              <div
                className={styles.infoContainer}
                key={item.icon}
                data-aos='fade-up'
              >
                <Image
                  src={item.src}
                  alt='Dragon delivery'
                  name={item.icon}
                  width={50}
                  height={50}
                  className={styles.icon}
                  onLoadingComplete={() => AOS.refresh()}
                />
                <div className={styles.textContainer}>
                  <h5 className={styles.titleContainer}>{item.title}</h5>
                  <span className={styles.descriptionContainer}>
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
      </article>
    </>
  );
}
