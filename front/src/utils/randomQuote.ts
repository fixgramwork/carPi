import {quotes} from '../data/quotes.json';

interface Quote {
    id: number;
    text: string;
}

export const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    return {
        id: quote.id,
        text: quote.text || quote.quote || '명언을 불러올 수 없습니다.'
    };
};
