import React from 'react';
import { format } from 'date-fns';

const Year = ({ id, format: dateFormat, ticking, timezone, currentDate }) => {
    const formattedDate = format(currentDate, dateFormat, { timeZone: timezone });

    return (
        <span id={id} className="Year">
            {formattedDate}
        </span>
    );
};

const Month = ({ format: dateFormat, ticking, timezone, currentDate}) => {
    const formattedDate = format(currentDate, dateFormat, { timeZone: timezone });

    return (
        <span className="Month">
            {formattedDate}
        </span>
    );
};

export { Year, Month };