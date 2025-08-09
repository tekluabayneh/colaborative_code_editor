"use client"
import { Plus } from "lucide-react"
import { useState } from 'react';
import {faqItems } from "../data/FQA_data"
const FAQ = () => {
	const [openItems, setOpenItems] = useState<number[]>([]);


	const toggleItem = (index: number) => {
		setOpenItems(prev => 
			prev.includes(index) 
				? prev.filter(i => i !== index)
				: [...prev, index]
		);
	};

	return (
		<div className="max-w-6xl mx-auto p-8 bg-background text-foreground min-h-screen">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4 text-foreground">FAQ</h1>
				<p className="text-muted-foreground text-lg">
					Here you can find most frequent asked questions. Feel free to{' '}
					<a href="#" className="text-primary hover:text-primary/80 transition-colors">contact me</a>{' '}
					if you still have a different one.
				</p>
			</div>

			<div className="space-y-0">

				{faqItems.map((item, index) => (
					<div key={index} className="border-b rounded">
						<button
							onClick={() => toggleItem(index)}
							className="w-full py-5 px-4 flex justify-between items-center text-left hover:bg-accent/50 transition-all duration-200"
						>
							<span className="text-lg font-medium text-foreground">{item.question}</span>
							<div
								className={`w-5 h-5 transition-transform duration-200 text-muted-foreground cursor-pointer flex items-center justify-center ${
openItems.includes(index) ? 'rotate-45' : 'rotate-0'
}`}
							>
								<Plus className="w-4 h-4" />
							</div>
						</button>

						<div
							className={`px-4 pb-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
}`}
						>
							<p className="text-muted-foreground leading-relaxed">{item.answer}</p>
						</div>
					</div>
				))}

			</div>
		</div>
	);
};

export default FAQ;
