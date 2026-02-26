import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface CounterProps {
    value: number;
    decimals?: number;
}

export function Counter({ value, decimals = 0 }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US", {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }).format(latest);
            }
        });
    }, [springValue, decimals]);

    return <span ref={ref} />;
}
