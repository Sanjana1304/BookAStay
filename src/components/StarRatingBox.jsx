// StarRatingBox.jsx
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StarRatingBox = ({ rating, onChange }) => {
    const handleMouseEnter = (index) => {
        if (onChange) onChange(index);
    };

    const handleMouseLeave = () => {
        if (onChange) onChange(rating);
    };

    const handleClick = (index) => {
        if (onChange) onChange(index);
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    {star <= rating ? (
                        <AiFillStar className="text-yellow-500 text-2xl" />
                    ) : (
                        <AiOutlineStar className="text-gray-400 text-2xl" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StarRatingBox;
