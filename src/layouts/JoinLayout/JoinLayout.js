import styles from './joinLayout.module.scss';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export function JoinLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
    return null;
  }

  const toHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src='/images/join-background.svg'
            alt='Join Background'
            fill
            objectFit='cover'
          />
        </div>
        <div className={styles.navJoin}>
          <div className={styles.logoContainer} onClick={toHome}>
            <Image
              src='/images/logo_light.svg'
              alt='Logo light'
              width={150}
              height={78}
              className={styles.logo}
              priority
            />
          </div>
          <div onClick={toHome}>
            <Image
              src='/images/xBeige.svg'
              alt='Logo light'
              width={17}
              height={17}
              className={styles.logoX}
              priority
            />
          </div>
        </div>
      </div>
      <div className={styles.containerBlock}>
        <div className={styles.block}>{children}</div>
      </div>
    </>
  );
}
