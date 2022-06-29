import Button from './Button';
import { useState } from 'react'
import Alert from '@/components/Alert'

function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const CreateShortLink = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLink('');
        setError('');
        setIsLoading(true);

        const link = String(e.target.link.value);

        if (validURL(link)) {
            const response = await fetch('/api/create-link', {
                method: 'POST',
                headers: {
                    ContentType: 'application/json'
                },
                body: JSON.stringify({ link })
            })

            if (!response.ok) {
                if (response.status === 409) {
                    setError('Link already exists in the database!!');
                }
                else setError('Something went wrong!!');
            }

            const json = await response.json();

            console.log(json)

            if (json.link) {
                setLink(`shortner.thehb.lol/${json.link.slug}`);
            }
        }

        else {
            setError('Please Enter a valid URL');
        }

        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-[95%] justify-center max-w-xl">
                <div className="mb-4 w-full">
                    <input
                        className="form-input focus:ring-red-500 focus:border-red-500 text-myGray text-center rounded-md h-20 py-6 w-full text-2xl"
                        placeholder="https://www.google.com"
                        name="link"
                        id="link"
                    />
                </div>
                <div>
                    <Button type="submit" className="font-semibold" loading={isLoading}>
                        Create Short Link
                    </Button>
                </div>
            </form>
            <div className="flex flex-col items-center w-[95%] justify-center max-w-xl my-2" />
            {
                (error && link) ? <Alert type="error" message={<p className="text-center">This url is already available at: <h1>{link}</h1> </p>} /> :
                    link ? <Alert type="success" message={<p className="text-center">Here you go, your shortned link is now available at: <h1>{link}</h1> </p>} /> :
                        error ? <Alert type="error" message={error} /> : null
            }
        </div>
    )
}

export default CreateShortLink;