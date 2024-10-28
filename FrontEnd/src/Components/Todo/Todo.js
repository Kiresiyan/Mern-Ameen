import React, { useEffect, useRef, useState } from 'react'
import { Typography, List, Modal, Input } from 'antd';
import ListItem from './ListItem';
import './style.css';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux/Todo/Actions';
import { message } from 'antd';
import { useSelector } from 'react-redux';
const { Title } = Typography;

const Todo = () => {
    const dispatch = useDispatch();
    const todoList = useSelector(({ todoReducer }) => todoReducer.todoList);
    const fetchLoading = useSelector(({ todoReducer }) => todoReducer.fetchLoading);
    const addOrEditLoading = useSelector(({ todoReducer }) => todoReducer.addOrEditLoading);
    const inputRef = useRef(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        dispatch({type: actions.FETCH_TODO_LIST})
    }, [])

    useEffect(() => {
        const focusInput = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }

        if (modalVisible) {
            const timerId = setTimeout(focusInput, 0);
            return () => clearTimeout(timerId);
        }
    }, [modalVisible]);

    const onEdit = (id) => {
        const item = todoList.find(item => item.id === id)
        setEditItem(item)
        setInputValue(item.title)
        setModalVisible(true)
    }
    const resetToDefault = () => {
        setModalVisible(false);
        setInputValue('');
        setEditItem(null)
    }
    const addOrEditItem = () => {
        if (inputValue.trim() === '') {
            message.error('Please enter a valid item');
            return;
        }
        if(editItem){
            dispatch({
                type: actions.UPDATE_TODO,
                payload: {
                    id: editItem.id,
                    title: inputValue
                },
                callBack: () => resetToDefault(),
            });
        }else{
            dispatch({
            type: actions.ADD_NEW_TODO,
            payload: {
                title: inputValue 
            },
            callBack: () => resetToDefault(),
            });
        }
        
    }
    return (
        <div className='todo-container'>
            <div className='todo-header'>
                <Title>Your Todo List</Title>
                <PlusOutlined className='todo-add' onClick={() => setModalVisible(true)} />
            </div>
            <List
                loading={fetchLoading}
                itemLayout="horizontal"
                dataSource={todoList}
                renderItem={item => (
                    <ListItem {...item} key={item.id} 
                    setModalVisible={setModalVisible}
                    onEdit={onEdit} 
                    />
                )} />
            <Modal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                okButtonProps={{loading: addOrEditLoading}}
                onOk={addOrEditItem}
                title={editItem ? 'Edit Item' : 'Add New Item'}
                closable={false} >
                <Input
                    ref={inputRef}
                    placeholder='Enter your todo item'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
            </Modal>
        </div>

    )
}

export default Todo