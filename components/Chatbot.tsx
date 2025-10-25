import React, { useState, useRef, useEffect } from 'react';

interface ChatbotProps {
    isOpen: boolean;
    onToggle: () => void;
}

const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.388A.75.75 0 018.25 19.5a23.31 23.31 0 01-4.28-4.28.75.75 0 01.388-1.009A9.76 9.76 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
    const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([
        { text: "Hello! I'm the Yadukul Dairy AI assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' as 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            const botResponse = { text: "Thank you for your message! A member of our support team will get back to you shortly. For urgent queries, please call us.", sender: 'bot' as 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <>
            <button
                onClick={onToggle}
                className="fixed bottom-6 right-6 bg-brand-gold text-brand-dark rounded-full p-4 shadow-lg hover:bg-amber-400 transition-transform hover:scale-110 z-[60]"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <BotIcon className="w-8 h-8" />}
            </button>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-brand-dark-secondary rounded-lg shadow-2xl flex flex-col z-[60] overflow-hidden">
                    <header className="bg-gray-200 dark:bg-gray-800 p-4 text-gray-900 dark:text-white font-semibold">
                        Yadukul AI Assistant
                    </header>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <p className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-gold text-brand-dark' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                            />
                            <button onClick={handleSend} className="bg-brand-gold text-brand-dark font-bold px-4 rounded-md hover:bg-amber-400">&rarr;</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;