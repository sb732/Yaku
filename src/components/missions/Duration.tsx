import { IconCheck } from "@tabler/icons-react";
import { useMemo } from "react"

export const Duration = ({duration, isCompleted}: {duration: number, isCompleted: boolean}) => {
    const hour = useMemo(() => duration >= 3600 ? Math.floor(duration / 3600) : 0, [duration]);
    const min = useMemo(() => duration >= 60 ? Math.floor((duration % 3600) / 60) : 0, [duration] );
    const sec = useMemo(() => duration > 0 ? duration % 60 : 0, [duration]);

    return (
        <div className="flex items-center">
            { !isCompleted && duration >= 0 && 
                <span className="font-bold text-sm">
                    {`${hour}`.padStart(2, '0')}:{`${min}`.padStart(2, '0')}:{`${sec}`.padStart(2, '0')} 
                </span>
            }
            {
                isCompleted &&
                    <IconCheck className="ml-2" color="#c9de00" size={32} stroke={2}/>
            }
        </div>       
    )   
}