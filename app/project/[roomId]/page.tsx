// app/project/[roomId]/page.tsx
import Layout from '@/components/layout/Layout';

type Props = {
  params: { roomId: string };
};

export default async function ProjectPage({ params }: Props) {
    const resolvedParams = await params;
    return <Layout roomId={resolvedParams.roomId} />;
}
