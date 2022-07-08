import { useContext } from 'react';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';

//
const { formatBytes } = util;

const OtherInfo = ({ modelSum, fileSize, perImgSize }) => {

    const { deftags } = useContext(GlobalContext);

    return (

        <div className="other-info">
            <div className="other-info-item">
                <div className="label">{deftags.product_model_sum}</div>
                <p>{modelSum}</p>
            </div>
            <div className="other-info-item">
                <div className="label">{deftags.product_file_size}</div>
                <p>{formatBytes(fileSize)}</p>
            </div>
            <div className="other-info-item">
                <div className="label">{deftags.product_per_image_size}</div>
                <p>{perImgSize}</p>
            </div>
        </div>

    );

};

export default OtherInfo;
