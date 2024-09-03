import styles from './sign-in.module.scss';
import { JoinLayout } from '../../../layouts/JoinLayout';
import Link from 'next/link';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import { Seo } from '@/components/Shared';

export default function SignInPage() {
  return (
    <>
      <Seo title='Sign In' />
      <JoinLayout>
        <main className={styles.wrapperSign}>
          <section className={styles.containerSignIn}>
            <article className={styles.formSignInWrapper}>
              <h1 className={styles.textPopUp}>Sign In</h1>
              <LoginForm />
              <div className={styles.questionContainer}>
                <div className={styles.questionUp}>
                  <div>
                    <p>Don't you already have an account?</p>
                  </div>
                  <Link
                    href='/join/sign-up'
                    className={styles.signUpButtonContainer}
                  >
                    <button className={styles.signUpButton}>Sign Up</button>
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </main>
      </JoinLayout>
    </>
  );
}
