import DatePicker from 'react-date-picker';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { cn, convertJsDateToMySqlDate, convertMySqlDateToJSDate } from '@/utils/utils';

import "./DatePicker.css"
import "./Calendar.css"


export default function DateField({ control, name, rules = {}, title, minDate, maxDate }) {

    const [focus, setFocus] = useState(false);
    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, } }) => {

                if (value) {
                    value = convertMySqlDateToJSDate(value);
                }
                return (
                    <div className='w-full relative'>
                        <label className="relative">
                            <div className='text-xs mb-1'>{title}</div>
                            <DatePicker
                                {...(minDate ? { minDate } : {})}
                                {...(maxDate ? { maxDate } : {})}
                                format='dd/MM/yyyy'
                                inputRef={ref}
                                onBlur={setFocus.bind(null, false)}
                                onCalendarOpen={setFocus.bind(null, true)}
                                clearIcon={null}
                                onFocus={setFocus.bind(null, true)}
                                className={cn("w-full rounded-lg bg-landing-background border-b-2 duration-150", error ? "border-red-600/80" : (focus ? "border-landing-primary" : "border-transparent"))}
                                calendarClassName={"shadow-md text-landing-foreground rounded-xl"}
                                onChange={(val) => {
                                    onChange(val && convertJsDateToMySqlDate(val));
                                }}
                                value={value} />

                        </label>
                        {error && <p className="absolute -bottom-4 text-xs text-red-600/80">{error.message}</p>}
                    </div>
                )
            }
            }

        />
    );
}

