import React, { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { faqItems } from '@/data/FQA_data';
const FAQ = () => {
    const [openItems, setOpenItems] = useState([0]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <HelpCircle className="w-8 h-8 text-purple-400" />
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                        Frequently Asked Questions
                    </h2>
                </div>
                <p className="text-lg text-gray-400">
                    Have questions? We have answers. If you cant find what youre looking for, feel free to{' '}
                    <a href="#" className="font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hover:brightness-125 transition">
                        contact us
                    </a>.
                </p>
            </div>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10" >
                        <button
                            onClick={() => toggleItem(index)}
                            data-testid={`testid_${index}`}
                            className="w-full py-5 px-6 flex justify-between items-center text-left gap-4"
                        >
                            <span className="text-lg font-medium text-white">{item.question}</span>
                            <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full">
                                <Plus
                                    data-testid={`plus_btn_${index}`}
                                    className={`w-5 h-5 text-gray-300 transition-transform cursor-pointer duration-300 ${openItems.includes(index) ? 'rotate-45' : 'rotate-0'
                                        }`}
                                />
                            </div>
                        </button>

                        <div data-testid={`indicator_${index}`}
                            style={{
                                display: 'grid',
                                gridTemplateRows: openItems.includes(index) ? '1fr' : '0fr',
                                transition: 'grid-template-rows 0.5s ease-in-out'
                            }}>

                            <div className="overflow-hidden">
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;

