import styles from './saga.module.scss';
import { BasicLayout } from '@/layouts';
import { Separator, Seo } from '@/components/Shared';
import Footer from '@/components/Footer/Footer';
import { SagaBody } from '@/components/Saga';

export default function SagasPage(props) {
  const { saga } = props;

  return (
    <>
      <Seo
        title={saga.attributes.saga_title}
        description={saga.attributes.description}
      />
      <BasicLayout />
      <div className={styles.bodySagaContainer}>
        <Separator height={200} />
        <SagaBody.Body saga={saga} />
        <Separator height={50} />
        <div className={styles.footerContainer}>
          <Footer />
        </div>
        <Separator height={50} />
      </div>
    </>
  );
}
