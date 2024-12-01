export const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    
    return parts.map((part, index) => 
        part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} style={{color: '#FFB74A' }}>{part}</span> : 
        part
    );
};
