import { ReactElement, FC } from 'react';
// import styles from './index.module.scss';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../queries';

interface Book {// should imported from types
    id: string,
    name: string,
    // genre: string,
    // authorId: string,//maybe or ID
}

interface IProps {
    books: Book[]
}
// const Books: FC<IProps>
const Books = (): ReactElement => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return <div>
        <h1>Books</h1>
        {
            data.books.map((item: Book) => {
                return (
                    <h2 key={item.id}>{item.name}</h2>
                )
            })
        }
    </div>
}

export default Books;