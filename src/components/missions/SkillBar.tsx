import { Progressbar } from "konsta/react"

export const SkillBar = ({label, percent}: {label: string, percent: number}) => {
    return (
        <div className="flex px-2">
            <div className="w-[60px]">
                <div className="text-zinc-300 h-[28px] flex items-center">
                    { label }
                </div>
            </div>
            <div className="grow pl-1">
                <div className="h-[32px] pt-[10px]">
                    <Progressbar component='span' progress={percent} className="k-color-progress-bar h-[8px] rounded-md items-center" />
                </div>
            </div>
        </div>
    )
}