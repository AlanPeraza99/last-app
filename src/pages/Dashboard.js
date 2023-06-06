import { useAuth } from '../context/authContext'
import { useState } from 'react';
import * as React from "react";
import "firebase/firestore";
import { doc, deleteDoc, setDoc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { collection } from "firebase/firestore";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    const usersRef = collection(db, 'usuarios');
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
    });
    const [userEdit, setUserEdit] = React.useState({
        id: "",
        name: "",
        email: "",
        password: "",
    });
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(user.email, user.password)
        } catch (error) {
            return toast.error('Error en agregar usuario');
        }
        await addDoc(usersRef, {
            name: user.name,
            password: user.password,
            email: user.email,
        });

        toast.success('Se ha agregado un nuevo usuario');
        getAllUsers();
        setIsOpen(false);

    }


    const handleSubmitEdit = async (e, userId) => {
        e.preventDefault();
        await setDoc(doc(db, "usuarios", userId), {
            name: userEdit.name,
            password: userEdit.password,
            email: userEdit.email,
        });
        getAllUsers();
        setIsOpenEdit(false);
        toast.success('Se ha editado el usuario');

    }


    const getAllUsers = async () => {
        const querySnapshot = await getDocs(usersRef);
        let users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                name: doc.data().name
            })
        });
        setUsers(users);
    }
    const editUser = async (userId) => {
        const docRef = doc(db, "usuarios", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserEdit({
                id: userId,
                name: docSnap.data().name,
                email: docSnap.data().email,
                password: docSnap.data().password,
            });
            setIsOpenEdit(true);
        }
    }
    const deleteUser = async (userId) => {
        await deleteDoc(doc(db, "usuarios", userId));
        getAllUsers();
        toast.success('Se ha eliminado el usuario');

    };
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModalEdit = () => {
        setIsOpenEdit(true);
    }

    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };



    React.useEffect(() => {
        getAllUsers();
    }, []);

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }
    const handleEditChange = ({ target: { name, value } }) => {
        setUserEdit({ ...userEdit, [name]: value })
    }

    return (
        <div>
            <div>
                <div>
                    <ToastContainer />
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='w-[600px] mx-auto text-center bg-shadow text-title py-20'>

                        <p className='py-8 font-bold'> Agregar un nuevo usuario</p>
                        <form className='bg-shadow space-y-4 ' onSubmit={(e) => handleSubmit(e)}>
                            <div className="w-full">
                                <label htmlFor="email">Correo</label>
                                <input type="email" name="email" onChange={handleChange} className="text-shadow" value={user.email} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">Nombre</label>
                                <input type="name" name="name" onChange={handleChange} className="text-shadow" value={user.name} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">Contrase;a</label>
                                <input type="password" name="password" onChange={handleChange} className="text-shadow" value={user.password} />
                            </div>
                            <button className='bg-button p-2'>Agregar</button>
                        </form>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalIsOpenEdit}
                    onRequestClose={closeModalEdit}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='w-[600px] mx-auto text-center bg-shadow text-title py-20'>

                        <p className='py-8 font-bold'> Editar un nuevo usuario</p>
                        <form className='bg-shadow space-y-4 ' onSubmit={(e) => handleSubmitEdit(e, userEdit.id)}>
                            <div className="w-full">
                                <label htmlFor="email">Correo</label>
                                <input type="email" name="email" onChange={handleEditChange} className="text-shadow" value={userEdit.email} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">Nombre</label>
                                <input type="name" name="name" onChange={handleEditChange} className="text-shadow" value={userEdit.name} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">Contrase;a</label>
                                <input type="password" name="password" onChange={handleEditChange} className="text-shadow" value={userEdit.password} />
                            </div>
                            <button className='bg-button p-2'>Actualizar</button>
                        </form>
                    </div>
                </Modal>
            </div>

            <div className='flex justify-end'>
                <button className='p-2 bg-button  my-2' onClick={openModal}>Nuevo usuario</button>

            </div>
            {users && users.map((user) => (
                <div key={user.id} className='space-x-10 flex justify-center bg-shadow'>
                    <span>{user.name}</span>
                    <button onClick={() => editUser(user.id)}>Editar</button>
                    <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;