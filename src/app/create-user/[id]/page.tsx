'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import {
  fetchUserById,
  updateUser,
  createUser,
} from '@/redux/slice/userSlice';
import { AppDispatch, RootState } from '@/store';

export default function CreateOrEditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { singleUser, loading } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fname: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && singleUser) {
      setFormData({
        name: singleUser.name || '',
        email: singleUser.email || '',
        phone: String(singleUser.phone || ''),
        fname: singleUser.fname || '',
      });
    }
  }, [id, singleUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.fname) {
      alert('All fields are required');
      return;
    }

    if (id) {
      dispatch(
        updateUser({
          id: Number(id),
          ...formData,
          phone: Number(formData.phone),
        })
      );
    } else {
      dispatch(
        createUser({
          ...formData,
          phone: Number(formData.phone),
        })
      );
    }

    router.push('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>{id ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="text"
          name="fname"
          placeholder="Last Name"
          value={formData.fname}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
        <button type="submit" style={{ marginTop: 10 }}>
          {id ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
}
