import { Grid } from '@mui/material';
import { ItemWrapLayout } from './productLayout';
import Item from '../Item';

const ListItem = ({ lists }) => (

    <ItemWrapLayout
        container
        rowSpacing="40px"
        columnSpacing="16px"
    >
        {
            lists.map(({ id, title, price, imgUrl }, idx) => (

                <Grid
                    key={id}
                    item
                    xs={6}
                    sm={4}
                    mobile={3}
                    data-index={idx}
                >
                    <Item
                        type="product"
                        url={`/product/${id}`}
                        width="321"
                        height="186"
                        data={{ title, price, imgUrl }}
                        newPage
                    />
                </Grid>

            ))
        }
    </ItemWrapLayout>

);

export default ListItem;
