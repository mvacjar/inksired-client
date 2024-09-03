import InfoAccount from '@/components/Account/InfoAccount/InfoAccount';
import Footer from '@/components/Footer/Footer';
import { Seo, Separator } from '@/components/Shared';
import { BasicLayout } from '@/layouts';

export default function AccountPage() {
  return (
    <>
      <Seo title='My Account' />
      <BasicLayout />
      <Separator height={150} />
      <InfoAccount />
      <Separator height={50} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Footer />
      </div>
      <Separator height={50} />
    </>
  );
}
