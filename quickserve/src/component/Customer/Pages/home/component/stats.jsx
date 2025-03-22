import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react"; // Using Lucide icons

// 🔢 Animated Number (Smoothly Increments)
export const AnimatedNumber = ({ value, decimals = 1 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); 
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 1000; 
            const step = value / (duration / 16); 

            const interval = setInterval(() => {
                start += step;
                if (start >= value) {
                    start = value;
                    clearInterval(interval);
                }
                setCount(start);
            }, 16);
        }
    }, [isInView, value]);

    return (
        <motion.span ref={ref} className="text-2xl font-bold">
            {count.toFixed(decimals)}
        </motion.span>
    );
};


// ⭐ Animated Star Rating (Fix for Last Star Cutting Off)
export const Animatedstar = ({ value, decimals = 1 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 1000;
            const step = value / (duration / 16);

            const interval = setInterval(() => {
                start += step;
                if (start >= value) {
                    start = value;
                    clearInterval(interval);
                }
                setCount(start);
            }, 16);
        }
    }, [isInView, value]);

    // ⭐ Fix for Last Star Cutting Off
    const renderStars = () => {
        const fullStars = Math.floor(count); // Whole stars
        const hasHalfStar = count % 1 >= 0.5; // Half star check
        const totalStars = fullStars + (hasHalfStar ? 1 : 0); // Total stars being displayed
        const emptyStars = Math.max(0, 5 - totalStars); // Remaining empty stars

        return (
            <div className="flex text-yellow-500 mt-1">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} size={22} fill="currentColor" stroke="none" />
                ))}
                {hasHalfStar && <StarHalf size={22} fill="currentColor" stroke="none" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarOutline key={i} size={22} stroke="currentColor" /> 
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {/* Animated Number */}
            <motion.span ref={ref} className="text-2xl font-bold">
                {count.toFixed(decimals)}
            </motion.span>

            {/* Star Rating */}
            {renderStars()}
        </div>
    );
};
