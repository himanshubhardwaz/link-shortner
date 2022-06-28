import type { FC } from 'react'

type Props = {
    type: string,
    message: string,
    className?: string
}

const Alert: FC<Props> = ({ type, message, className }) => {
    if (type === 'error') {
        return (
            <div className={`bg-pink-400 text-left py-2 px-3 rounded-md ${className}`}>
                {message}
            </div>
        )
    }

    return (
        <div className={`bg-blue-400 text-left py-2 px-3 rounded-md ${className}`}>
            {message}
        </div>
    )
}

export default Alert