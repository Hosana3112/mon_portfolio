import { create } from 'zustand';

interface MetricsState {
    steps: number;
    calories: number;
    weight: number;
    height: number;

    // Actions
    setSteps: (steps: number) => void;
    setCalories: (calories: number) => void;
    setWeight: (weight: number) => void;
    setHeight: (height: number) => void;

    // Computed (helper methods)
    getBMI: () => number;
    getBMICategory: () => { label: string; color: string };
}

export const useMetricsStore = create<MetricsState>((set, get) => ({
    steps: 8432, // Default starting value for demo
    calories: 1850,
    weight: 75,
    height: 180,

    setSteps: (steps) => set({ steps }),
    setCalories: (calories) => set({ calories }),
    setWeight: (weight) => set({ weight }),
    setHeight: (height) => set({ height }),

    getBMI: () => {
        const { weight, height } = get();
        if (!height) return 0;
        const heightInMeters = height / 100;
        return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    },

    getBMICategory: () => {
        const bmi = get().getBMI();
        if (bmi < 18.5) return { label: 'Underweight', color: '#38bdf8' }; // Cyan-400
        if (bmi < 25) return { label: 'Healthy', color: '#4ade80' }; // Green-400
        if (bmi < 30) return { label: 'Overweight', color: '#fbbf24' }; // Amber-400
        return { label: 'Obese', color: '#f87171' }; // Red-400
    },
}));
