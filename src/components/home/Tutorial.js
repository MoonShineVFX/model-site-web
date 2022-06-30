import { ItemTutorialLayout } from './homeLayout';
import Links from '../Links';
import Images from '../Images';

const Tutorial = ({ lists }) => (

    <ItemTutorialLayout>
        {
            lists.map(({ id, title, description, imgUrl, link }) => (

                <Links
                    key={id}
                    url={link}
                    title={title}
                    className="itemWrap"
                    newPage
                >
                    <div className="item-thumb">
                        <Images
                            src={imgUrl}
                            alt={title}
                            width="380"
                            height="206"
                        />
                    </div>
                    <div className="item-content">
                        <h3 className="title">{title}</h3>
                        <p>{description}</p>
                    </div>
                </Links>

            ))
        }
    </ItemTutorialLayout>

);

export default Tutorial;
