import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux/Todo/Actions';
const { Text } = Typography;




const ListItem = (props) => {
    const dispatch = useDispatch();
    const { id, title, status, onEdit } = props;
    const [checked, setChecked] = useState(status);

   
    const updateStatus = ({target}) => {
        const status = target.checked 
        setChecked(status)
        dispatch({
            type: actions.UPDATE_TODO,
            payload: {
                id, 
                status
            }
        });
    }

    const onDelete = () => {
        dispatch({ type: actions.DELETE_TODO, id })
    }

    return <div className='todo-item'>
        <Checkbox
            onChange={updateStatus}
            checked={checked} />
        <Text className='todo-title' disabled={checked} >{title}</Text>
        <div className='todo-icons'>
            <EditOutlined className='todo-edit' onClick={()=>onEdit(id)} />
            <DeleteOutlined className='todo-delete' onClick={onDelete} />
        </div>

    </div>
}

export default ListItem