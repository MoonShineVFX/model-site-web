import dynamic from 'next/dynamic';

// dynamic
const Item = dynamic(
    () => import('../Item'),
    { ssr: false },
);

const RelativeProductsLayout = dynamic(() =>
    import('./productLayout').then((mod) => mod.RelativeProductsLayout)
);

const RelativeProductItem = ({ lists, ...rest }) => (

    <RelativeProductsLayout {...rest}>
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
    </RelativeProductsLayout>

);

export default RelativeProductItem;
