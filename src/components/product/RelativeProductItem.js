import dynamic from 'next/dynamic';

// dynamic
const Item = dynamic(() => import('../Item'), { ssr: false });

const RelativeProductItem = ({ lists }) => (

    <div className="items">
        {
            lists.map(({ id, title, price, imgUrl }, idx) => (

                <div
                    key={idx}
                    className="itemWrap"
                >
                    <Item
                        url={`/product/${id}`}
                        data={{ title, price, imgUrl }}
                    />
                </div>

            ))
        }
    </div>

);

export default RelativeProductItem;
