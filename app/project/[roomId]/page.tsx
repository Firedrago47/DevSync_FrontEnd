// app/project/[roomId]/page.tsx
import Layout from '@/components/layout/Layout';

type Props = {
  params: { roomId: string };
};

export default function ProjectPage({ params }: Props) {
  return <Layout roomId={params.roomId} />;
}
