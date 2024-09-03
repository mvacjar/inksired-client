import NavHorizontal from '@/components/Navbars/NavHorizontal/NavHorizontal';
import NavVertical from '@/components/Navbars/NavVertical/NavVertical';

export function BasicLayout() {
  return (
    <>
      <div>
        <NavVertical />
        <NavHorizontal />
      </div>
    </>
  );
}
