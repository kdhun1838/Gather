import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import View from '../../components/register/View'
import { RootState } from '../../modules';
import { getForm } from '../../modules/register/action';
import HeaderContainer from '../common/HeaderContainer';

const ViewContainer = () => {
    const formData = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.postId || ""; 

    React.useEffect(() => {
        dispatch(getForm(Number(postId)));
    }, [dispatch, postId])
    return (
        <div>
            <View formData={formData}/>
        </div>
    )
}

export default ViewContainer
