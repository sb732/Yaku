import { Block, Preloader } from "konsta/react"

export const LoadingSpinner = ({size = 8}: {size?: number}) => {
    return (
        <Block strong colors={{ strongBgIos: 'bg-background', strongBgMaterial: 'bg-background' }}
            insetMaterial outlineIos className="text-center">
            <Preloader
                colors={{ iconIos: 'text-primary', iconMaterial: 'text-primary' }}
                size={`w-${size} h-${size}`}
            />
        </Block>
    )
}