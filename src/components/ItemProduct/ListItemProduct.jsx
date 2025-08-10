import ItemProduct from './ItemProduct';

function ListItemProduct({ data }) {
    return (
        <>
            {data.map((item) => (
                <ItemProduct key={item.id} data={item} />
            ))}
        </>
    );
}

export default ListItemProduct;
