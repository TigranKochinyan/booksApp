import { ChangeEvent, ReactElement, SyntheticEvent, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK } from '../../queries';
// import styles from './index.module.scss';

interface Author {
    name: string
    id: string
};

interface Book {
    name: string
    authorId: string,
    genre: string,
};

const AddBook = (): ReactElement => {
    const [bookName, setBookName] = useState<string>('')
    const [bookGenre, setBookGenre] = useState<string>('')
    const [bookAuthor, setBookAuthor] = useState<string>('')

    const [addBook, { data: dataBook, loading: lloadingBook, error: errorBook }] = useMutation(ADD_BOOK);
    const { loading, error, data } = useQuery(GET_AUTHORS);

    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error</p>

    const handleChangeBookName = (e: ChangeEvent<HTMLInputElement>): void => {
        setBookName(e.target.value)
    }
    const handleChangeBookGenre = (e: ChangeEvent<HTMLInputElement>): void => {
        setBookGenre(e.target.value)
    }
    const handleChangeBookAuthor = (e: ChangeEvent<HTMLSelectElement>): void => {
        setBookAuthor(e.target.value)
    }

    const resetInputs = (): void => {
        setBookName('')
        setBookGenre('')
        setBookAuthor('')
    } 

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        const book: Book = {
            name: bookName,
            genre: bookGenre,
            authorId: bookAuthor
        }
        addBook({ variables: { ...book } });
        resetInputs()
    }

    return (
        <form onSubmit={handleSubmit} action='submit'>
            <input type="text" onChange={handleChangeBookName} placeholder='Book name' value={bookName} />
            <input type="text" onChange={handleChangeBookGenre} placeholder='Book genre' value={bookGenre} />
            <select 
                value={bookAuthor}
                onChange={handleChangeBookAuthor}
                name="authorname"
                id=""
            >
                <option value=''></option>
                {
                    data.authors.map((author: Author) => {
                        return (
                            <option 
                                key={author.id}
                                value={author.id}
                            >{author.name}</option>
                        )
                    })
                }
            </select>
            <input type="submit" value="Add book" />
        </form>
    )
}

export default AddBook;