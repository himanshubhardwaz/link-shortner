import type { FC, ReactNode } from 'react'

type Props = {
    type: string,
    message: ReactNode,
    className?: string
}

const Alert: FC<Props> = ({ type, message, className }) => {
    if (type === 'error') {
        return (
            <div className={`bg-red-600 text-left py-2 px-3 rounded-md ${className}`}>
                {message}
            </div>
        )
    }

    return (
        <div className={`bg-green-600 text-left py-2 px-3 rounded-md ${className}`}>
            {message}
        </div>
    )
}

export default Alert