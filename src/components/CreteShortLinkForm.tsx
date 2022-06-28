import Button from './Button';

const CreateShortLink = () => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[95%] justify-center max-w-xl">
            <div className="mb-4 w-full">
                <input
                    className="form-input focus:ring-red-500 focus:border-red-500 text-red-600 text-center rounded-md h-20 py-6 w-full text-2xl"
                    name="link"
                    id="link"
                />
            </div>
            <div>
                <Button type="submit" className="font-semibold">
                    Create Short Link
                </Button>
            </div>
        </form>
    )
}

export default CreateShortLink;