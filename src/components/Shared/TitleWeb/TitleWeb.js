import Image from 'next/image';

export function TitleWeb() {
  return (
    <>
      <Image
        src='/images/logo_light.svg'
        alt='logo name'
        width={300}
        height={200}
      />
    </>
  );
}
