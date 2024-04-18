import { useState } from "react";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 100) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "#2c4060", fontWeight: "700", cursor: "pointer" }}
            >
                {isReadMore ? "...Read more" : " Show less"}
            </span>
        </p>
    );
};
 
export default ReadMore;