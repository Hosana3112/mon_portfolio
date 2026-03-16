import { Metadata } from 'next';
import { MetricsDashboard } from '@/components/health-dashboard/MetricsDashboard';

export const metadata: Metadata = {
    title: 'Vitals Dashboard | Futuristic Health Intelligence',
    description: 'A production-grade 3D health metrics dashboard showcasing advanced frontend capabilities with Next.js, Three.js, and Zustand.',
    openGraph: {
        title: 'Vitals Dashboard | Futuristic Health Intelligence',
        description: 'Real-time biometrics and energy visualization with 3D abstract background.',
        type: 'website',
    },
};

export default function DashboardPage() {
    return <MetricsDashboard />;
}
