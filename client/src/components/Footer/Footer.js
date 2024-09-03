import styles from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <article>
        <section className={styles.footerWrapper}>
          <div className={styles.titleContainer}>
            <Image
              src='/images/logo_light.svg'
              width={156}
              height={79}
              alt='logo'
              className={styles.title}
            />
            <span className={styles.line}></span>
          </div>
          <section className={styles.footerContainer}>
            <article className={styles.linksContainer}>
              <Link href='#' className={styles.link}>
                Conditions and Terms
              </Link>
              <Link href='#' className={styles.link}>
                Privacy Policy
              </Link>
              <Link href='#' className={styles.link}>
                Contact
              </Link>
              <Link href='#' className={styles.link}>
                FAQS
              </Link>
            </article>
            <article className={styles.iconsContainer}>
              <Link
                href='https://github.com/mvacjar'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/images/github.png'
                  width={40}
                  height={40}
                  alt='github'
                  className={styles.icon}
                />
              </Link>
              <Link
                href='https://www.linkedin.com/in/mvacjar/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/images/linkedin.png'
                  width={40}
                  height={40}
                  alt='linkdein'
                  className={styles.icon}
                />
              </Link>
            </article>
          </section>
          <div className={styles.linesContainer}>
            <span className={styles.line}></span>
            <h3 className={styles.signed}>Coded with 🦾🤎 by Mvacjar</h3>
            <h3 className={styles.copyright}>
              Copyright © 2024 Inksired - All rights reserved
            </h3>
          </div>
        </section>
      </article>
    </>
  );
}
