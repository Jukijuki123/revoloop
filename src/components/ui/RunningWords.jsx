"use client";
import React from "react";
import { Globe2 } from "lucide-react";


const words = ["Reduce", "Reuse", "Recycle", "Sampah Jadi Cuan"];

const RunningWords = () => {
    return (
        <section className="bg-primary-dark py-3">
            <div className="overflow-hidden">

                <div className="marquee flex items-center">
                <MarqueeContent />
                <MarqueeContent />
                </div>
            </div>
        </section>
    );
};

const MarqueeContent = () => (
    <div className="flex items-center gap-10 px-10">
        {words.map((word, idx) => (
        <div key={idx} className="flex items-center gap-6">
            <span className="text-white text-xl md:text-3xl font-bold whitespace-nowrap">
            {word}
            </span>

            <Globe2 className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
        </div>
        ))}
    </div>
);

export default RunningWords;
